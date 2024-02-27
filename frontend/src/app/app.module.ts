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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    AnnouncementsComponent,
    NavmenuComponent,
    NavmenuMobileComponent,
    AnnouncementComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
