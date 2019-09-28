import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'firebase/storage';
import { ImageViewData } from '../models/imageViewData.model';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  private uid: string;
  private collectionName = 'imageData';
  private dateNow: Date = new Date();

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  addImageData(imageData: ImageViewData) {
    this.db.collection(this.collectionName).doc(imageData.$key).set(imageData)
      .then()
      .catch((error) =>  console.log("Error setting image view data:", error))
      .finally();
  }

  updateImageData(imageData: ImageViewData) {
    this.db.collection(this.collectionName).doc(imageData.$key).update(imageData)
      .then( )
      .catch((error) => console.log("Error getting image view data:", error))
      .finally( );
  }

  getImageData(dataKey: string) {
    return this.db.collection(this.collectionName).doc(dataKey).ref.get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
        else {
          return { totalViews: 0, userViews: [{}] };
        }
      })
      .catch((error) => console.log("Error getting image view data:", error));
  }

  getCurrentDate() {
    return this.dateNow.getTime();
  }
}
