// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { OrgFilterComponent } from './components/org-filter/org-filter.component';
import { OrganizationDetailComponent } from './components/add-organization/organization-detail.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { PostComponent } from './components/post/post.component';
import { CampaignDetailComponent } from './components/add-campaign/campaign-detail.component';
import { PostDetailComponent } from './components/add-post/post-detail.component';

// Module
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material';
import { MatInputModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { LoginService } from './services/login.service';
import { TokenService } from './token';


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
    AddCampaignComponent,
    PassResetComponent,
    OrganizationDetailComponent,
    CampaignDetailComponent,
    PostDetailComponent
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
