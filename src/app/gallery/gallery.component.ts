import { Component, OnInit, OnChanges} from '@angular/core';
import { AlbumService } from '../services/album.service';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges{
  title = "Photo Albums"
  albums: Observable<Album[]>;

  constructor(private albumService: AlbumService) {
  } 

  ngOnInit() {
    this.albums = this.albumService.getAlbums();
  }

  ngOnChanges() {
    this.albums = this.albumService.getAlbums();
  }

}
