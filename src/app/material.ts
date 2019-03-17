import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:max-line-length
// import { MatButtonModule, MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule, MatTableModule, MatDatepickerModule, Material.MatRippleModule, Material.MatToolbarModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatCardModule, matFormFieldAnimations } from '@angular/material';
import * as Material from '@angular/material';

@NgModule({
  imports: [
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
    Material.MatSelectModule
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
    Material.MatProgressSpinnerModule,
    Material.MatSelectModule
  ],
})
export class MaterialModule { }
