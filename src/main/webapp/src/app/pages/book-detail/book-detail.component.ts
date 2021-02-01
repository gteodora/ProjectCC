import { Component, OnInit } from '@angular/core';
import {MaterialModule} from '../../material-module';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BookService } from 'src/app/services/book/book.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Book } from 'src/app/model/book';



@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
book!: Book;
isEdit?: boolean;
//errorFlag: boolean;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { 
    
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook():void{
    let id : any = this.route.snapshot.paramMap.get('id') 
    
    if(id==='add'){
      this.isEdit = false;
      this.book = {
       
        author: '',
        name: ''
      }      
    } else {
      this.isEdit = true;
      id = +id;
      this.bookService.getBookById(id)
      .subscribe(book => this.book = book);
  
    }
    

  }

  save():void{
    
    if(this.isEdit===true){
      this.bookService.updateBook(this.book)
       .subscribe(()=>this.location.back());
      
    }else{
     // this.book.id=null;
      this.bookService.createBook(this.book)
       .subscribe(()=>this.location.back());

    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Book saved!',
      showConfirmButton: false,
      timer: 1500
    })
  }
  

}
