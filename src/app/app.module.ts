import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { PagesModule } from './pages/pages.module';
import { CardsModule } from './cards/cards.module';
import { ImageService } from './services/image.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { UploadService } from './services/upload.service';

import { NavbarComponent } from './navbar/navbar.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageFilterPipe } from './pipes/image-filter.pipe';

import { AlbumComponent } from './album/album.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ImageMenuComponent } from './context-menu/image-menu/image-menu.component';
import { AlbumMenuComponent } from './context-menu/album-menu/album-menu.component';
import { OnlyImgClickDirective } from './directives/only-img-click.directive';
import { OnlyAlbumClickDirective } from './directives/only-album-click.directive';
import { ImageDataComponent } from './image-data/image-data.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

import { FooterComponent } from './footer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ImageDetailComponent,
    ImageFilterPipe,
    AlbumComponent,
    ContextMenuComponent,
    ImageMenuComponent,
    AlbumMenuComponent,
    OnlyImgClickDirective,
    OnlyAlbumClickDirective,
    ImageDataComponent,
    PortfolioComponent,

    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    PagesModule,
    CardsModule
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
