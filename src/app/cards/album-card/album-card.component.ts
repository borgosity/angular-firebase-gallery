import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit, OnChanges {

  spinner: string = 'assets/icons/image_default.svg';
  selectedImage: number = 0;
  lastActive: string = '';
  @Input() album: Album;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onNext() {
    if (this.selectedImage < (this.album.images.length - 1)) {
      this.selectedImage++;
    }
    else {
      this.selectedImage = 0;
    }
  }

  onPrevious() {
    if (this.selectedImage > 0) {
      this.selectedImage--;
    }
    else {
      this.selectedImage = (this.album.images.length - 1);
    }
  }

  onClick(event: any) {
    if (this.lastActive === event.target.id)
      return;
    
    this.carouselColors(this.lastActive, event.target.id);
    this.lastActive = event.target.id;
    this.selectedImage = this.album.images.findIndex(image => image.$key === event.target.id);
  }

  private carouselColors(inactiveId: string, activeId: string) {
    if (inactiveId !== '')
      document.getElementById(inactiveId).className = 'dot';
    document.getElementById(activeId).className = 'active-dot';
  }

}
