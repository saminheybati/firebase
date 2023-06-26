import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationActionComponent } from './confirmation-action.component';

describe('ConfirmationActionComponent', () => {
  let component: ConfirmationActionComponent;
  let fixture: ComponentFixture<ConfirmationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
