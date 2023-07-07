import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  readonly MINRATING = 1;
  readonly MAXRATING = 5;

  constructor() {}

  rateUp(book: Book): Book {
    // Early Exit
    if (book.rating >= this.MAXRATING) {
      return book;
    }

    return {
      ...book,
      rating: book.rating + 1
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      // rating: book.rating > 1 ? book.rating - 1 : 1
      rating: Math.max(book.rating - 1, this.MINRATING)
    };
  }
}

