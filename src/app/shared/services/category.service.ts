import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories/', ref => ref.orderByChild('displayName')).snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );
  }
}
