import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostNotificationsComponent } from './addpost-notifications.component';

describe('AddpostNotificationsComponent', () => {
  let component: AddpostNotificationsComponent;
  let fixture: ComponentFixture<AddpostNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpostNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpostNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
