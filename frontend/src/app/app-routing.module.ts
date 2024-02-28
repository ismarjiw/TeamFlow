import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanylistselectorComponent } from './components/companylistselector/companylistselector.component';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UserregistryComponent } from './components/userregistry/userregistry.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "companies", component: CompanylistselectorComponent},
  {path: "teams", component: TeamsComponent},
  {path: "users", component: UserregistryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
