import { MainComponent } from './../main/main.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrgDialogComponent } from './org-dialog/org-dialog.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations = [];

  constructor(
    private organizationService: OrganizationsService,
    private mainComponent: MainComponent,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getOrganizations(1);
  }

  // Open Dialog
  openRepDialog() {
    const dialogRef = this.dialog.open(OrgDialogComponent, {
      width: '420px',
    });
  }
  // Get all Orgaizations
  public getOrganizations(page) {
    const queryTmp = '&page=' + ( (page) ? page : 1 );
    this.organizationService.getOrganizations(queryTmp).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.organizations = data.data;
        // console.log('hellooooo1' , this.organizations);
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
        this.router.navigate(['/app/organizations']);
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
