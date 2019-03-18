import { PostService } from './../../services/post.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';


export interface Status {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts = [];

  constructor(private postService: PostService, private mainComponent: MainComponent) { }

  ngOnInit() {
    this.getPosts(1);
  }

   // Get all Orgaizations
   public getPosts(page) {
    const queryTmp = '&page=' + ( (page) ? page : 1 );
    this.postService.getPosts(queryTmp).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.posts = data.data;
      } else {
        this.posts = [];
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
   // Pagination
   public PageHandler(event) {
    this.getPosts(event.pageIndex + 1);
  }

  // Delete organization
  public deletePost(id) {
    this.postService.deletePost(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({title: 'Deleted', message: data.message, type: 'success'});
        this.posts = this.posts.filter((item) => {
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
