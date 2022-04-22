import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LogInComponent } from './login/login.component';

import { UserManagementComponent } from './Features/user-management/user-management.component';


import { SuperAuthGuard } from './services/super-auth.guard';
import { PerimeterComponent } from './Features/perimeter/perimeter.component';

import { PageSettingComponent } from './settings/page-setting/page-setting.component';
import { AuthguardGuard } from './services/authguard.guard';
import { TrafficCountComponent } from './Features/traffic-count/traffic-count.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { YearlyComponent } from './yearly/yearly.component';
import { QuarterlyComponent } from './quarterly/quarterly.component';
import { CompareYearlyComponent } from './compare-yearly/compare-yearly.component';
import { CompareWeeklyComponent } from './compare-weekly/compare-weekly.component';
import { CompareMonthlyComponent } from './compare-monthly/compare-monthly.component';

const routes: Routes = [
 
  { path: 'login', component: LogInComponent },
  { path: 'app/Home',  component: HomeComponent},

  { path: 'app',  component: HomeComponent ,canActivate:[AuthguardGuard],
    children:[
      {path:'PerimeterViolation' ,component:PerimeterComponent},
      
      
      { path:'userManagement',component:UserManagementComponent},
      {path:'traficCount',component:TrafficCountComponent},
      {path: 'interval', component:AnalysisComponent},
      {path: 'yearly', component:YearlyComponent},
      {path: 'quarterly', component:QuarterlyComponent},
      {path: 'comparing-year', component:CompareYearlyComponent},
      {path: 'comparing-month', component:CompareMonthlyComponent},
      {path: 'comparing-week', component:CompareWeeklyComponent},
      {path: '**', component: LogInComponent},
      
      
      {path:"PageSettings",component:PageSettingComponent}


    ] 
},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
//,canActivate:[AuthguardGuard]