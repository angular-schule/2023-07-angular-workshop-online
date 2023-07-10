import { Routes } from '@angular/router';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad: pathMatch:full
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  // ...booksRoutes,
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
  }
];
