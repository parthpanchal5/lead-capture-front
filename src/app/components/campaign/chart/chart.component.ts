import { CampaignService } from './../../../services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Lead' },
    { data: [], label: 'Enquiry' }
  ];
  constructor(
    public dialogRef: MatDialogRef<ChartComponent>,
    @Inject(MAT_DIALOG_DATA) public camp: string,
    public campaignService: CampaignService) { }

  ngOnInit() {
    // console.log('Id: ', this.camp);
    this.getCampaignChart(this.camp);
  }

  getCampaignChart(id) {
    this.campaignService.CampaignChart(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.barChartLabels = data.data.map((item) => {
          return item.title;
        });
        this.barChartData[0].data = data.data.map((item) => {
          return item.leads;
        });
        this.barChartData[1].data = data.data.map((item) => {
          return item.enquires;
        });
      } else {

      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
