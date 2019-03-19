import { Router } from '@angular/router';
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

  formBtn = 'Add Post';
  formTitle = 'Add Post';

  postData = {
    title: '',
    post_desc: '',
    post_type: '',
    track_id: '',
    post_content: '',
    remark: ''
  };
  constructor(
    private mainComponent: MainComponent,
    private postService: PostService,
    private router: Router,
    private commanService: CommanService
  ) { }

  ngOnInit() {
  }

  gen() {
    this.postData.track_id = this.commanService.randomString(6);
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
    if (this.postData.track_id === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post link'});
      return;
    } else {
      formdata.append('track_id', this.postData.track_id);
    }
    if (this.postData.post_content === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post content'});
      return;
    } else {
      formdata.append('post_content', this.postData.post_content);
    }
    if (this.postData.remark === '' ) {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter post remark'});
      return;
    } else {
      formdata.append('remark', this.postData.remark);
    }
    this.formBtn = 'Loading...';
    this.postService.insPost(formdata).subscribe((data) => {
      console.log('Data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({type: 'success', message: data.message, title: 'Success'});
        this.router.navigate(['/app/posts']);
      } else {
        this.mainComponent.alertMessage({type: 'alert', message: data.message, title: 'Error'});
      }
      this.formBtn = 'Add Campaign';
    }, error => {
      console.log('Error: ', error);
      this.formBtn = 'Add Post';
    });
  }

}
