import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../Models/Book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  bookSubscription: Subscription;
  constructor(private bookService: BooksService,
              private route: Router) { }

  ngOnInit() {
    this.bookSubscription = this.bookService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.bookService.emitBooks();
  }
  OnNewBook() {
    this.route.navigate(['/books', 'new']);
  }
  onDeleteBook(book: Book) {
    this.bookService.removeBook(book);
  }
  onViewBook(id: number) {
    this.route.navigate(['/books','view',id]);
  }
  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

}
