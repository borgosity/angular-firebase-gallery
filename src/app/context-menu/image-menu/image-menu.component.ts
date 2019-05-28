import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-image-menu',
  templateUrl: './image-menu.component.html',
  styleUrls: ['./image-menu.component.scss']
})
export class ImageMenuComponent implements OnInit {

  private imageId: string;
  private albumId: string;
  private albumName: string;

  constructor(
    private menuService: ContextMenuService,
    private imageService: ImageService,
    private albumService: AlbumService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    let inFocus = this.menuService.objectInFocus();
    this.albumId = inFocus.albumId;
    this.imageId = inFocus.imageId;
    this.albumService.getAlbum(inFocus.albumId)
      .then(album => {
        if (album) {
          this.albumName = album.name;
        }
      })
      .catch(error => console.log("Error getting album for Image Context Menu: " + error));
  }

  hasAccess(): boolean {
    return this.authService.canUpload();
  }

  deleteImage() {
    if (this.hasAccess()) {
      this.imageService.deleteImage(this.imageId, this.albumId);
      this.router.navigate(['album/' + this.albumName + '/' + this.albumId]);
    }
    else {
      this.router.navigate(['login']);
    }
  }



}
