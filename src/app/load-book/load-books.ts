import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

interface Book {
  id: number;
  title: string;
  author: string;
}

const STORAGE_KEY = 'books';

@Injectable({ providedIn: 'root' })
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();

  private filterSubject = new BehaviorSubject<{ title: string; author: string }>({ title: '', author: '' });
  filter$ = this.filterSubject.asObservable();

  filteredBooks$: Observable<Book[]> = combineLatest([this.books$, this.filter$]).pipe(
    map(([books, filter]) => {
      return books.filter(book => {
        const matchesTitle = filter.title ? book.title.toLowerCase().includes(filter.title.toLowerCase()) : true;
        const matchesAuthor = filter.author ? book.author.toLowerCase().includes(filter.author.toLowerCase()) : true;
        return matchesTitle && matchesAuthor;
      });
    })
  );

  constructor(private http: HttpClient) {}

  private get isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined' && localStorage !== null;
  }

  loadBooks(): void {
    if (this.isLocalStorageAvailable) {
      const localData = localStorage.getItem(STORAGE_KEY);
      if (localData) {
        this.booksSubject.next(JSON.parse(localData));
        return;
      }
    }

    this.http.get<Book[]>('assets/books.json').subscribe((data) => {
      this.booksSubject.next(data);
      if (this.isLocalStorageAvailable) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    });
  }

  addBook(book: Omit<Book, 'id'>): void {
    const current = this.booksSubject.value ?? [];

    const newId = current.length
      ? Math.max(...current.map((b) => b.id)) + 1
      : 1;

    const newBook: Book = { id: newId, ...book };
    const updated = [...current, newBook];

    this.booksSubject.next(updated);

    if (this.isLocalStorageAvailable) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }

  getBookById(id: number): Book | undefined {
    return this.booksSubject.value?.find((b) => b.id === id);
  }

  setFilter(filter: { title: string; author: string }): void {
    this.filterSubject.next(filter);
  }
}
