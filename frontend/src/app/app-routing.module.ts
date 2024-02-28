import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanylistselectorComponent } from './components/companylistselector/companylistselector.component';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UserregistryComponent } from './components/userregistry/userregistry.component';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "announcements", component: AnnouncementsComponent },
  { path: "company/:cid/teams/:tid/projects", component: ProjectsComponent},  
  {path: "companies", component: CompanylistselectorComponent},
  {path: "teams", component: TeamsComponent},
  { path: "company/:companyId/teams", component: TeamsComponent }, // Dynamic route for teams of a specific company
  {path: "users", component: UserregistryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
