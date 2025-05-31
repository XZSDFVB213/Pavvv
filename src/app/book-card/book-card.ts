import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { BookService } from '../load-book/load-books';
import { CreateCardComponent } from '../create-card/create-card';
import {MatButton} from '@angular/material/button';

interface Book {
  id: number;
  title: string;
  author: string;
}

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, MatButton],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCardComponent implements OnInit {
  public filterForm: FormGroup;

  public bookService = inject(BookService);

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      title: [''],
      author: [''],
    });
  }

  ngOnInit(): void {
    this.bookService.loadBooks();

    this.filterForm.valueChanges.subscribe((value) => {
      this.bookService.setFilter(value);
    });
  }

  openDialog(): void {
    this.dialog.open(CreateCardComponent, {
      width: '400px',
    });
  }
}
