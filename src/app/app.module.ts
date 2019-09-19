import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { PagesModule } from './pages/pages.module';

import { ImageService } from './services/image.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { UploadService } from './services/upload.service';

import { NavbarComponent } from './navbar/navbar.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ImageMenuComponent } from './context-menu/image-menu/image-menu.component';
import { AlbumMenuComponent } from './context-menu/album-menu/album-menu.component';
import { ImageDataComponent } from './image-data/image-data.component';
import { OnlyImgClickDirective } from './directives/only-img-click.directive';
import { OnlyAlbumClickDirective } from './directives/only-album-click.directive';
import { ImageFilterPipe } from './pipes/image-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ImageFilterPipe,
    ContextMenuComponent,
    ImageMenuComponent,
    AlbumMenuComponent,
    OnlyImgClickDirective,
    OnlyAlbumClickDirective,
    ImageDataComponent,
  ],
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
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
