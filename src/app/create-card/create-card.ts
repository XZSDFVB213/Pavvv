import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../load-book/load-books';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-card',
  imports: [    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,],
  standalone:true,
  templateUrl: './create-card.html',
  styleUrl: './create-card.scss',
})
export class createCardComponent {
  bookForm: FormGroup;
  private bookService = inject(BookService)
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<createCardComponent>,
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook = {
        id: Date.now(),
        ...this.bookForm.value,
      };
      this.bookService.addBook(newBook);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
