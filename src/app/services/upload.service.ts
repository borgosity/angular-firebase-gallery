import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { GalleryImage } from '../models/galleryImage.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Upload } from '../models/upload.model';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';
  private uploads: AngularFirestoreCollection<GalleryImage>;

  private uploadPercent: Observable<number>;
  private downloadURL: Observable<string>;

  constructor(
    private ngFire: AngularFireModule,
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  uploadFile(upload: Upload, file: File) {
    console.log(file);
    const filePath = this.basePath + "/" + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    // monitor progrees
    this.uploadPercent = uploadTask.percentageChanges();
    this.uploadPercent.subscribe(uploadProgress);
    // get url
    this.downloadURL = storageRef.getDownloadURL();
    this.downloadURL.subscribe(uploadedURL);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        console.log("file uploaded");
      }),
    ).subscribe()

    function uploadedURL(url: string){
      upload.url = url;
      console.log(upload.url);
    }

    function uploadProgress(percent: number) {
      upload.progress = percent;
      console.log(upload.progress);
    }


    //uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //  // state_change observer
    //  (progress) => {
    //    upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
    //    console.log(upload.progress + ", " + uploadTask.snapshot.downloadURL);
    //  },
    //  // error observer
    //  (error) => {
    //    console.log(error);
    //  },
    //  // success observer
    //  (): any => {
    //    upload.url = uploadTask.snapshot.downloadURL;
    //    upload.name = file.name;
    //    this.saveFileData(upload);
    //  }
    //);
  }

  private saveFileData(upload: Upload) {
    console.log("try adding to collection");
    this.db.collection('${this.basePath}/').add(Object.assign({}, upload));
    console.log("Upload Complete: " + upload.url);
  }
}
