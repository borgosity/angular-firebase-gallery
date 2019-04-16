import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'firebase/storage';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private uid: string;
  private collection = 'albums';

  constructor(
    private ngFire: AngularFireModule,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  addAlbum(album: Album) {
    const filePath = "/" + this.collection + "/" + album.name;
    console.log("add album: " + filePath);

    const db = this.db;

    db.collection(this.collection).add(Object.assign({}, album))
      .then(function (docRef) {
        console.log("Album written with ID: ", docRef.id);
        docRef.update({ $key: docRef.id});
      })
      .catch(function (error) {
        console.error("Error adding album document: ", error);
      });
  }

  getAlbums(): Observable<Album[]> {
    return this.db.collection('albums').valueChanges();
  }

  getAlbum(key: string) {
    return this.db.collection('albums').doc(key).ref.get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data().name;
        }
        else {
          return 'undefined';
        }
      })
      .catch(function (error) {
        console.log("Error getting album:", error);
      });
  }
}
