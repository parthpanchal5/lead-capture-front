import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostChartComponent } from './post-chart.component';

describe('PostChartComponent', () => {
  let component: PostChartComponent;
  let fixture: ComponentFixture<PostChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
