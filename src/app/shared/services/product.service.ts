import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getProducts() {
    return this.db.list('/products').snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(id) {
    this.db.object('/products/' + id).remove();
  }
}
