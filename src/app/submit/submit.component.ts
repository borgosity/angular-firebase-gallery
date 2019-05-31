import { Component, OnInit, OnChanges } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Upload } from '../models/upload.model';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit, OnChanges {

  files: FileList;
  albumKey = '';
  upload: Upload;
  albumId = 'undefined';
  selectedAlbum: Album;
  selected: boolean = false;

  imagePreviewSrc: any[] = [];

  constructor(
    private uploadService: UploadService,
    private albumService: AlbumService,
    private authService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.canSubmit()) {
      this.router.navigate(['login']);
    }
    else {
      this.albumService.getSubmitAlbum().subscribe(albums => this.selectAlbum(albums));
    }
  }

  ngOnChanges() {
    this.albumService.getSubmitAlbum().subscribe(albums => this.selectAlbum(albums));
  }

  selectAlbum(albums: Album[]) {
    if (albums.length > 0) {
      this.selectedAlbum = albums[0];
    }
  }

  handleFiles(event) {
    this.imagePreviewSrc = [];
    this.files = event.target.files;
    console.log("file 0: " + JSON.stringify(event.target.files));
    this.imagePreview();
    this.upload = null;
  }

  private imagePreview() {
    const filesIdx = _.range(this.files.length);
    _.each(filesIdx, (idx) => {
      const file = this.files[idx];
      const reader = new FileReader();
      reader.onload = e => this.imagePreviewSrc.push(reader.result);
      reader.readAsDataURL(file);
    });
  }

  submitFiles() {
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      this.upload = new Upload();
      this.upload.name = filesToUpload[idx].name;
      this.upload.collection = this.selectedAlbum.$key;
      this.uploadService.uploadFile(this.upload, this.selectedAlbum.role, filesToUpload[idx]);
    });
  }


}
