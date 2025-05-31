import { Routes } from '@angular/router';
import { BookCard } from './book-card/book-card';
import { BookDetail } from './book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: BookCard },
  { path: 'book/:id', component: BookDetail }
];