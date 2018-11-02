import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundingAppealComponent } from './grounding-appeal.component';

describe('GroundingAppealComponent', () => {
  let component: GroundingAppealComponent;
  let fixture: ComponentFixture<GroundingAppealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundingAppealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundingAppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
