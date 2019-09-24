import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { NavLink } from '../models/navLink.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navLinks: BehaviorSubject<NavLink[]> = new BehaviorSubject<NavLink[]>([]);
  private allLinks: NavLink[] = [{ name: 'home', slug: '/portfolio', text: 'Home' }]

  constructor(private authService: AuthenticationService) {
    this.navLinks.next(this.allLinks);
    authService.rolesReady.subscribe(ready => {
      if (ready) this.navbarLinks();
    });
  }

  async navbarLinks() {
    if (this.authService.canView()) {
      this.allLinks.push({ name: 'personal', slug: '/gallery/1/Photo', text: 'Albums' });
    }
    if (this.authService.canSubmit()) {
      this.allLinks.push({ name: 'private', slug: '/gallery/1/Subscription', text: 'Snaps' });
      this.allLinks.push({ name: 'submit', slug: '/submit', text: 'Say Hi!' });
    }
    if (this.authService.canUpload()) {
      this.allLinks.push({ name: 'upload', slug: '/upload', text: 'Upload' });
    }
  }

}
