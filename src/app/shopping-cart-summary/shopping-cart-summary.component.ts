import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit, OnDestroy {
  shoppingCart = {};
  subscription: Subscription;
  productIds = [];
  totalPrice = 0;

  numberOfItemsInCart = 0;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => {
      this.shoppingCart = cart;
      this.numberOfItemsInCart = this.shoppingCartService.getNumberOfItemsInCart(this.shoppingCart);
      this.productIds = this.shoppingCartService.getProductIdsInCart(this.shoppingCart);
      this.totalPrice = this.shoppingCartService.getTotalPriceInCart(this.shoppingCart);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
