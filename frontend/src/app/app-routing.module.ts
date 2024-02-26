import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "announcements", component: AnnouncementsComponent },
  { path: "projects", component: ProjectsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }