import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private uid: string;
  private currentAlbum: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  getImages(albumKey: string): Observable<GalleryImage[]> {
    this.currentAlbum = albumKey;
    return this.db.collection(albumKey).valueChanges();
  }

  getImage(imageKey: string, albumKey: string) {
    this.currentAlbum = albumKey;
    return this.db.collection(albumKey).doc(imageKey).ref.get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data().url;
        }
        else {     
          return 'undefined';
        }
      })
      .catch(function (error) {
        console.log("Error getting image:", error);
      });
  }
}
