import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private fbUser: Observable<firebase.User>;
  private user: BehaviorSubject<User>;
  private userCollection: string = 'users';

  constructor(private afAuth: AngularFireAuth , private db: AngularFirestore) {
    this.fbUser = this.afAuth.authState;
    this.getUser(this.fbUser);
  }

  private getUser(auth) {
    if (auth.uid) {
      this.db.collection(this.userCollection).doc(auth.uid).ref.get()
        .then((doc) => {
          if (doc.exists) {
            this.user = new BehaviorSubject(doc.data());
          }
          else {
            this.user = new BehaviorSubject({ email: 'undefined', photoURL: 'undefined' });
          }
        }
        )
        .catch(error => console.log("Error getting album:", error))
    }
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.updateUser(credential.user)
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUser(credential.user)
      });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  authUser() {
    return this.fbUser;
  }

  getUserAccount() {
    return this.user;
  }

  private updateUser(authData) {
    const userData = new User(authData);
    const ref = this.getUserCollection;
    if (ref) {
      this.db.collection(this.userCollection).doc(authData.uid).ref.get()
        .then(doc => {
          if (doc.data() && !doc.data().role) {
            doc.ref.update(userData)
          }
          else if (!doc.data()) {
            this.addUser(userData);
          }
          else {
            this.getUser(authData);
          }
        }
        )
    }
    else {
      this.addUser(userData);
    }
  }

  private addUser(userData) {
    this.db.collection(this.userCollection).doc(userData.uid).set(Object.assign({}, userData))
      .then()
      .catch((error) => console.log("Error setting image view data:", error))
      .finally(() => this.getUser(userData));
  }

  private getUserCollection() {
    return this.db.collection(this.userCollection).ref;
  }

}
