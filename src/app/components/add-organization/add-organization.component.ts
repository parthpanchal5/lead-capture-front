import { OrganizationsService } from './../../services/organizations.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {

  formBtn = 'Add Organization';
  formTitle = 'Add Organization';

  orgData = {
    org_name: '',
    org_desc: ''
  };

  constructor(
    private mainComponent: MainComponent,
    private organizationService: OrganizationsService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  addOrg() {
    const formdata = new FormData();
    if (this.orgData.org_name === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Enter Organization Name', title: 'Required'});
      return;
    } else {
      formdata.append('org_name', this.orgData.org_name);
    }
    if (this.orgData.org_desc === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Enter Organization Description', title: 'Required'});
      return;
    } else {
      formdata.append('org_desc', this.orgData.org_desc);
    }
    this.formBtn = 'Loading...';
    this.organizationService.postOrganization(formdata).subscribe((data) => {
      // console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/organizations']);
      } else {
        this.mainComponent.alertMessage({type: 'alert', message: data.message, title: 'Success'});
      }
      this.formBtn = 'Add Organization';
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Add Organization';
    });
  }

}
