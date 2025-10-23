import { Component, signal } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookService} from '../../services/book';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  books = signal<any[]>([]);
  isLoading = signal(false);
  errorMsg = signal('');

  constructor(private bookService: BookService) {}

  searchBooks(query: string) {
    if (!query.trim()) {
      this.books.set([]);
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');

    this.bookService.getBooks(query).subscribe({
      next: (data) => {
        this.books.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMsg.set('Failed to load books.');
        this.isLoading.set(false);
      }
    });
  }

}
