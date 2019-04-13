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

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  getImages(): Observable<GalleryImage[]> {
    return this.db.collection('uploads').valueChanges();
  }

  getImage(key: string){
    return this.db.collection('uploads').doc(key).ref.get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data().url;
        }
        else {     
          return 'undefined';
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
}
