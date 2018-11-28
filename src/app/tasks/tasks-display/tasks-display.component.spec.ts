import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDisplayComponent } from './tasks-display.component';

describe('TasksDisplayComponent', () => {
  let component: TasksDisplayComponent;
  let fixture: ComponentFixture<TasksDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
