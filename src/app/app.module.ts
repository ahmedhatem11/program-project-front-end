import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {UserService} from './services/user.service';
import { RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminPageComponent
      },
      {
        path: 'user',
        component: UserPageComponent
      }
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
