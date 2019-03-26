import { CampaignService } from 'src/app/services/campaign.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  formBtn = 'Update';
  formTitle = 'Campaign Detail';

  id = '';

  campaignData = {
    org_id: '',
    title: '',
    camp_desc: '',
    landing_page_url: '',
    remark: ''
  };

  organizations = [];

  constructor(
    private mainComponent: MainComponent,
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.formBtn = 'Update';
      this.formTitle = 'Campaign Detail';
      this.getCampaignDtl(this.id);
    } else {
      this.formBtn = 'Add';
      this.formTitle = 'Add Campaign';
      this.getCampaignDtl(0);
    }
  }

  getCampaignDtl(id) {
    this.campaignService.getCampaignDtl(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.campaignData = data.data.campaign;
        this.organizations = data.data.organizations;
        // tslint:disable-next-line:max-line-length
        this.campaignData.org_id = (this.campaignData.org_id) ? this.campaignData.org_id.toString() : ((this.organizations && this.organizations.length > 0) ? this.organizations[0].id.toString() : '' );
      } else {
        this.campaignData = {
          org_id: '',
          title: '',
          camp_desc: '',
          landing_page_url: '',
          remark: ''
        };
        this.organizations = [];
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  addCamp() {
    const formdata = new FormData();
    if (!this.campaignData.org_id || this.campaignData.org_id === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Select Organization', title: 'Required'});
      return;
    } else {
      formdata.append('org_id', this.campaignData.org_id);
      console.log('Appended Org id: ', this.campaignData.org_id);
    }
    if (!this.campaignData.title || this.campaignData.title === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter campaign title', title: 'Required'});
      return;
    } else {
      formdata.append('title', this.campaignData.title);
    }
    if (!this.campaignData.camp_desc || this.campaignData.camp_desc === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter campaign description', title: 'Required'});
      return;
    } else {
      formdata.append('camp_desc', this.campaignData.camp_desc);
    }
    if (!this.campaignData.landing_page_url || this.campaignData.landing_page_url === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter URL', title: 'Required'});
      return;
    } else {
      formdata.append('landing_page_url', this.campaignData.landing_page_url);
    }
    if (!this.campaignData.remark || this.campaignData.remark === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter remark', title: 'Required'});
      return;
    } else {
      formdata.append('remark', this.campaignData.remark);
    }
    if (this.id) {
      formdata.append('id', this.id);
    }
    this.formBtn = 'Loading...';

    this.campaignService.postCampaign(formdata).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/campaigns']);
      } else {
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Success'});
      }
      if (this.id) {
        this.formBtn = 'Update';
      } else {
        this.formBtn = 'Add';
      }
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Update';
    });
  }
}
