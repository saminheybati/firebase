import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlValueComponent } from './control-value.component';

describe('ControlValueComponent', () => {
  let component: ControlValueComponent;
  let fixture: ComponentFixture<ControlValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
