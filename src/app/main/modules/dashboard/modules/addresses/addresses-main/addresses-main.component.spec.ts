import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesMainComponent } from './addresses-main.component';

describe('AddressesMainComponent', () => {
  let component: AddressesMainComponent;
  let fixture: ComponentFixture<AddressesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
