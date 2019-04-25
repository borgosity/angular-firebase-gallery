import { Component, OnInit, OnDestroy} from '@angular/core';
import { ImageService } from '../services/image.service';
import { AlbumService } from '../services/album.service';
import { ContextMenuService } from '../services/context-menu.service';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album.model';
import { ContextMenuType } from '../models/contextMenuType.model';
import { ImageViewData } from '../models/imageViewData.model';
import { UserViewData } from '../models/userViewData.model';
import { ImageDataService } from '../services/image-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit, OnDestroy {

  private imageUrl = '';
  private album: Album;
  private userKey: string; 
  private startTime: number;
  private userViewData: UserViewData;
  private user: Observable<firebase.User>;
  private userEmail: string;
  imageData: ImageViewData;

  constructor(
    private imageService: ImageService,
    private albumService: AlbumService,
    private dataService: ImageDataService,
    private contextMenu: ContextMenuService,
    private authService: AuthenticationService,
    private route: ActivatedRoute) {
      this.album = new Album('loading...');
      this.user = this.authService.authUser();
      this.user.subscribe((user) => this.userEmail = user.email);
  }

  getImageUrl(imageKey: string, albumKey: string) {
    this.imageService.getImage(imageKey, albumKey).then(
      url => this.imageUrl = url);
    this.imageData = { totalViews: 0 };
    this.userViewData = {user: 'undefined', viewCount: 0, longestView: 0};
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

  ngOnDestroy() {
    console.log("page was destroyed");
  }

  getImageData(imageKey: string) {
    var imageData: any;
    this.dataService.getImageData(imageKey)
      .then(data => imageData = data)
      .catch(function (error) {
        console.log("Error getting image view data:", error);
      })
      .finally(
      () => {
        this.imageData = imageData;
        this.userViewData = this.findUserData(this.userEmail)
        this.incrementViewCount();
      });
  }

  updateViewTime() {
    // total time equals current time minus start time
  }

  incrementViewCount() {
    this.imageData.totalViews += 1;
    this.userViewData.viewCount += 1;
    this.dataService.updateImageData(this.imageData);
  }

  findUserData(user: string) {
    return this.imageData.userViews.find((item) => item.user === user)
  }
}
