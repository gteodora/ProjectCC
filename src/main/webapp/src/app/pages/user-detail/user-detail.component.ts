


import { Component, OnInit } from '@angular/core';
import {MaterialModule} from '../../material-module';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { User, UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
user!: User;
isEdit?: boolean;
//errorFlag: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { 
    
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook():void{
    let id : any = this.route.snapshot.paramMap.get('id') 
    console.log(id);
    
    if(id==='add'){
      this.isEdit = false;
      this.user = {
       
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
        readBooks: []
      }      
    } else {
      this.isEdit = true;
      id = +id;
      this.userService.getUserById(id)
      .subscribe(user => this.user = user, error => {console.log(error)});
  
    }
    

  }

  save():void{
    
    if(this.isEdit===true){
      console.log('uslo u edit', this.user)
      this.userService.updateUser(this.user)
       .subscribe(()=>this.location.back());
      
    }else{
     // this.book.id=null;
      this.userService.createUser(this.user)
       .subscribe(()=>this.location.back());

    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'User saved!',
      showConfirmButton: false,
      timer: 1500
    })
  }
  

}
