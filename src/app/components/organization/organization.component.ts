import { MainComponent } from './../main/main.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations = [];

  constructor(
    private organizationService: OrganizationsService,
    private mainComponent: MainComponent) { }

  ngOnInit() {
    this.getOrganizations(1);
  }

  // Get all Orgaizations
  public getOrganizations(page) {
    const queryTmp = '&page=' + ( (page) ? page : 1 );
    this.organizationService.getOrganizations(queryTmp).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.organizations = data.data;
      } else {
        this.organizations = [];
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  // Pagination
  public PageHandler(event) {
    this.getOrganizations(event.pageIndex + 1);
  }

  // Delete organization
  public deleteOrg(id) {
    this.organizationService.deleteOrganization(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({title: 'Deleted', message: data.message, type: 'success'});
        this.organizations = this.organizations.filter((item) => {
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
