import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampFilterComponent } from './camp-filter.component';

describe('CampFilterComponent', () => {
  let component: CampFilterComponent;
  let fixture: ComponentFixture<CampFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
