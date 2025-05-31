import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookService } from '../load-book/load-books';
import { MatDialog } from '@angular/material/dialog';
import { createCardComponent } from '../create-card/create-card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Book {
  id: number;
  title: string;
  author: string;
}

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard implements OnInit {
  public bookData: Book[] = [];
  public bookService = inject(BookService);

  public filterForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      title: [''],
      author: [''],
    });
  }

  ngOnInit() {
    this.bookService.loadBooks();

    this.bookService.filteredBooks$.subscribe((data) => {
      if (data) this.bookData = data;
    });

    this.filterForm.valueChanges.subscribe((value) => {
      this.bookService.setFilter(value);
    });
  }

  openDialog() {
    this.dialog.open(createCardComponent, {
      width: '400px',
    });
  }
}
