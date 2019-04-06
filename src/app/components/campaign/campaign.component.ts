import { ChartComponent } from './chart/chart.component';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CampDialogComponent } from './camp-dialog/camp-dialog.component';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  campaigns = [];

  campaignLeads = [];
  search = {
    orgId: '',
    campid: ''
  };

  constructor(
    private campaignService: CampaignService,
    private mainComponent: MainComponent,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    const orgId = this.route.snapshot.paramMap.get('id');
    const campid = this.route.snapshot.paramMap.get('id');
    console.log('Org campid : ', orgId);
    if ( orgId) {
      this.search.orgId = orgId;
    }
    if (campid) {
      this.search.campid = campid;
    }
    if (campid) {
      this.getCampaigns(1, this.search);
    }
    this.getCampaigns(1, this.search);
  }

  // Report
  openReportDialog() {
    const dialogRef = this.dialog.open(ChartComponent, {
      width: '720px'
    });
    dialogRef.afterClosed();
  }
   // Open Dialog
   openRepDialog(campId) {
    const dialogRef = this.dialog.open(CampDialogComponent, {
      width: '420px',
      data: {id : campId}
    });
    dialogRef.afterClosed();
  }
  // public getCampaignLeadCounts(campid) {
  //   this.campaignService.getCampaignLeadCounts(campid).subscribe((data) => {
  //     console.log('Lead data: ', data);
  //     if (data.status) {
  //       this.campaignLeads = data.data;
  //       console.log('Leads : ', this.campaignLeads);
  //     } else {
  //       this.campaignLeads = [];
  //     }
  //   }, error => {
  //     console.log('Error: ', error);
  //   });
  // }
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
        console.log('campaigns: ', this.campaigns);
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
        this.router.navigate(['/app/campaigns']);
      } else {
        this.mainComponent.alertMessage({title: 'Operation Failed', message: data.message, type: 'error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
}
