import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  productSubscription: Subscription;
  shoppingCartSubscription: Subscription;
  shoppingCart;

  constructor(
    private productsService: ProductService,
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.productSubscription = this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.activatedRoute.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(product => product.category === this.category) : this.products;
      });
    });
  }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.shoppingCartSubscription = cart$.subscribe( cart => this.shoppingCart = cart);
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.shoppingCartSubscription.unsubscribe();
  }

}
