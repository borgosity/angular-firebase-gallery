import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router'
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

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title = this.route.snapshot.params['name'] + ' Photos';
    this.key = this.route.snapshot.params['id'];
    this.getAlbumImages(this.route.snapshot.params['id']);
  }

  ngOnChanges() {
    this.getAlbumImages(this.route.snapshot.params['id']);
  }

  getAlbumImages(key: string) {
    this.images = this.imageService.getImages(key);
  }
}
