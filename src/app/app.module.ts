import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { ImageService } from './services/image.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { UploadService } from './services/upload.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageFilterPipe } from './pipes/image-filter.pipe';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { AlbumComponent } from './album/album.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ImageMenuComponent } from './context-menu/image-menu/image-menu.component';
import { AlbumMenuComponent } from './context-menu/album-menu/album-menu.component';
import { OnlyImgClickDirective } from './directives/only-img-click.directive';
import { OnlyAlbumClickDirective } from './directives/only-album-click.directive';
import { ImageDataComponent } from './image-data/image-data.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SubmitComponent } from './submit/submit.component';
import { ImageCardComponent } from './cards/image-card/image-card.component';
import { AlbumCardComponent } from './cards/album-card/album-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    ImageDetailComponent,
    ImageFilterPipe,
    LoginComponent,
    UploadComponent,
    AlbumComponent,
    ContextMenuComponent,
    ImageMenuComponent,
    AlbumMenuComponent,
    OnlyImgClickDirective,
    OnlyAlbumClickDirective,
    ImageDataComponent,
    PortfolioComponent,
    SubmitComponent,
    ImageCardComponent,
    AlbumCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthenticationGuardService,
    AuthenticationService,
    ImageService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
