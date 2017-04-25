import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasonryModule } from 'angular2-masonry';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { NewImageComponent } from './new-image/new-image.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes:Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:':username',component:UserProfileComponent},
  {path:'profile/404',component:NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HomeComponent,
    NewImageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    MasonryModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents:[NewImageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
