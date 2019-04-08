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

  handleFiles() {

  }

  uploadFiles() {
    const filesToUpload = this.files;
    console.log(_.range(filesToUpload.length));
    //const filesIdx = _.range(filesToUpload.length);
  }

}
