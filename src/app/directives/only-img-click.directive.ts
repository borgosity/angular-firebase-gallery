import { Directive, HostListener } from '@angular/core';
import { ContextMenuService } from '../services/context-menu.service';
import { ContextMenuType } from '../models/contextMenuType.model';

@Directive({
  selector: '[appOnlyImgClick]'
})
export class OnlyImgClickDirective {

  constructor(private contextMenuService: ContextMenuService) {

  }


  @HostListener('click', ['$event']) onLeftClick(event: any) {
    if (this.contextMenuService.contextMenuOpen.getValue()) {
      this.contextMenuService.closeContextMenu();
      console.log('image only LEFT click directive');
    }
  }

  @HostListener('contextmenu', ['$event']) onRightClick(event: any) {
    this.contextMenuService.openContextMenu(event, ContextMenuType.Image);
    console.log('image only RIGHT click directive');
  }

}
