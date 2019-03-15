import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private mainComponent: MainComponent) { }

  ngOnInit() {
  }
  public demoClick() {
    this.mainComponent.alertMessage({type: 'error', message: 'hello', title: 'checking'});
  }

}
