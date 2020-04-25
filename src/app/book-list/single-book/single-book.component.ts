import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  constructor(private route: ActivatedRoute,
              private bookService: BooksService,
              private router: Router
              ) { }

  ngOnInit() {
    //book vide khatr yajm ysie bug w mazel khltch donnée mel base
    this.book = new Book('','');
    const id = this.route.snapshot.params['id'];
    this.bookService.GetSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
     }
     onBack() {
       this.router.navigate(['/books']);
     }

}
