
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material-module';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'surname','username', 'email', 'actions']; 
  // ,'surname', 'username', 'email','password','actions'
  //dataSource = ELEMENT_DATA;
  users:User[];
  dataSource = new MatTableDataSource<User>([]);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private userService: UserService) { 
    this.users=[];
    this.dataSource=new MatTableDataSource<User>(this.users);
  }

    ngOnInit() {
      this.userService.getAllUsers().subscribe((users: User[])=>{
      this.users = users;
      this.dataSource=new MatTableDataSource<User>(users);
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
          title: 'User deleted!',
          showConfirmButton: false,
          timer: 1500
        })
        this.users = this.users.filter(user => user.id !== id);
        this.dataSource=new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.userService.deleteUser(id)
        .subscribe();
      }
    })
  }

  showBooks(id:number):void{

  }

}