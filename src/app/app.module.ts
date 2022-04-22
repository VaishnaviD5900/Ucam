import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './NavigationBar/header/header.component';
import { FooterComponent } from './NavigationBar/footer/footer.component';
import { MenubarComponent } from './NavigationBar/menubar/menubar.component';
import { ChartsModule } from 'ng2-charts';
import { LoginHeaderComponent } from './NavigationBar/header/login-header/login-header.component';
import { LogInComponent } from './login/login.component';
/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { FilterPipe } from './services/Filter.pipe';


import  'hammerjs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'

import { UserManagementComponent } from './Features/user-management/user-management.component';



import { UiSwitchModule } from 'ngx-ui-switch';
import { PerimeterComponent } from './Features/perimeter/perimeter.component';
import { PageSettingComponent } from './settings/page-setting/page-setting.component';
import {NgxImageZoomModule} from 'ngx-image-zoom'
import { configService } from 'src/app/services/config';
import { TrafficCountComponent } from './Features/traffic-count/traffic-count.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AnalysisComponent } from './analysis/analysis.component';
import { YearlyComponent } from './yearly/yearly.component';
import { QuarterlyComponent } from './quarterly/quarterly.component';
import { CompareYearlyComponent } from './compare-yearly/compare-yearly.component';
import { CompareWeeklyComponent } from './compare-weekly/compare-weekly.component';
import { CompareMonthlyComponent } from './compare-monthly/compare-monthly.component';
import { LoaderComponent } from './loader/loader.component'
import { LoadInterceptor } from './loader-interceptor';


@NgModule({
  declarations: [
    AppComponent,
   
    LogInComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenubarComponent,
    LoginHeaderComponent,

    // PerimeterprotectionComponent,
    // Covid19EnforcementComponent,
    // MsilSopsComponent,
    // HeatMapsComponent,
    // CarPlacementComponent,
    // NumberplateComponent,
    // FilterPipe,
    // ReidentificationComponent,
    // UserManagementComponent,
    // DashboardComponent,
    // ForgotPasswordComponent,
    // SuperLoginComponent,
    // DevicesComponent,
    // CameraComponent,
    // EdgeComponent,
      
    
    // SmartDashboardComponent,
    // AdminsComponent,
    // UsersComponent,
    // SuperadminlatestComponent,
    PerimeterComponent,
    TrafficCountComponent,
    AnalysisComponent,
    YearlyComponent,
    QuarterlyComponent,
    CompareYearlyComponent,
    CompareWeeklyComponent,
    CompareMonthlyComponent,
    LoaderComponent,
    // NSNumberplateComponent,
    // PageSettingComponent,
    
  
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxImageZoomModule,
    FontAwesomeModule,
    ChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
   
    UiSwitchModule,
    BsDatepickerModule.forRoot(),
    
    
    
  ],
  providers: [DatePipe,configService,{provide:HTTP_INTERCEPTORS,useClass:LoadInterceptor,multi:true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(lib:FaIconLibrary) {
    lib.addIconPacks(fas)
  }
 }

