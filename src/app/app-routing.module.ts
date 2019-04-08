import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from "./gallery/gallery.component";
import { ImageDetailComponent } from "./image-detail/image-detail.component";
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';


const routes: Routes = [
  { path: "gallery", component: GalleryComponent, canActivate: [AuthenticationGuardService] },
  { path: "upload", component: UploadComponent, canActivate: [AuthenticationGuardService] },
  { path: "image/:id", component: ImageDetailComponent, canActivate: [AuthenticationGuardService] },
  { path: "", redirectTo: "/gallery", pathMatch: 'full' },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
