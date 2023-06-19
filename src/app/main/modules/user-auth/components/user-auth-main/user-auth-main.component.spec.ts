import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthMainComponent } from './user-auth-main.component';

describe('UserAuthMainComponent', () => {
  let component: UserAuthMainComponent;
  let fixture: ComponentFixture<UserAuthMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
