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
  images: Observable<GalleryImage[]>;
  currentAlbum = 'Uploads'; 

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit() {


    this.images = this.imageService.getImages();
  }

  ngOnChanges() {
    this.images = this.imageService.getImages();
  }

  getAlbumImages() {
    this.images = this.imageService.getImages();
  }
}
