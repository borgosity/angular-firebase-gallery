import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GalleryComponent } from "./gallery/gallery.component";
import { AlbumComponent } from "./album/album.component";
import { ImageDetailComponent } from "./image-detail/image-detail.component";
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';


const routes: Routes = [
  { path: "portfolio", component: PortfolioComponent},
  { path: "gallery", component: GalleryComponent, canActivate: [AuthenticationGuardService] },
  { path: "album/:name/:id", component: AlbumComponent, canActivate: [AuthenticationGuardService] },
  { path: "upload", component: UploadComponent, canActivate: [AuthenticationGuardService] },
  { path: "image/:album/:id", component: ImageDetailComponent, canActivate: [AuthenticationGuardService] },
  { path: "", redirectTo: "/portfolio", pathMatch: 'full' },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
