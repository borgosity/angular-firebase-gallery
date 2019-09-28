import { Component, OnInit, OnChanges } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumRoles } from '../models/albumRoles.model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {
  title = "Photo Albums"
  albums: Observable<Album[]>;
  newAlbums: Album[] = [];
  navigationSubscription;

  constructor(
    private albumService: AlbumService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute) {
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
    //this.galleryAccessible();
  }

  private galleryAccessible() {
    console.log('checking access to gallery: ', this.route.snapshot.params['type']);

    if (this.albumService.galleryAccessible(AlbumRoles[this.route.snapshot.params['type']])) {
      console.log('has access gallery: ', this.route.snapshot.params['name']);

      this.title = this.route.snapshot.params['name'] + ' Albums';
      this.getAlbums();
    }
    else {
      console.log('route home from gallery');
      this.router.navigate(['/home']);
    }
  }

  private getAlbums() {
    console.log('get Albums: ', this.route.snapshot.params['type']);

    this.albumService.getAlbums(AlbumRoles[this.route.snapshot.params['type']]).subscribe(
      albums => {
        console.log('map albums');
        this.newAlbums = albums.map(album => {
          console.log('get images');
          this.imageService.getImages(album.$key).subscribe(
            images => album.images = images
          )
          return album;
        })
      }
    );
  }

}
