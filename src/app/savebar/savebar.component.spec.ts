import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavebarComponent } from './savebar.component';

describe('SavebarComponent', () => {
  let component: SavebarComponent;
  let fixture: ComponentFixture<SavebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
