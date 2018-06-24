import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingcartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list("/orders").push(order);
    this.shoppingcartService.clearShoppingCart();
    return result;
  }
}
