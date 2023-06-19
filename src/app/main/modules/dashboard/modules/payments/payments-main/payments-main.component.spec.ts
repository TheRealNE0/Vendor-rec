import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMainComponent } from './payments-main.component';

describe('PaymentsMainComponent', () => {
  let component: PaymentsMainComponent;
  let fixture: ComponentFixture<PaymentsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
