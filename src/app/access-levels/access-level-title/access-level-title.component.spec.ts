import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelTitleComponent } from './access-level-title.component';

describe('AccessLevelTitleComponent', () => {
  let component: AccessLevelTitleComponent;
  let fixture: ComponentFixture<AccessLevelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessLevelTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLevelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
