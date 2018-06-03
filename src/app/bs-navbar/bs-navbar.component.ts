import { OshopUser } from './../models/oshop.user';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  oshopUser: OshopUser;

  constructor(private authService: AuthService) {
    this.authService.oshopUser$.subscribe( oshopUser => {
      console.log(oshopUser);
      return this.oshopUser = oshopUser;
    });
  }

  logout() {
    this.authService.logout();
  }

}
