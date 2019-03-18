import { CampaignService } from './../../services/campaign.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class CampaignDetailComponent implements OnInit {

  formBtn = 'Update Campaign';

  formTitle = 'Campaign Detail';

  id = '';

  campaignData = {
    title: '',
    camp_desc: '',
    landing_page_url: '',
    remark: ''
  };

  constructor(
    private mainComponent: MainComponent,
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCampaignDtl(this.id);
  }

  getCampaignDtl(id) {
    this.campaignService.getCampaignDtl(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.campaignData = data.data;
      } else {
        this.campaignData = {
          title: '',
          camp_desc: '',
          landing_page_url: '',
          remark: ''
        };
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
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
    formdata.append('id', this.id);
    this.formBtn = 'Loading...';

    this.campaignService.postCampaign(formdata).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/campaigns']);
      } else {
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Success'});
      }
      this.formBtn = 'Update Campaign';
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Update Campaign';
    });
  }

}
