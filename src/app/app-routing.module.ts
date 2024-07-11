import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './forcast/location/location.component';
import { AuthGuard } from './shared/auth.guard';
// import { WeatherModalComponent } from './forcast/weather-modal/weather-modal.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: '', component:LocationComponent , canActivate: [AuthGuard] },
  {path:'Home',component:LocationComponent,canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // {path:'weather',component:WeatherModalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
