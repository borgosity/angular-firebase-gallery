import { Component, OnInit, OnChanges} from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Upload } from '../models/upload.model';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges {

  files: FileList;
  upload: Upload;
  albums: Observable<Album[]>;
  albumForm: FormGroup;
  albumOptions: FormControl;
 

  constructor(
    private uploadService: UploadService,
    private albumService: AlbumService,
    private fb: FormBuilder) {
    this.albumForm = new FormGroup({
      albumOptions: new FormControl(),
      albumName: new FormControl()
    }); 
  }

  ngOnInit() {
    this.albums = this.albumService.getAlbums();
    this.albumForm = this.fb.group({
      albumOptions: this.albums,
      albumName: ''
    });
  }

  ngOnChanges() {
    this.albums = this.albumService.getAlbums();
  }

  handleFiles(event) {
    this.files = event.target.files;
    this.upload = null;
  }

  uploadFiles() {
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      console.log("uploadFiles component: " + filesToUpload[idx]);
      this.upload = new Upload();
      this.upload.name = filesToUpload[idx].name;
      this.upload.collection = 'uploads';
      this.uploadService.uploadFile(this.upload, filesToUpload[idx]);
    });
  }

  addAlbum() {
    console.log("addAlbum: " + this.albumForm.controls['albumName'].value);
    this.albumService.addAlbum(new Album(this.albumForm.controls['albumName'].value));
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
