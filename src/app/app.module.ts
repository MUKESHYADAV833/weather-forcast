import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './forcast/location/location.component';
import { ReportComponent } from './forcast/report/report.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonPipe } from './pipes/common.pipe';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from './forcast/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocationComponent,
    ReportComponent,
    CommonPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
