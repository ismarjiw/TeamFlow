import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { NavmenuMobileComponent } from './navmenu-mobile/navmenu-mobile.component';
import { AnnouncementComponent } from './announcements/announcement/announcement.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';
import { ProjectComponent } from './projects/project/project.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'


@NgModule({
  declarations: [
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
