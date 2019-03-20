import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampDialogComponent } from './camp-dialog.component';

describe('CampDialogComponent', () => {
  let component: CampDialogComponent;
  let fixture: ComponentFixture<CampDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
