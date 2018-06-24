import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart = {};
  numberOfItemsInCart: number;
  productIds = [];
  totalPrice: number;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => {
      this.numberOfItemsInCart = this.cartService.getNumberOfItemsInCart(cart);
      this.productIds = this.cartService.getProductIdsInCart(cart);
      this.totalPrice = this.cartService.getTotalPriceInCart(cart);
      this.cart = cart;
    });
  }

  clearShoppingCart() {
    this.cartService.clearShoppingCart();
  }
}
