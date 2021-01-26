import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import Swal from 'sweetalert2';



export interface Book {
  id?: number;
  name: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})

export class BookService {
  
  public BOOK_URL = 'http://localhost:8080/api/book/';
  httpOptions={
    headers: new HttpHeaders({ 
      'ContentType': 'aplication/json'
    })
  };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }

    /** GET books from the server */
  public getAllBooks(): Observable<Book[]>{
      return this.httpClient.get<Book[]>(this.BOOK_URL)
      .pipe(
        tap(_ => this.log('fetched books')),
        catchError(this.handleError<Book[]>('getAllBooks', []))
      );
  }
  /** DELETE: delete the book from the server */
    public deleteBook(id:number):Observable<Book> {
       const url=`${this.BOOK_URL}${id}`;

       return this.httpClient.delete<Book>(url, this.httpOptions)
       .pipe(
         tap(_ => this.log(`deleted book id=${id}`)),
         catchError(this.handleError<Book>('deleteHero'))
       );
    }

    /** GET hero by id. Will 404 if id not found */
    public getBookById(id : number): Observable<Book> {
      const url=`${this.BOOK_URL}${id}`;
      return this.httpClient.get<Book>(url)
      .pipe(
        tap(_ => this.log(`fetched book id=${id}`)),
        catchError(this.handleError<Book>(`getBookById id=${id}`))
      );
    }

    /** POST: add a new book to the server */
    createBook(book: Book): Observable<Book> {
      console.log('uslo', book.id)
      return this.httpClient.post<Book>(this.BOOK_URL, book, this.httpOptions)
      .pipe(
        tap((newBook: Book) => {this.log(`added book w/ id=${newBook.id}`) 
      console.log(newBook)
      }),
        catchError(this.handleError<Book>('addBook'))
      );
    }
     /** PUT: update the book on the server */
    updateBook(book: Book) : Observable<any> {
      const url=`${this.BOOK_URL}${book.id}`;
      return this.httpClient.put(url, book, this.httpOptions).
      pipe(
        tap(_ => this.log(`updated book id=${book.id}`)),
        catchError(this.handleError<any>('updateBook'))
      );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>( operation= 'operation', result?:T){
    return (error : any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      return of(result as T); // Let the app keep running by returning an empty result.
    }
  }
  /** Log a BookService message with the MessageService */
  private log (message: string){
    this.messageService.add(`BookService: ${message}`);
  }
}
