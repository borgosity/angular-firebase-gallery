import { Component } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuService } from './services/context-menu.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private contextMenuSub: Subscription;
  private contextMenuOpen = false;

  constructor(private contextMenuService: ContextMenuService) {
     this.contextMenuSub = contextMenuService.contextMenuOpen.subscribe(open => this.contextMenuOpen = open );
  }

  onMainContainerClick() {
    if (this.contextMenuOpen) {
      this.closeContextMenu();
    }
  }

  closeContextMenu() {
    this.contextMenuService.closeContextMenu();
  }

}
