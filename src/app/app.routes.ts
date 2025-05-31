import { Routes } from '@angular/router';
import { BookCardComponent } from './book-card/book-card';
import { BookDetailComponent } from './book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: BookCardComponent },
  { path: 'book/:id', component: BookDetailComponent }
];
