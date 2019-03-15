import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule, MatTableModule, MatDatepickerModule, MatRippleModule, MatToolbarModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatCardModule, matFormFieldAnimations } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],

  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
})
export class MaterialModule { }
