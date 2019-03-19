import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  campaigns = [];
  search = {
    orgId: ''
  };

  constructor(
    private campaignService: CampaignService,
    private mainComponent: MainComponent,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const orgId = this.route.snapshot.paramMap.get('id');
    console.log('Org id : ', orgId);
    if ( orgId) {
      this.search.orgId = orgId;
    }
    this.getCampaigns(1, this.search);
  }

  // Get all Campaigns
  public getCampaigns(page, search) {
    const queryTmp = [''];
    queryTmp.push('page=' + ( (page) ? page : 1 ));
    if ( search ) {
      if (search.orgId !== '' && search.orgId !== null) {
        queryTmp.push('org_id=' + search.orgId);
      }
    }
    console.log('query : ', queryTmp.join('&'));
    this.campaignService.getCampaigns(queryTmp.join('&')).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.campaigns = data.data;
      } else {
        this.campaigns = [];
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  // Pagination
  public PageHandler(event) {
    this.getCampaigns(event.pageIndex + 1, this.search);
  }

  // Delete with id
  public deleteCamp(id) {
    this.campaignService.deleteCampaign(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({title: 'Deleted', message: data.message, type: 'success'});
        this.campaigns = this.campaigns.filter((item) => {
          return item.id !== id;
        });
      } else {
        this.mainComponent.alertMessage({title: 'Operation Failed', message: data.message, type: 'error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
}
