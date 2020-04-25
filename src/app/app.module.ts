import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SiginComponent } from './auth/sigin/sigin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { from } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
{path: 'auth/signup', component: SignupComponent},
{path: 'auth/signin', component: SiginComponent},
{path: 'books', canActivate: [AuthGuardService], component: BookListComponent},
{path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent},
{path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent},
{path: '', redirectTo: 'books', pathMatch: 'full'},
{path: '**', redirectTo: 'books'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SiginComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(route)
  ],
  providers: [AuthService,
  BooksService,
AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
