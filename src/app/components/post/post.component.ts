import { PostChartComponent } from './post-chart/post-chart.component';
import { ChartComponent } from './../campaign/chart/chart.component';
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
    campaignId: '',
    postId: ''
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
    const campaignId = this.route.snapshot.paramMap.get('id');
    console.log('Campaign id: ', campaignId);
    if ( campaignId) {
      this.search.campaignId = campaignId;
    }
    this.getPosts(1, this.search);
  }

  // Dialog
  openReportDialog(postId) {
    const dialogRef = this.dialog.open(PostChartComponent, {
      width: '820px',
      data: postId
    });
    dialogRef.afterClosed();
  }

   // Get all Orgaizations
   public getPosts(page, search) {
    const queryTmp = [''];
    queryTmp.push('page=' + ( (page) ? page : 1 ));
    if (search) {
      if (search.campaignId !== '' && search.campaignId !== null) {
        queryTmp.push('campaign_id=' + search.campaignId);
      }
    }

    this.postService.getPosts(queryTmp.join('&')).subscribe((data) => {
      // console.log('data: ', data);
      if (data.status) {
        this.posts = data.data;
        // console.log('Post: ', this.posts);
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
