import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { error } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = "Gallery";
  user: Observable<firebase.User>;
  routerlinks = [];

  constructor(
    private authService: AuthenticationService,
    private navService: NavigationService,
    private router: Router,
    private route: ActivatedRoute) {
    this.user = this.authService.authUser();
  }

  ngOnInit() {
    this.navService.navLinks.subscribe(data => this.routerlinks = data);
  }

  isGeneral(): boolean {
    return this.authService.canView();
  }

  isSubscriber(): boolean {
    return this.authService.canSubmit();
  }

  isAdmin() {
    return this.authService.canUpload();
  }

  logOut() {
    console.log('navbar service logout');

    this.router.navigate(['/home'], { relativeTo: this.route });
    this.routerlinks = [];
    this.navService.resetLinks();

    this.authService.logout()
      .then(() => {
        this.navService.navLinks.subscribe(data => this.routerlinks = data);
      })
      .catch(error => console.log('logout: ', error));
  }
}
