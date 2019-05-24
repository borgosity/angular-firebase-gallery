import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { GalleryImage } from '../models/galleryImage.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Upload } from '../models/upload.model';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { ImageDataService } from './image-data.service';
import { AuthenticationService } from './authentication.service';
import { ImageViewData } from '../models/imageViewData.model';
import { AlbumRoles } from '../models/albumRoles.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private uploads: AngularFirestoreCollection<GalleryImage>;
  private user: Observable<firebase.User>;
  private userEmail: string;
  private uid: string;

  uploadPercent: Observable<number>;

  constructor(
    private ngFire: AngularFireModule,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private dataService: ImageDataService,
    private authService: AuthenticationService) {

    this.user = this.authService.authUser();
    this.user.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.uid = user.uid;
      }
    });
  }

  uploadFile(upload: Upload, privacy: string, file: File) {
    console.log(file);

    const filePath = "/images/" + privacy + "/" + this.uid + "/" + upload.collection + "/" + file.name;

    const db = this.db;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    const user = this.userEmail;
    const dataService = this.dataService;
    // monitor progrees
    this.uploadPercent = uploadTask.percentageChanges();
    this.uploadPercent.subscribe(uploadProgress);
    // check when upload is done
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        console.log("file uploaded");
        storageRef.getDownloadURL().subscribe(uploadedURL);
        upload.progress = 95;
      }),
    ).subscribe()

    function uploadedURL(url: string) {
      upload.url = url;
      saveFileData(upload);
      console.log(upload.url);
    }

    function uploadProgress(percent: number) {
      upload.progress = Math.round(percent - (percent * 0.1));
    }

    function saveFileData(uploaded: Upload) {
      console.log("try adding to collection" + JSON.stringify(uploaded));
      db.collection(uploaded.collection).add(Object.assign({}, uploaded))
        .then(function (docRef) {
          docRef.update({ $key: docRef.id, progress: 100 });
          addImageData(docRef.id);
          uploaded.progress = 100;
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding image document: ", error);
        });
    }

    function addImageData(imageKey: string) { 
      const imageData: ImageViewData = {
        $key: imageKey,
        totalViews: 0,
        userViews: [
          {
            user: user,
            viewCount: 0,
            longestView: 0
          }
        ]
      };

      dataService.addImageData(imageData);
    }

  }

}
