import { TestBed } from '@angular/core/testing';

import { LoadBooks } from './load-books';

describe('LoadBooks', () => {
  let service: LoadBooks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadBooks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
