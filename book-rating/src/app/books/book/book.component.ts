import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Book } from '../shared/book';
import { RatingComponent } from "../rating/rating.component";

@Component({
    selector: 'app-book',
    standalone: true,
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    imports: [CommonModule, CurrencyPipe, RatingComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  value = signal(0);
  bigNumbers = computed(() => this.value() * 1000);
  bigNumbersWithLabel = computed(() => 'Number: ' + this.bigNumbers());

  // hier können Daten von der Elternkomponente hineinfließen
  // von oben nach unten
  @Input({ required: true }) book?: Book;
  @Input() minRating = 0;
  @Input() maxRating = 10;

  // wir senden Daten an die Elternkomponente
  // von unten nach oben
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();


  constructor() {
    setInterval(() => {
      this.value.set(Math.random());
    }, 1000)
  }

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
