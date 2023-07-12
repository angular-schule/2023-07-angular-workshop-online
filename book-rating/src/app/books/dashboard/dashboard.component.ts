import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/book.actions';
import { selectBooks } from '../store/book.selectors';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CommonModule, BookComponent]
})
export class DashboardComponent {
  books: Book[] = [];

  books$ = this.store.select(selectBooks);

  // private rs = inject(BookRatingService);
  // private bs = inject(BookStoreService)

  constructor(public rs: BookRatingService, private bs: BookStoreService, private store: Store) {
    this.store.dispatch(BookActions.loadBooks());

    this.store.select(selectBooks).subscribe(books => {
      this.books = books;
    })
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    });

    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,6,7,8,9].filter(e => e > 3) // [4, 5, 6, 7, 8, 9]
  }
}












