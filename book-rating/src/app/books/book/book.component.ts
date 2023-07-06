import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  // hier können Daten von der Elternkomponente hineinfließen
  // von oben nach unten
  @Input({ required: true }) book?: Book;

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    if (this.book) {
      this.rateUp.emit(this.book);
    }
  }

  doRateDown() {
    if (this.book) {
      this.rateDown.emit(this.book);
    }
  }
}
