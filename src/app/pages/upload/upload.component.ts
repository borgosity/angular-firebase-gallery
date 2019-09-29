import { Component, OnInit, OnChanges} from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../models/upload.model';
import { AlbumService } from '../../services/pages/album.service';
import { Album } from '../../models/album.model';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges {
  files: FileList;
  albumKey = '';
  upload: Upload;
  albums: Observable<Album[]>;
  albumId = 'undefined';
  selectedAlbum: Album;
  selected: boolean = false;

  imagePreviewSrc: any[] = [];
  private privacy: number = 0;

  constructor(
    private uploadService: UploadService,
    private albumService: AlbumService,
    private authService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.canUpload()) {
      this.router.navigate(['login']);
    }
    else {
      this.albums = this.albumService.getAllAlbums();
    }
  }

  ngOnChanges() {
    this.albums = this.albumService.getAllAlbums();
  }

  handleFiles(event) {
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

  selectChangeHandler(event: any) {
    if (event.target.value == 'undefined' || event.target.value == 'addAlbum') {
      this.albumId = event.target.value;
      this.selected = false;
    }
    else {
      this.albumId = this.selectedAlbum.name;
      this.selected = true;
    }
    console.log(this.albumId);
  }

  uploadFiles() {
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      this.upload = new Upload();
      this.upload.name = filesToUpload[idx].name;
      this.upload.collection = this.selectedAlbum.$key;
      this.uploadService.uploadFile(this.upload, this.selectedAlbum.role, filesToUpload[idx]);
    });
    this.updateImageCount(this.upload.collection, filesToUpload.length);
  }

  private updateImageCount(albumKey: string, imageCount: number) {
    this.albumService.updateAlbumImageCount(albumKey, imageCount);
  }

  addAlbum(name: any, privacy: any) {
    this.albumService.addAlbum(new Album(name, privacy, []));
    this.albumId = 'undefined';
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
