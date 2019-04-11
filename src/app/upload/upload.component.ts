import { Component} from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Upload } from '../models/upload.model';
import * as _ from 'lodash';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  files: FileList;
  upload: Upload;

  constructor(private uploadService: UploadService) { }

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

}
