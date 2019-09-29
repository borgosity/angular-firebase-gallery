import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'firebase/storage';

import { AuthenticationService } from '../authentication.service';
import { AlbumRoles } from '../../models/albumRoles.model';
import { Album } from '../../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private collection = 'albums';

  constructor(
    private authService: AuthenticationService,
    private db: AngularFirestore) {

  }

  addAlbum(album: Album) {
    const db = this.db;
    db.collection(this.collection).add(Object.assign({}, album))
      .then((docRef) => docRef.update({ $key: docRef.id}))
      .catch((error) => console.error("Error adding album document: ", error));
  }

  albumAccessible(albumId: string) {
    return this.getAlbum(albumId)
      .then(doc => {
        if (doc) {
          return (doc.role == 'guest' || this.authService.hasRole([doc.role]));
        }
        else {
          return false;
        }
      })
      .catch((error) => console.log("Error checking album access:", error));
  }

  getAlbums(role: string): Observable<Album[]> {
    return this.db.collection(this.collection, ref => ref.where('role', '==', role)).valueChanges();
  }

  getAllAlbums(): Observable<Album[]> {
    return this.db.collection(this.collection).valueChanges();
  }

  getGuestAlbums(): Observable<Album[]> {
    return this.db.collection(this.collection, ref => ref.where('role', '==', 'guest')).valueChanges();
  }

  getAlbum(key: string) {
    return this.db.collection(this.collection).doc(key).ref.get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
        else {
          return new Album('undefined', AlbumRoles.guest, []);
        }
      })
      .catch((error) => console.log("Error getting album:", error));
  }

  getSubmitAlbum(): Observable<Album[]> {
    return this.db.collection(this.collection, ref => ref.where('name', '==', 'Submissions')).valueChanges();
  }

  updateAlbumImageCount(albumKey: string, imageCount: number) {
    let newCount: number = imageCount;
    this.getAlbum(albumKey)
      .then(data => {
        if (data) {
          newCount += data.size;
        }
      })
      .catch(error => console.log("Error getting album data for update:", error))
      .finally(() => {
        this.db.collection(this.collection).doc(albumKey).update({size: newCount})
          .then()
          .catch(error => console.log("Error updating album image count data:", error))
          .finally();
      });
  }
}
