import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanylistselectorComponent } from './components/companylistselector/companylistselector.component';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamComponent } from './components/teams/team/team.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateteamComponent } from './modals/createteam/createteam.component';
import { UserregistryComponent } from './components/userregistry/userregistry.component';
import { MatTableModule } from '@angular/material/table';
import { AdduserComponent } from './modals/adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { NavmenuMobileComponent } from './navmenu-mobile/navmenu-mobile.component';
import { AnnouncementComponent } from './announcements/announcement/announcement.component';
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';
import { ProjectComponent } from './projects/project/project.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'


@NgModule({
  declarations: [
    AppComponent,
    CompanylistselectorComponent,
    HomeComponent,
    TeamsComponent,
    TeamComponent,
    CreateteamComponent,
    UserregistryComponent,
    AdduserComponent,
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    AnnouncementsComponent,
    NavmenuComponent,
    NavmenuMobileComponent,
    AnnouncementComponent,
    CreateAnnouncementComponent,
    ProjectComponent,
    CreateProjectComponent,
    EditProjectComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
