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

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  addImageData(imageData: ImageViewData) {
    this.db.collection(this.collectionName).doc(imageData.$key).set(imageData)
      .then(function (doc) {
        console.log("Adding image view data: ", doc);
      })
      .catch(function (error) {
        console.log("Error setting image view data:", error);
      })
      .finally( () => 
        console.log("Finished adding image data")
      );
  }

  updateImageData(imageData: ImageViewData) {
    this.db.collection(this.collectionName).doc(imageData.$key).update(imageData)
      .then( () => 
        console.log("Updating image view data: ")
      )
      .catch(function (error) {
        console.log("Error getting image view data:", error);
      })
      .finally(() =>
        console.log("Finished adding image data")
      );
  }

  getImageData(dataKey: string) {
    return this.db.collection(this.collectionName).doc(dataKey).ref.get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        }
        else {
          return 'undefined';
        }
      })
      .catch(function (error) {
        console.log("Error getting image view data:", error);
      });
  }
}
