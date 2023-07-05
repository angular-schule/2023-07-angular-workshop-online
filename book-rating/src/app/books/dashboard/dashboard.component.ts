import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CommonModule, BookComponent]
})
export class DashboardComponent {
  books: Book[] = [];

  constructor() {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 42.9
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 34.9
      }
    ];
  }
}


/* TODO
- Datenmodell: Klasse / Interface
- Daten: statisch, HTTP, …
- Anzeige im Template

*/











