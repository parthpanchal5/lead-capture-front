import { CampaignService } from './../../services/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainComponent } from './../main/main.component';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { CommanService } from 'src/app/services/comman.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  formBtn = 'Add';
  formTitle = 'Add Post';

  id = '';

  postData = {
    org_id: '',
    campaign_id: '',
    title: '',
    post_desc: '',
    post_type: '',
    track_id: '',
    post_content: '',
    remark: ''
  };

  organizations = [];
  campaigns = [];

  constructor(
    private mainComponent: MainComponent,
    private postService: PostService,
    private campaignService: CampaignService,
    private router: Router,
    private commanService: CommanService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.formBtn = 'Update';
      this.formTitle = 'Post Detail';
      this.getPostDtl(this.id);
    } else {
      this.formBtn = 'Add';
      this.formTitle = 'Add Post';
      this.getPostDtl(0);
    }
  }

  getPostDtl(id) {
    this.postService.getPostDtl(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.postData = data.data.post;
        this.organizations = data.data.organizations;
        this.campaigns = data.data.campaigns;
        // tslint:disable-next-line:max-line-length
        this.postData.org_id = (this.postData.org_id) ? this.postData.org_id.toString() : ((this.organizations && this.organizations.length > 0) ? this.organizations[0].id.toString() : '');
        // tslint:disable-next-line:max-line-length
        this.postData.campaign_id = (this.postData.campaign_id) ? this.postData.campaign_id.toString() : ((this.campaigns && this.campaigns.length > 0) ? this.campaigns[0].id.toString() : '');
        this.getCampaignDD(this.postData.org_id);
      } else {
        this.postData = {
          org_id: '',
          campaign_id: '',
          title: '',
          post_desc: '',
          post_type: '',
          track_id: '',
          post_content: '',
          remark: ''
        };
        this.organizations = [];
        this.campaigns = [];
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
  getCampaignDD(orgid){
    this.campaignService.getCampaignDD(orgid).subscribe((data) => {
      console.log('data campaign : ', data);
      if (data.status) {
        this.campaigns = data.data;
      } else {
        this.campaigns = [];
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
  // Generate Randomstring for tracking
  gen() {
    this.postData.track_id = this.commanService.randomString(6);
  }

  // Adding Post
  addPost() {
    const formdata = new FormData();

    console.log('post data : ', this.postData);
    if (!this.postData.org_id || this.postData.org_id === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Select Organization', title: 'Required'});
      return;
    } else {
      formdata.append('org_id', this.postData.org_id);
    }
    if (!this.postData.campaign_id || this.postData.campaign_id === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please select Post campaign', title: 'Required'});
      return;
    } else {
      formdata.append('campaign_id', this.postData.campaign_id);
    }
    if (!this.postData.title || this.postData.title === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Enter Post Title', title: 'Required'});
      return;
    } else {
      formdata.append('title', this.postData.title);
    }
    if (!this.postData.post_desc || this.postData.post_desc === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Enter Post Description', title: 'Required'});
      return;
    } else {
      formdata.append('post_desc', this.postData.post_desc);
    }
    if (!this.postData.post_type || this.postData.post_type === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post type', title: 'Required'});
      return;
    } else {
      formdata.append('post_type', this.postData.post_type);
    }
    if (!this.postData.track_id || this.postData.track_id === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post link', title: 'Required'});
      return;
    } else {
      formdata.append('track_id', this.postData.track_id);
    }
    if (!this.postData.post_content || this.postData.post_content === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post content', title: 'Required'});
      return;
    } else {
      formdata.append('post_content', this.postData.post_content);
    }
    if (!this.postData.remark || this.postData.remark === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post remark', title: 'Required'});
      return;
    } else {
      formdata.append('remark', this.postData.remark);
    }
    if (this.id) {
      formdata.append('id', this.id);
    }
    this.formBtn = 'Loading...';
    this.postService.insPost(formdata).subscribe((data) => {
      console.log('Data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/posts']);
      } else {
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Error'});
      }
      this.formBtn = 'Add';
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Add';
    });
  }
}
