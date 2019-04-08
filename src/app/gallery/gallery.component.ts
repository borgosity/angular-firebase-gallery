import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { ImageService } from '../services/image.service';
import { GalleryImage } from '../models/galleryImage.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges{
  title = "Photos"

  image: Observable<GalleryImage[]>;


  constructor(private imageService: ImageService) { } 

  ngOnInit() {
    this.image = this.imageService.getImages();
  }

  ngOnChanges() {
    this.image = this.imageService.getImages();
  }
}
