import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProjectsComponent } from './projects/projects.component';
import { CompanylistselectorComponent } from './companylistselector/companylistselector.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { UserregistryComponent } from './userregistry/userregistry.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "announcements", component: AnnouncementsComponent },
  { path: "projects", component: ProjectsComponent},  
  {path: "companies", component: CompanylistselectorComponent},
  {path: "teams", component: TeamsComponent},
  {path: "users", component: UserregistryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }