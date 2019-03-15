import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// UI
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './material';
import { MatInputModule } from '@angular/material';
import { OrganizationComponent } from './components/organization/organization.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './token';
import { CampaignComponent } from './components/campaign/campaign.component';
import { OrgFilterComponent } from './components/org-filter/org-filter.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPassComponent,
    NavbarComponent,
    MainComponent,
    DashboardComponent,
    OrganizationComponent,
    AddOrganizationComponent,
    CampaignComponent,
    OrgFilterComponent,
    PostComponent,
    AddPostComponent,
    AddCampaignComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    MatFileUploadModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [LoginService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
