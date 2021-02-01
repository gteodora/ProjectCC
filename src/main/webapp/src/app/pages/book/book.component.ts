import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'author', 'actions'];
  user_id?: any;
  user: User = {
    id: 0,
    username: '',
    password: '',
    name: '',
    surname: '',
    email: '',
    readBooks: []
  };
  books: Book[];
  dataSource = new MatTableDataSource<Book>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private userService: UserService) {
    this.books = [];
    this.dataSource = new MatTableDataSource<Book>(this.books);
  }

  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('user_id')
    if (this.user_id) {
      this.user_id = +this.user_id;
      this.userService.getUserById(this.user_id).subscribe((user: User) => {
        this.user = user
      });

      this.bookService.getAllBooksByUserId(this.user_id).subscribe((books: Book[]) => {
        this.books = books;
        this.dataSource = new MatTableDataSource<Book>(books);
        this.dataSource.paginator = this.paginator;
      })
    } else {
      this.bookService.getAllBooks().subscribe((books: Book[]) => {
        this.books = books;
        this.dataSource = new MatTableDataSource<Book>(books);
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
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
        this.books = this.books.filter(book => book.id !== id);
        this.dataSource = new MatTableDataSource<Book>(this.books);
        this.dataSource.paginator = this.paginator;
        this.bookService.deleteBook(id)
          .subscribe();
      }
    })
  }
}