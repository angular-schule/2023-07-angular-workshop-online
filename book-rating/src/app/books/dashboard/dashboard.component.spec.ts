import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    // Ersatz für den BookRatingService
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };


    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // wenn BRS angefordert wird,
        // liefere stattdessen den ratingMock
        { provide: BookRatingService, useValue: ratingMock } // useFactory: () => ratingMock
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // Zugriff auf das DOM-Element:
    // fixture.nativeElement.querySelector('p')

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp()', () => {});
});
