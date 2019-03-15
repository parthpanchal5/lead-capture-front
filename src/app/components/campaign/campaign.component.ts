import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { CamapaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  campaigns = [];
  constructor(private campaignService: CamapaignService, private mainComponent: MainComponent) { }

  ngOnInit() {
    this.getCampaigns();
  }

  //
  public getCampaigns() {
    this.campaignService.getCampaigns().subscribe((data) => {
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
