import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';

import { Album } from '../../models/album.model';
import { AuthenticationService } from '../authentication.service';
import { ImageService } from '../image.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private collection = 'albums';
  albums: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);

  constructor(
    private authService: AuthenticationService,
    private imageService: ImageService,
    private db: AngularFirestore) { }

  galleryAccessible(galleryId: string) {
    let result = false;
    if (!this.authService.loggingOut) {
      if (this.authService.hasRole([galleryId])) {
        this.getAlbums(galleryId);
        result = true;
      }
      else {
        this.albums.next([]);
        result = false;
      }
    }
    return result;
  }

  private getAlbums(role: string) {
    this.db.collection<Album>(this.collection, ref => ref.where('role', '==', role))
      .valueChanges().subscribe(
        albums => {
          let items: Album[] = albums.map(album => {
            this.imageService.getImages(album.$key).subscribe(
              images => album.images = images
            )
            return album;
          })
          this.albums.next(items);
        });
  }
}
