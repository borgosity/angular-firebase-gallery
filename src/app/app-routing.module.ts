import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GalleryComponent } from "./gallery/gallery.component";
import { AlbumComponent } from "./album/album.component";
import { ImageDetailComponent } from "./image-detail/image-detail.component";
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { SubmitComponent } from './submit/submit.component';


const routes: Routes = [
  { path: "portfolio", component: PortfolioComponent},
  { path: "album/:name/:id", component: AlbumComponent},
  { path: "image/:album/:id", component: ImageDetailComponent},
  { path: "upload", component: UploadComponent, canActivate: [AuthenticationGuardService] },
  { path: "submit", component: SubmitComponent, canActivate: [AuthenticationGuardService] },
  { path: "gallery/:type/:name", component: GalleryComponent, canActivate: [AuthenticationGuardService] },
  { path: "", redirectTo: "/portfolio", pathMatch: 'full' },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
