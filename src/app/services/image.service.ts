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

  printImages() {

  }

  getImage(key: string): string {
    var url = '';
    this.db.collection('uploads').doc(key).ref.get()
      .then(function (doc) {
        if (doc.exists) {
          url = doc.data().url;
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          url = 'undefined';
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    return url;
  }
}
