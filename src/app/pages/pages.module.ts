import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardsModule } from '../cards/cards.module';

import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { SubmitComponent } from './submit/submit.component';

@NgModule({
  declarations: [
    GalleryComponent,
    LoginComponent,
    UploadComponent,
    SubmitComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    CardsModule
  ]
})
export class PagesModule { }
