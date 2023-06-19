import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionCarouselComponent } from './suggestion-carousel.component';

describe('SuggestionCarouselComponent', () => {
  let component: SuggestionCarouselComponent;
  let fixture: ComponentFixture<SuggestionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
