import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product;
  @Input('shoppingCart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  get quantity() {
    if (!this.shoppingCart || !this.shoppingCart.items) {
      return 0;
    }

    const item = this.shoppingCart.items[this.product.key];
    if (!item) {
      return 0;
    }

    return item.quantity;
  }
}
