import { Component, OnInit} from '@angular/core';
import { ImageService } from '../services/image.service';
import { AlbumService } from '../services/album.service';
import { ContextMenuService } from '../services/context-menu.service';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album.model';
import { ContextMenuType } from '../models/contextMenuType.model';
import { ImageData } from '../models/imageData.model';
import { UserViewData } from '../models/userViewData.model';
import { ImageDataService } from '../services/image-data.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  private imageUrl = '';
  private album: Album;

  private userKey: string; 
  private startTime: number;
  private userViewData: any;
  imageData: any;

  constructor(
    private imageService: ImageService,
    private albumService: AlbumService,
    private dataService: ImageDataService,
    private contextMenu: ContextMenuService,
    private route: ActivatedRoute) {
    this.album = new Album('loading...');
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
    // set start time
    this.getImageData(this.route.snapshot.params['id']);
  }

  getImageData(imageKey: string) {
    this.dataService.getImageData(imageKey)
      .then(data => this.imageData = data)
      .catch()
      .finally();
  }

  updateViewTime() {
    // total time equals current time minus start time
  }


}
