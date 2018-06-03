import { map } from 'rxjs/operators';
import { OshopUser } from './models/oshop.user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  saveUser(id: String, name: String, email: String) {
    this.db.object('/users/' + id).update({ name: name, email: email });
  }

  getUser(id: String) {
    return this.db.object('/users/' + id).valueChanges();
  }
}
