import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanylistselectorComponent } from './components/companylistselector/companylistselector.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UserregistryComponent } from './components/userregistry/userregistry.component';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "company/:cid/announcements", component: AnnouncementsComponent },
  { path: "company/:cid/teams/:tid/projects", component: ProjectsComponent},  
  {path: "companies", component: CompanylistselectorComponent},
  { path: "company/:cid/teams", component: TeamsComponent }, // Dynamic route for teams of a specific company
  {path: "company/:companyId/users", component: UserregistryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
