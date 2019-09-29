import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { NavLink } from '../models/navLink.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navLinks: BehaviorSubject<NavLink[]> = new BehaviorSubject<NavLink[]>([]);
  private homeLink = { name: 'home', slug: '/home', text: 'Home' };

  constructor(private authService: AuthenticationService) {
    this.navLinks.next([this.homeLink]);
    authService.rolesReady.subscribe(ready => {
      if (ready) {
        console.log('roles ready');
        this.navLinks.next(this.navbarLinks());
      }
    });
  }

  private navbarLinks(): NavLink[] {
    let links: NavLink[] = [this.homeLink];
    if (this.authService.canView()) {
      console.log('can view photo');

      links.push({ name: 'personal', slug: '/gallery/1/Photo', text: 'Albums' });
    }
    if (this.authService.canSubmit()) {
      console.log('can view sub');

      links.push({ name: 'private', slug: '/gallery/2/Subscription', text: 'Snaps' });
      links.push({ name: 'submit', slug: '/submit', text: 'Say Hi!' });
    }
    if (this.authService.canUpload()) {
      console.log('can view upload');

      links.push({ name: 'upload', slug: '/upload', text: 'Upload' });
    }
    return links;
  }

  resetLinks() {
    console.log('reset links');
    this.navLinks.next([this.homeLink]);
  }
}
