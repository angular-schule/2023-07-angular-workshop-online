import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    // Ersatz für den BookRatingService
    const ratingMock = {
      MINRATING: 1,
      MAXRATING: 5,
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    // Ausblick: Ersatz für den BookStoreService
    const storeMock = {
      getAll: () => of([])
    }


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

  it('should call service.rateUp() for doRateUp()', () => {
    // Arrange
    // Wir fordern den BRS an, aber tatsächlich ist der unser ratingMock
    const rs = TestBed.inject(BookRatingService);
    const testBook = { isbn: 'aaa' } as Book; // Type Assertion

    // spyOn(rs, 'rateUp').and.returnValue(testBook);
    // spyOn(rs, 'rateUp').and.callFake(b => b)
    spyOn(rs, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(testBook)

    // Assert
    // prüfen, ob rateUp aufgerufen wurde mit testBook
    expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).toHaveBeenCalledTimes(1);
    expect(rs.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
