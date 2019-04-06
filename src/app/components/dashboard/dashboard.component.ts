import { DashboardService } from './../../services/dashboard.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  counts = {};

  constructor(
    private mainComponent: MainComponent,
    private dashBoardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }
  ngOnInit() {
    this.dashboardCounts();
  }

  public dashboardCounts() {
    this.dashBoardService.dashboardCounts().subscribe((data) => {
      console.log('Dasss: ', data);
      if (data.status) {
        this.counts = data.data;
        console.log('Counts: ', this.counts);
      } else {
        this.counts = {};
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
  public demoClick() {
    this.mainComponent.alertMessage({type: 'error', message: 'hello', title: 'checking'});
  }

}
