import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations.service';

export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations = [];
  statuses: Status[] = [
    {value: 'enable', viewValue: 'Enable' },
    {value: 'disable', viewValue: 'Disable' }

  ];

  constructor(private organizationService: OrganizationsService, private mainComponent: MainComponent) { }

  ngOnInit() {
    this.getOrganizations();
  }

  // Get all Orgaizations
  public getOrganizations() {
    this.organizationService.getOrganizations().subscribe((data) => {
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
