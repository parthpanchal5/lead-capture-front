import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-camp-dialog',
  templateUrl: './camp-dialog.component.html',
  styleUrls: ['./camp-dialog.component.css']
})
export class CampDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CampDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
