import { Component, OnInit, OnChanges} from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Upload } from '../models/upload.model';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ImageDataService } from '../services/image-data.service';



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
  private privacy: number = 0;
 

  constructor(
    private uploadService: UploadService,
    private albumService: AlbumService) {
  }

  ngOnInit() {
    this.albums = this.albumService.getAllAlbums();
  }

  ngOnChanges() {
    this.albums = this.albumService.getAllAlbums();
  }

  handleFiles(event) {
    this.files = event.target.files;
    this.upload = null;
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
    this.albumService.addAlbum(new Album(name, privacy));
    this.albumId = 'undefined';
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
