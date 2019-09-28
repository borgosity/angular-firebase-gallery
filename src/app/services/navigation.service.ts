import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { NavLink } from '../models/navLink.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navLinks: BehaviorSubject<NavLink[]> = new BehaviorSubject<NavLink[]>([]);
  private allLinks: NavLink[] = [{ name: 'home', slug: '/home', text: 'Home' }];

  constructor(private authService: AuthenticationService) {
    this.navLinks.next(this.allLinks);
    authService.rolesReady.subscribe(ready => {
      if (ready) {
        console.log('roles ready');
        this.navbarLinks();
      }
    });
  }

  async navbarLinks() {
    if (this.allLinks.length > 1)
      this.resetLinks();

    if (this.authService.canView()) {
      console.log('can view photo');

      this.allLinks.push({ name: 'personal', slug: '/gallery/1/Photo', text: 'Albums' });
    }
    if (this.authService.canSubmit()) {
      console.log('can view sub');

      this.allLinks.push({ name: 'private', slug: '/gallery/2/Subscription', text: 'Snaps' });
      this.allLinks.push({ name: 'submit', slug: '/submit', text: 'Say Hi!' });
    }
    if (this.authService.canUpload()) {
      console.log('can view upload');

      this.allLinks.push({ name: 'upload', slug: '/upload', text: 'Upload' });
    }
  }

  resetLinks() {
    console.log('reset links');
    this.allLinks = [{ name: 'home', slug: '/home', text: 'Home' }];
  }
}
