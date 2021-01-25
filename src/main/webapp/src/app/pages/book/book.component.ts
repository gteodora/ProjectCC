import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  author: string;
}
export interface Book {
  id: number;
  name: string;
  author: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen',  author: 'H'},
  {position: 2, name: 'Helium', author: 'He'},
  {position: 3, name: 'Lithium', author: 'Li'},
  {position: 4, name: 'Beryllium', author: 'Be'},
  {position: 5, name: 'Boron', author: 'B'},
  {position: 6, name: 'Carbon', author: 'C'},
  {position: 7, name: 'Nitrogen', author: 'N'}
];

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'author'];
  //dataSource = ELEMENT_DATA;
  books:Book[];
  dataSource = new MatTableDataSource<Book>([]);
  

  constructor(private bookService: BookService) { 
    this.books=[];
    this.dataSource=new MatTableDataSource<Book>(this.books);
  }

    ngOnInit() {
    this.bookService.getDataFromBackend().subscribe((books: Book[])=>{
      console.log(books);
      this.books = books;
      this.dataSource=new MatTableDataSource<Book>(books);
  //    this.dataSource = new MatTableDataSource<Book>(this.books);
      this.dataSource.paginator = this.paginator;
      console.log(this.paginator);
    }) 
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}