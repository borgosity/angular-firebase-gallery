import { Component, NgZone} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailLogin: boolean = false;

  email: string;
  password: string;
  errorMsg: string;

  constructor(private ngZone: NgZone, private authService: AuthenticationService, private router: Router) {
    authService.authUser().subscribe(user => {
      if (user) {
        this.navigate(['portfolio'])
      }
    });
  }

  signIn() {
    this.authService.login(this.email, this.password)
      .then(resolve => {
        this.password = '';
        this.navigate(['portfolio']);
      })
      .catch(error => this.errorMsg = error.msg);
  }

  googleSignIn() {
    console.log("google sign in");
    this.authService.googleLogin()
      .then(() => this.navigate(['portfolio']))
      .catch(error => this.errorMsg = error.msg);
  }

  emailSignIn() {
    console.log("email sign in");
    this.emailLogin = !this.emailLogin;
  }

  navigate(commands: any[]) {
    this.ngZone.run(() => this.router.navigate(commands))
      .then()
      .catch(error => this.errorMsg = error.msg);
  }

}
