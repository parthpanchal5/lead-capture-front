import { CampaignService } from 'src/app/services/campaign.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-org-dialog',
  templateUrl: './org-dialog.component.html',
  styleUrls: ['./org-dialog.component.css']
})
export class OrgDialogComponent implements OnInit {

  campaigns = [];

  constructor(
    private campaignService: CampaignService
   ) { }

  ngOnInit() {
  }

}
