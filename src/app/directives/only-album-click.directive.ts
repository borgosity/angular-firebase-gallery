import { Directive, HostListener } from '@angular/core';
import { ContextMenuService } from '../services/context-menu.service';
import { ContextMenuType } from '../models/contextMenuType.model';

@Directive({
  selector: '[appOnlyAlbumClick]'
})
export class OnlyAlbumClickDirective {

  constructor(private contextMenuService: ContextMenuService) {  }

  @HostListener('click', ['$event']) onLeftClick(event: any) {
    this.contextMenuService.closeContextMenu();
    console.log('album only LEFT click directive');
  }

  @HostListener('contextmenu', ['$event']) onRightClick(event: any) {
    this.contextMenuService.openContextMenu(event, ContextMenuType.Album);
    console.log('album only RIGHT click directive');
  }

}
