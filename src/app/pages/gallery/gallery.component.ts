import { Component, OnInit, OnChanges} from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Observable } from 'rxjs';
import { Album } from '../../models/album.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumRoles } from '../../models/albumRoles.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges{
  title = "Photo Albums"
  albums: Observable<Album[]>;
  navigationSubscription;

  constructor(private albumService: AlbumService, private router: Router, private route: ActivatedRoute) {
    this.navigationSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  } 

  ngOnInit() {
    this.galleryAccessible();
  }

  ngOnChanges() {
    this.galleryAccessible();
  }

  private galleryAccessible() {
    if (this.albumService.galleryAccessible(AlbumRoles[this.route.snapshot.params['type']])) {
      this.title = this.route.snapshot.params['name'] + ' Albums';
      this.getAlbums();
    }
    else {
      this.router.navigate(['portfolio']);
    }
  }

  private getAlbums() {
    this.albums = this.albumService.getAlbums(AlbumRoles[this.route.snapshot.params['type']]);
  }

}
