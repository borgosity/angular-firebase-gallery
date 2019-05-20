import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {
  fbUser: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthenticationService) {
    this.fbUser = this.afAuth.authState;

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.fbUser.pipe(
      map((auth) => {      
        if (!auth) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
