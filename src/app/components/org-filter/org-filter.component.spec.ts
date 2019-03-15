import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgFilterComponent } from './org-filter.component';

describe('OrgFilterComponent', () => {
  let component: OrgFilterComponent;
  let fixture: ComponentFixture<OrgFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
