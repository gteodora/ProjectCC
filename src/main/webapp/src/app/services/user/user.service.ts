import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import Swal from 'sweetalert2';
import { Book } from '../book/book.service';



export interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  readBooks: Book[];
  //..
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  public USER_URL = 'http://localhost:8080/api/user/';
  httpOptions={
    headers: new HttpHeaders({ 
      'ContentType': 'aplication/json'
    })
  };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }

    /** GET users from the server */
  public getAllUsers(): Observable<User[]>{
      return this.httpClient.get<User[]>(this.USER_URL)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getAllUsers', []))
      );
  }
  /** DELETE: delete the user from the server */
    public deleteUser(id:number):Observable<User> {
       const url=`${this.USER_URL}${id}`;

       return this.httpClient.delete<User>(url, this.httpOptions)
       .pipe(
         tap(_ => this.log(`deleted user id=${id}`)),
         catchError(this.handleError<User>('deleteUser'))
       );
    }

    /** GET user by id. Will 404 if id not found */
    public getUserById(id : number): Observable<User> {
      const url=`${this.USER_URL}${id}`;
      console.log(this.httpClient.get<User>(url));
      return this.httpClient.get<any>(url)
      .pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUserById id=${id}`))
      );
    }

    /** POST: add a new user to the server */
    createUser(user: User): Observable<User> {
      console.log('uslo', user.id)
      return this.httpClient.post<User>(this.USER_URL, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => {this.log(`added user w/ id=${newUser.id}`) 
      console.log(newUser)
      }),
        catchError(this.handleError<User>('addUser'))
      );
    }
     /** PUT: update the user on the server */
    updateUser(user: User) : Observable<any> {
      console.log('uslo u edit2', user)
      const url=`${this.USER_URL}${user.id}`;
      return this.httpClient.put(url, user, this.httpOptions).
      pipe(
        tap(_ => this.log(`updated User id=${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
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
  /** Log a UserService message with the MessageService */
  private log (message: string){
    this.messageService.add(`UserService: ${message}`);
  }
}

