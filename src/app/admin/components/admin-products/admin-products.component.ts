import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: any[] = [];
  filteredProducts: any[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getProducts().subscribe( products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  filterByTitle(query: String) {
    this.filteredProducts = query ? this.products.filter( product =>
      product.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
