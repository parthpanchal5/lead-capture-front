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

  public barChartLabels = ['20-3-19', '21-3-19', '22-3-19', '23-3-19', '24-3-19', '25-3-19'];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    { data: [10, 15, 16, 50, 5, 3], label: 'PUBG Campaign' },
  ];
  constructor(
    public dialogRef: MatDialogRef<ChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
