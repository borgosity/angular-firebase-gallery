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

  private uploads: AngularFirestoreCollection<GalleryImage>;

  private uploadPercent: Observable<number>;

  constructor(
    private ngFire: AngularFireModule,
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  uploadFile(upload: Upload, file: File) {
    console.log(file);

    const filePath = "/" + upload.collection + "/" + file.name;
    const db = this.db;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    // monitor progrees
    this.uploadPercent = uploadTask.percentageChanges();
    this.uploadPercent.subscribe(uploadProgress);
    // check when upload is done
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        console.log("file uploaded");
        storageRef.getDownloadURL().subscribe(uploadedURL);
      }),
    ).subscribe()

    function uploadedURL(url: string){
      upload.url = url;
      saveFileData(upload);
      console.log(upload.url);
    }

    function uploadProgress(percent: number) {
      upload.progress = percent;
      console.log(upload.progress);
    }

    function saveFileData(uploaded: Upload) {
      console.log("try adding to collection");
      db.collection(uploaded.collection).add(Object.assign({}, uploaded))
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }

  }

}
