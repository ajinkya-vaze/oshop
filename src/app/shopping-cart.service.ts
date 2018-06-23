import { ShoppingCartItems } from './models/shopping-cart-items';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private getCartItem(cartId, productId) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  async addToCart(product) {
    const cartId = await this.getOrCreateCartId();
    const cartItemRef = this.getCartItem(cartId, product.key);
    cartItemRef.valueChanges().pipe(take(1)).subscribe(cartItem => {
      if (cartItem) {
        const shoppingCartItem = (<ShoppingCartItems>cartItem);
        cartItemRef.update({ quantity: shoppingCartItem.quantity + 1 });
      } else {
        cartItemRef.set({ product: product, quantity: 1 });
      }
    });
  }

  async removeFromCart(product) {
    const cartId = await this.getOrCreateCartId();
    const cartItemRef = this.getCartItem(cartId, product.key);
    cartItemRef.valueChanges().pipe(take(1)).subscribe(cartItem => {
      const shoppingCartItem = (<ShoppingCartItems>cartItem);
      if (shoppingCartItem.quantity > 1) {
        cartItemRef.update({ quantity: shoppingCartItem.quantity - 1 });
      } else {
        cartItemRef.remove();
      }
    });
  }

  getNumberOfItemsInCart(cart): number {
    let numberOfItems = 0;
    if (cart) {
      for (const productId in cart.items) {
        if (cart.items.hasOwnProperty(productId)) {
          numberOfItems += cart.items[productId].quantity;
        }
      }
    }
    return numberOfItems;
  }

  getProductIdsInCart(cart) {
    if (cart && cart.items) {
      return Object.keys(cart.items);
    }
    return [];
  }

  getTotalPriceInCart(cart): number {
    let totalPrice = 0;
    if (cart && cart.items) {
      for (const productId in cart.items) {
        if (cart.items.hasOwnProperty(productId)) {
          totalPrice += (cart.items[productId].quantity * cart.items[productId].product.price);
        }
      }
    }
    return totalPrice;
  }

  async clearShoppingCart() {
    const cartId = await this.getOrCreateCartId();
    const cartItemsRef = this.db.object("/shopping-carts/" + cartId + "/items/");
    cartItemsRef.remove();
  }
}
