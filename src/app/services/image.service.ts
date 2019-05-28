import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private uid: string;
  private currentAlbum: string;
  private currentImage: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private storage: AngularFireStorage) {
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
    this.currentImage = imageKey;
    return this.db.collection(albumKey).doc(imageKey).ref.get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        }
        else {     
          return undefined;
        }
      })
      .catch(function (error) {
        console.log("Error getting image:", error);
      });
  }

  deleteImage(imageKey: string, albumKey: string) {
    this.currentAlbum = albumKey;
    return this.getImage(imageKey, albumKey)
      .then(image => {
        if (image) {
          const url =   image.url;
          this.db.collection(albumKey).doc(imageKey).delete()
            .then(() => console.log("Image deleted successfully"))
            .catch(error => console.log("Error deleting image:", error))
            .finally(() => this.deleteFile(url));
        }
      })
      .catch(error => console.log("Error getting image for deletion:", error));
  }

  private deleteFile(url: string) {
    const storageRef = this.storage.storage.refFromURL(url);
    storageRef.delete();
  }
}
