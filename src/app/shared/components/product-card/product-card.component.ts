import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product;

  @Input('showActions') showActions = true;

  @Input('shoppingCart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
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
