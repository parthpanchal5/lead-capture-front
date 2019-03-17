import { OrganizationsService } from './../../services/organizations.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  formBtn = 'Update Organization';

  formTitle = 'Organization Detail';
  id = '';

  orgData = {
    org_name: '',
    org_desc: ''
  };
  constructor(
    private mainComponent: MainComponent,
    private organizationService: OrganizationsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrganizationDtl(this.id);
  }

  getOrganizationDtl(id) {
    this.organizationService.getOrganizationDtl(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.orgData = data.data;
      } else {
        this.orgData = {
          org_name: '',
          org_desc: ''
        };
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Success'});
      }
    }, error => {
      console.log('Error: ', error);
    });
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
    formdata.append('id', this.id);
    this.formBtn = 'Loading...';

    this.organizationService.postOrganization(formdata).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/organizations']);
      } else {
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Success'});
      }
      this.formBtn = 'Update Organization';
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Update Organization';
    });
  }

}
