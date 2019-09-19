import { Component, OnInit, OnChanges } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Observable } from 'rxjs';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  title = "Portfolio Albums"
  albums: Observable<Album[]>;

  constructor(private albumService: AlbumService) {
  }

  ngOnInit() {
    this.albums = this.albumService.getGuestAlbums();
  }

  ngOnChanges() {
    this.albums = this.albumService.getGuestAlbums();
  }

}
