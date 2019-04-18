import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../services/image.service';
import { AlbumService } from '../services/album.service';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  private imageUrl = '';
  private album: Album;
  constructor(private imageService: ImageService, private albumService: AlbumService, private route: ActivatedRoute) {
    this.album = new Album('undefined');
  }

  getImageUrl(imageKey: string, albumKey: string) {
    this.imageService.getImage(imageKey, albumKey).then(
      url => this.imageUrl = url);
  }

  ngOnInit() {
    this.getImageUrl(this.route.snapshot.params['id'], this.route.snapshot.params['album']);
    this.albumService.getAlbum(this.route.snapshot.params['album']).then(
      album => {
        if (album){
          this.album = album
        }
      }
    );
  }

}
