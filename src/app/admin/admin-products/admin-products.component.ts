import { Observable } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {

  products$: Observable<any>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }
}
