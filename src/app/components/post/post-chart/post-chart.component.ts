import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostService } from './../../../services/post.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-post-chart',
  templateUrl: './post-chart.component.html',
  styleUrls: ['./post-chart.component.css']
})
export class PostChartComponent implements OnInit {
  public  lineChartOptions = {
    responsive: true
  };
  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Views'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Leads'},
  ];
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartColors = [
    { // blue
      backgroundColor: 'rgba(32, 91, 130, 0.2)',
      borderColor: 'rgba(48, 88, 114, 0.91)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.9)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.9)'
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<PostChartComponent>,
    @Inject(MAT_DIALOG_DATA) public post: string,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postChart(this.post);
  }

  postChart(id) {
    console.log('Post Data: ');
    this.postService.postChart(id).subscribe((data) => {
      if (data.status) {
        this.lineChartLabels = [];
        this.lineChartData[0].data = [];
        this.lineChartData[1].data = [];
        // tslint:disable-next-line:forin
        for (const line in data.data) {
          this.lineChartLabels.push(line);
          this.lineChartData[0].data.push(data.data[line].leads);
          this.lineChartData[1].data.push(data.data[line].enquiries);
        }
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
