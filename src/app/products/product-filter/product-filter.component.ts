import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy {
  categorySubscription: Subscription;
  categories: any[] = [];
  @Input('category') category: string;

  constructor(private categoryService: CategoryService) {
    this.categorySubscription = this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }
}
