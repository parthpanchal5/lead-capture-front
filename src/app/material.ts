import { CampDialogComponent } from './components/campaign/camp-dialog/camp-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:max-line-length
// import { MatButtonModule, MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule, MatTableModule, MatDatepickerModule, Material.MatRippleModule, Material.MatToolbarModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatCardModule, matFormFieldAnimations } from '@angular/material';
import * as Material from '@angular/material';
import { OrgDialogComponent } from './components/organization/org-dialog/org-dialog.component';
import { PostDialogComponent } from './components/post/post-dialog/post-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatRippleModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    Material.MatFormFieldModule,
    Material.MatCardModule,
    Material.MatTableModule,
    Material.MatDatepickerModule,
    Material.MatProgressSpinnerModule,
    Material.MatGridListModule,
    Material.MatSelectModule,
    Material.MatPaginatorModule,
    Material.MatDialogModule
  ],

  exports: [
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatRippleModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    Material.MatFormFieldModule,
    Material.MatCardModule,
    Material.MatTableModule,
    Material.MatDatepickerModule,
    Material.MatGridListModule,
    Material.MatProgressSpinnerModule,
    Material.MatSelectModule,
    Material.MatPaginatorModule,
    Material.MatDialogModule
  ],
  entryComponents: [
    OrgDialogComponent,
    CampDialogComponent,
    PostDialogComponent
  ]
})
export class MaterialModule { }
