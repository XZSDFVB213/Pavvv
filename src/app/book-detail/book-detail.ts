import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { BookService } from '../load-book/load-books';
interface Book {
  id: number;
  title: string;
  author: string;
}
@Component({
  selector: 'app-book-detail',
  standalone:true,
  imports: [RouterModule, NgIf],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetail {
  bookId!: number;
  book?: Book;
  private bookService = inject(BookService)
 constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.book = this.bookService.getBookById(id);
}
}
