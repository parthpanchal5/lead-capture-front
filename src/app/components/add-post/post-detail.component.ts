import { PostService } from './../../services/post.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class PostDetailComponent implements OnInit {

  formBtn = 'Update Post';
  formTitle = 'Post Detail';

  id = '';

  postData = {
    title: '',
    post_desc: '',
    post_type: '',
    post_content: '',
    remark: ''
  };

  constructor(
    private mainComponent: MainComponent,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPostDtl(this.id);
  }

  getPostDtl(id) {
    this.postService.getPostDtl(id).subscribe((data) => {
      console.log('Data: ', data);
      if (data.status) {
        this.postData = data.data;
      } else {
        this.postData = {
          title: '',
          post_desc: '',
          post_type: '',
          post_content: '',
          remark: ''
        };
        this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  addPost() {
    const formdata = new FormData();

    if (this.postData.title === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Enter Post Title', title: 'Required'});
      return;
    } else {
      formdata.append('title', this.postData.title);
    }
    if (this.postData.post_desc === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please Enter Post Description'});
      return;
    } else {
      formdata.append('post_desc', this.postData.post_desc);
    }
    if (this.postData.post_type === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post type'});
      return;
    } else {
      formdata.append('post_type', this.postData.post_type);
    }
    if (this.postData.post_content === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post type'});
      return;
    } else {
      formdata.append('post_content', this.postData.post_content);
    }
    if (this.postData.remark === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post type'});
      return;
    } else {
      formdata.append('remark', this.postData.remark);
    }
    formdata.append('id', this.id);
    this.formBtn = 'Loading...';

    this.postService.insPost(formdata).subscribe((data) => {
      console.log('Data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/posts']);
      } else {
        this.mainComponent.alertMessage({type: 'alert', message: data.message, title: 'Error'});
      }
      this.formBtn = 'Update Post';
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Update Post';
    });
  }

}
