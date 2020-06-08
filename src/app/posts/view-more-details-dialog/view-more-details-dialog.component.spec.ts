import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreDetailsDialogComponent } from './view-more-details-dialog.component';

describe('ViewMoreDetailsDialogComponent', () => {
  let component: ViewMoreDetailsDialogComponent;
  let fixture: ComponentFixture<ViewMoreDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMoreDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
