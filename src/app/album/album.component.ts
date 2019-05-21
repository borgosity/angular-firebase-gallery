import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../services/image.service';
import { AlbumService } from '../services/album.service';
import { ActivatedRoute, Router } from '@angular/router'
import { GalleryImage } from '../models/galleryImage.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  title = 'Photos';
  key: string;
  images: Observable<GalleryImage[]>;

  constructor(
    private imageService: ImageService,
    private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.albumAccessible();
  }

  ngOnChanges() {
    this.albumAccessible();
  }

  private albumAccessible() {
    this.albumService.albumAccessible(this.route.snapshot.params['id'])
      .then((canOpen) => {
        if (canOpen) {
          this.title = this.route.snapshot.params['name'] + ' Photos';
          this.key = this.route.snapshot.params['id'];
          this.getAlbumImages(this.route.snapshot.params['id']);
        }
        else {
          this.router.navigate(['login']);
        }
      })
      .catch(error => console.log("Error getting album accessibility: ", error));
  }

  private getAlbumImages(key: string) {
    this.images = this.imageService.getImages(key);
    this.images.subscribe(data => {
      this.albumService.updateAlbumImageCount(this.route.snapshot.params['id'], data.length);
    });
  }
}
