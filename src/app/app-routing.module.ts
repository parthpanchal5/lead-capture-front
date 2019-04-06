import { OrganizationDetailComponent } from './components/add-organization/organization-detail.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostComponent } from './components/post/post.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NgModule, Component } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';

const routes: Route[] = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
  { path: 'app', redirectTo: '/app/dashboard', pathMatch: 'full' },
  { path: 'app',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'organizations', component: OrganizationComponent },
      { path: 'add-organization', component: AddOrganizationComponent },
      { path: 'organization-detail/:id', component: OrganizationDetailComponent },
      { path: 'campaigns', component: CampaignComponent },
      { path: 'organization/:id/campaigns', component: CampaignComponent },
      { path: 'campaign/:id/posts', component: PostComponent },
      { path: 'campaign-detail/:id', component: AddCampaignComponent },
      { path: 'post-detail/:id', component: AddPostComponent },
      { path: 'posts', component: PostComponent },
      { path: 'organization/:id/posts', component: PostComponent },
      { path: 'add-post', component: AddPostComponent },
      { path: 'add-campaign', component: AddCampaignComponent },
      { path: 'pass-reset', component: PassResetComponent }
    ]
  },
  { path: '**', component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
