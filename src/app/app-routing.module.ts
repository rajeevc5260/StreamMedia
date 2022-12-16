import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { SignupComponent } from './Components/signup/signup.component';
import { VideoContentComponent } from './Components/video-content/video-content.component';
import { VideoUploadComponent } from './Components/video-upload/video-upload.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', redirectTo: 'dashboard/dashboardHome', pathMatch:'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] ,
  children: [
    { path:'dashboardHome', component: DashboardHomeComponent, },
    { path:'videoContent', component: VideoContentComponent,  },
    { path:'videoUpload', component: VideoUploadComponent, },
    { path:'settings', component:SettingsComponent, },
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
