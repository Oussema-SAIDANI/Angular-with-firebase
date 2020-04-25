import { Injectable } from '@angular/core';
import { Book } from '../Models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
 // ay haja prend de temps staamlna promise
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  constructor() { this.GetBooks(); }
  emitBooks() {
    this.booksSubject.next(this.books);
  }
  SaveBook() {
    //set kima put
    firebase.database().ref('/books').set(this.books);
  }
  GetBooks() {
    //on khtr en temps reeel
    //ref lel node fel base
    //data type datasnabshot w feha val returne mel serveur correspond lel node books
    // ? si maabi traja3 sinn hot vide
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    }
    );
  }
  GetSingleBook(id: number) {
    //once mara bark
    //amlna promise khatr testha9ch callback
    return new Promise(
    (resolve,reject) =>
    {
      firebase.database().ref('/books/' + id ).once('value').then(
          (data) => {
            resolve(data.val());
          },

            (error) => {
              reject(error);
            }

      );

    }
      )
    ;
  }

  createBook(book: Book) {
    this.books.push(book);
    this.SaveBook();
    this.emitBooks();
  }
  removeBook(book: Book) {
    //splice bch tfasa5 argumnt lowl indice w 2 9adeh chtfasa5
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const index = this.books.findIndex(
      (booke) => {
      if(booke === book) {
        return true;
      }
    }
    );
    this.books.splice(index, 1);
    this.SaveBook();
    this.emitBooks();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
           resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}
}
