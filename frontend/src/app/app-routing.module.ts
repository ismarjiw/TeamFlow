import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanylistselectorComponent } from './companylistselector/companylistselector.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "companies", component: CompanylistselectorComponent},
  {path: "teams", component: TeamsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
