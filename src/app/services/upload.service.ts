import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { GalleryImage } from '../models/galleryImage.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Upload } from '../models/upload.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';
  private uploads: AngularFirestoreCollection<GalleryImage>;
  constructor(private ngFire: AngularFireModule, private db: AngularFirestore) { }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('${this.basePath}/${upload.file.name}').put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // state_change observer
      (progress) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },
      // error observer
      (error) => {
        console.log(error);
      },
      // success observer
      (): any => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  private saveFileData(upload: Upload) {
    this.db.collection('${this.basePath}/').add(upload);
    console.log("Upload Complete: " + upload.url);
  }
}
