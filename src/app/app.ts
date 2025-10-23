import { Component, signal } from '@angular/core';
import { Header} from '../components/header/header';
import { SearchBar } from '../components/search-bar/search-bar';
import { BookList } from '../components/book-list/book-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, SearchBar, BookList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BookFinder');
}
