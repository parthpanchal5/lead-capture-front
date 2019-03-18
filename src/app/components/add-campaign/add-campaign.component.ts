import { CampaignService } from 'src/app/services/campaign.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  formBtn = 'Create Campaign';
  formTitle = 'Add Campaign';

  campaignData = {
    title: '',
    camp_desc: '',
    landing_page_url: '',
    remark: ''
  };

  constructor(
    private mainComponent: MainComponent,
    private campaignService: CampaignService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addCamp() {
    const formdata = new FormData();

    if (this.campaignData.title === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter campaign title', title: 'Required:'});
      return;
    } else {
      formdata.append('title', this.campaignData.title);
    }
    if (this.campaignData.camp_desc === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter campaign description', title: 'Required:'});
      return;
    } else {
      formdata.append('camp_desc', this.campaignData.camp_desc);
    }
    if (this.campaignData.landing_page_url === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter URL', title: 'Required:'});
      return;
    } else {
      formdata.append('landing_page_url', this.campaignData.landing_page_url);
    }
    if (this.campaignData.remark === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter remark', title: 'Required:'});
      return;
    } else {
      formdata.append('remark', this.campaignData.remark);
    }
    this.formBtn = 'Loading...';
    this.campaignService.postCampaign(formdata).subscribe((data) => {
      console.log('Data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/campaigns']);
      } else {
        this.mainComponent.alertMessage({type: 'alert', message:  data.message, title: 'Error'});
      }
      this.formBtn = 'Create Campaign';
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Create Campaign';
    });
  }
}
