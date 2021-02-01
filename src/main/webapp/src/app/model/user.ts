import { Book } from "./book";


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