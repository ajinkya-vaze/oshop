import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shipping } from 'shared/models/shipping';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: Shipping = new Shipping();
  cart: any = {};
  subscription: Subscription;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService) { }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder() {
    const order = {
      userId: this.authService.getLoggedInUserId(),
      dateCreated: new Date().getTime(),
      shipping: this.shipping,
      items: this.getCartItems()
    };
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  getCartItems() {
    const cartItems = [];
    for (const productId in this.cart.items) {
      if (this.cart.items.hasOwnProperty(productId)) {
        cartItems.push({
          product: {
            title: this.cart.items[productId].product.title,
            imageUrl: this.cart.items[productId].product.imageUrl,
            price: this.cart.items[productId].product.price
          },
          quantity: this.cart.items[productId].quantity,
          totalPrice: this.cart.items[productId].quantity * this.cart.items[productId].product.price
        });
      }
    }
    return cartItems;
  }
}
