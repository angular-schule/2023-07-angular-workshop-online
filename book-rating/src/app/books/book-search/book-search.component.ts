import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });

  books$: Observable<Book[]> = this.searchControl.valueChanges.pipe(
    filter(term => term.length >= 3),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(term => this.bs.search(term))
  );

  constructor(private bs: BookStoreService) {}
}
