import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { User } from '../models/user.model';
import { Roles } from '../models/roles.model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private fbUser: Observable<firebase.User>;
  private user: BehaviorSubject<User>;
  private userCollection: string = 'users';
  private userRoles: Array<string>;

  constructor(private afAuth: AngularFireAuth , private db: AngularFirestore) {
    this.fbUser = this.afAuth.authState;
    this.fbUser.subscribe((user) => this.getUser(user)); 
  }

  private getUser(auth) {
    if (auth) {
      this.db.collection(this.userCollection).doc(auth.uid).ref.get()
        .then((doc) => {
          if (doc.exists) {
            this.user = new BehaviorSubject(doc.data());
          }
          else {
            this.user = new BehaviorSubject({ email: 'undefined', photoURL: 'undefined' });
          }
        })
        .catch(error => console.log("Error getting user:", error))
        .finally(() => {
          this.userRoles = _.keys(_.get(this.user.getValue(), 'roles'));
          console.log(this.userRoles);
        });
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
            doc.ref.update(Object.assign({}, userData))
          }
          else if (!doc.data()) {
            this.addUser(Object.assign({}, userData));
          }
          else {
            this.getUser(Object.assign({}, userData));
          }
        })
        .catch(error => console.log("Error updating user:", error));
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

  canView() : boolean {
    const allowed = ['viewer', 'submitter', 'admin'];
    return this.matchingRole(allowed);
  }

  canSubmit(): boolean {
    const allowed = ['submitter', 'admin'];
    return this.matchingRole(allowed);
  }

  canUpload(): boolean {
    const allowed = ['admin'];
    return this.matchingRole(allowed);
  }

  private matchingRole(allowedRoles): boolean {
    console.log("user roles: " + this.userRoles + ", "+ _.intersection(allowedRoles, this.userRoles))
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }

}
