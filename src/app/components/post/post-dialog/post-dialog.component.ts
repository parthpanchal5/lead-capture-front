// import { MainComponent } from './../../main/main.component';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {

  link = '';
  constructor(
    private postService: PostService,
    // private mainComponent: MainComponent,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},

  ) { }

  ngOnInit() {
    this.postService.getPostLink(this.data.id).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.link = data.data;
      } else {
        // this.mainComponent.alertMessage({title: 'Error!', message: data.message, type: 'error'});
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
