import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { BookService } from '../load-book/load-books';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-card.html',
  styleUrl: './create-card.scss',
})
export class CreateCardComponent {
  bookForm: FormGroup;

  private bookService = inject(BookService);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateCardComponent>
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook = {
        id: Date.now(),
        ...this.bookForm.value,
      };
      this.bookService.addBook(newBook);
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
