import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: Observable<firebase.User>;
  private loggedInUserId: any = "";

  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = angularFireAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(loggedInUser => {
        const user = loggedInUser.user;
        this.router.navigate([returnUrl]);
        this.userService.saveUser(user.uid, user.displayName, user.email);
        this.loggedInUserId = user.uid;
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut()
      .then(success => {
        this.router.navigate(['/']);
      });
  }

  get oshopUser$(): Observable<any> {
    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.userService.getUser(user.uid);
      }
      return of(null);
    }));
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }
}
