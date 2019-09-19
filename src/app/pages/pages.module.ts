import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { AlbumComponent } from './album/album.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { SubmitComponent } from './submit/submit.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [
    AlbumComponent,
    ImageDetailComponent,
    GalleryComponent,
    LoginComponent,
    PortfolioComponent,
    SubmitComponent,
    UploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
