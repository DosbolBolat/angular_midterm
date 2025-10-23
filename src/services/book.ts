import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Book {
  title: string;
  author: string[];
  thumbnail: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {}

  getBooks(query: string): Observable<Book[]> {
    return this.http.get<any>(`${this.apiUrl}/${query}`)
      .pipe(
        map(response => {
          return response.items?.map((item: any) => ({
            title: item.volumeInfo.title || 'Untitled',
            authors: item.volumeInfo.authors || ['Unknown'],
            description: item.volumeInfo.description || 'No description available.',
            thumbnail: item.volumeInfo.imageLinks?.thumbnail
              || 'https://via.placeholder.com/128x180?text=No+Image'
          })) || [];
        }),
      );
  }
}
