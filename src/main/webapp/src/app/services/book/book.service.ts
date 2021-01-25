import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Book {
  id: number;
  name: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public REST_API_SERVER = 'http://localhost:8080/api/book/';
 
  constructor(private httpClient: HttpClient) { }

  public getDataFromBackend(): Observable<Book[]>{
   // let url = new URL('http://localhost:8080/api/book');
      return this.httpClient.get<Book[]>(this.REST_API_SERVER);
  }
/*
    public sendGetRequest(){
      return this.httpClient.get(this.REST_API_SERVER);
    }*/
  /*
    getBooks(): Observable<Book[]> {
      return of(BOOKS);
    }*/
}
