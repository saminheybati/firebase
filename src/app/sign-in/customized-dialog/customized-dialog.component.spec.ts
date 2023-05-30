import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedDialogComponent } from './customized-dialog.component';

describe('CustomizedDialogComponent', () => {
  let component: CustomizedDialogComponent;
  let fixture: ComponentFixture<CustomizedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
