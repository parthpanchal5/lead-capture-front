import { PostService } from './../../services/post.service';
import { MainComponent } from './../main/main.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from './post-dialog/post-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts = [];
  search = {
    orgId: ''
  };

  constructor(
    private postService: PostService,
    private mainComponent: MainComponent,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  // Dialog
  openRepDialog(postId) {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '420px',
      data: {id : postId}
    });
    dialogRef.afterClosed();
  }

  ngOnInit() {
    const orgId = this.route.snapshot.paramMap.get('id');
    console.log('Org id: ', orgId);
    if ( orgId) {
      this.search.orgId = orgId;
    }
    this.getPosts(1, this.search);
  }

  // Dialog


   // Get all Orgaizations
   public getPosts(page, search) {
    const queryTmp = [''];
    queryTmp.push('page=' + ( (page) ? page : 1 ));
    if (search) {
      if (search.orgId !== '' && search.orgId !== null) {
        queryTmp.push('org_id=' + search.orgId);
      }
    }

    this.postService.getPosts(queryTmp.join('&')).subscribe((data) => {
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
    this.getPosts(event.pageIndex + 1, this.search);
  }

  // Delete organization
  public deletePost(id) {
    this.postService.deletePost(id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.mainComponent.alertMessage({title: 'Deleted', message: data.message, type: 'success'});
        this.router.navigate(['/app/posts']);
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
