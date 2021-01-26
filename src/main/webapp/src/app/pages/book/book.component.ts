import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Book, BookService } from 'src/app/services/book/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material-module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'author', 'actions'];
  //dataSource = ELEMENT_DATA;
  books:Book[];
  dataSource = new MatTableDataSource<Book>([]);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private bookService: BookService) { 
    this.books=[];
    this.dataSource=new MatTableDataSource<Book>(this.books);
  }

    ngOnInit() {
      console.log('on init')
      this.bookService.getAllBooks().subscribe((books: Book[])=>{
      console.log(books);
      this.books = books;
      this.dataSource=new MatTableDataSource<Book>(books);
      this.dataSource.paginator = this.paginator;
    }) 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number):void{
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Book deleted!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('deleting book '+id);
        this.books = this.books.filter(book => book.id !== id);
        this.dataSource=new MatTableDataSource<Book>(this.books);
        this.dataSource.paginator = this.paginator;
        this.bookService.deleteBook(id)
        .subscribe();
      }
    })


    
  }


}