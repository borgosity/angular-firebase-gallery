import { Component, OnInit } from '@angular/core';
import { Vector2 } from '../models/vector2.model';
import { ContextMenuService } from '../services/context-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  private contextMenuSub: Subscription;
  menuPos: Vector2; 

  constructor(private contextMenuService: ContextMenuService) {
    this.menuPos = {x: 0, y: 0};
    this.contextMenuSub = contextMenuService.clickPosition.subscribe(position => this.menuPos = position);
  }

  ngOnInit() {
  }

  closeContextMenu() {
    console.log("close context menu from context menu");
    this.contextMenuService.closeContextMenu();
  }

  onMainContainerClick() {
    this.closeContextMenu();
  }

  onRightClick() {
    this.closeContextMenu();
  }

}
