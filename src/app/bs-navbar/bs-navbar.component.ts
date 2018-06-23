import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { OshopUser } from './../models/oshop.user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  oshopUser: OshopUser;
  numberOfItemsInCart: number;

  constructor(private authService: AuthService,
    private shoppingCartService: ShoppingCartService) {
    this.authService.oshopUser$.subscribe(oshopUser => {
      return this.oshopUser = oshopUser;
    });
  }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => {
      this.numberOfItemsInCart = this.shoppingCartService.getNumberOfItemsInCart(cart);
    });
  }

  logout() {
    this.authService.logout();
  }
}
