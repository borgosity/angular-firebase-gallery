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
import { Observable, Subscription, timer } from 'rxjs';
import { AlbumRoles } from '../models/albumRoles.model';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit, OnDestroy {

  album: Album;
  imageData: ImageViewData;
  imageUrl = '';

  private userKey: string; 
  private viewTime = 0;
  private timerSub: Subscription;
  private userViewData: UserViewData;
  private user: Observable<firebase.User>;
  private userEmail: string;

  constructor(
    private imageService: ImageService,
    private albumService: AlbumService,
    private dataService: ImageDataService,
    private contextMenu: ContextMenuService,
    private authService: AuthenticationService,
    private route: ActivatedRoute) {
      this.album = new Album('loading...', AlbumRoles.portfolio);
      this.user = this.authService.authUser();
      this.user.subscribe((user) => this.userEmail = user.email);
  }

  getImageUrl(imageKey: string, albumKey: string) {
    this.imageService.getImage(imageKey, albumKey).then(
      url => this.imageUrl = url);
    this.imageData = { totalViews: 0 };
    this.userViewData = {user: 'loading...', viewCount: 0, longestView: 0, recentView: 0, lastViewDate: 0, firstViewDate: 0};
  }

  ngOnInit() {
    this.timerSub = timer(0, 1000).subscribe(t => this.viewTime = t);
    this.getImageUrl(this.route.snapshot.params['id'], this.route.snapshot.params['album']);
    this.albumService.getAlbum(this.route.snapshot.params['album']).then(
      album => {
        if (album){
          this.album = album
        }
      }
    );
    this.getImageData(this.route.snapshot.params['id']);
  }

  ngOnDestroy() {
    this.timerSub.unsubscribe();
    this.updateViewTime(this.viewTime, this.userViewData.longestView);
    this.dataService.updateImageData(this.imageData);
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
        this.updateViewDate();
        this.dataService.updateImageData(this.imageData);
      });
  }

  updateViewTime(time: number, longestTime: number) {
    this.userViewData.recentView = time;
    this.userViewData.longestView = (time > longestTime) ? time : longestTime;
  }

  incrementViewCount() {
    this.imageData.totalViews += 1;
    this.userViewData.viewCount += 1;
  }

  updateViewDate() {
    this.userViewData.lastViewDate = this.dataService.getCurrentDate();
    if (!this.userViewData.firstViewDate) {
      this.userViewData.firstViewDate = this.dataService.getCurrentDate();
    }
  }

  findUserData(user: string) {
    let userViewData: UserViewData = this.imageData.userViews.find((item) => item.user === user);
    if (userViewData) {
      console.log("found userViews:" + JSON.stringify(this.imageData) + ", " + user);
      return userViewData;
    }
    else {
      console.log("found NO userViews:");
      userViewData = { user: user, viewCount: 0, longestView: 0, recentView: 0, lastViewDate: 0, firstViewDate: 0 };
      this.imageData.userViews.push(userViewData);
      return userViewData;
    }
  }
}
