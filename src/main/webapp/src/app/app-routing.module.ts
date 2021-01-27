import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  { path: 'book', component: BookComponent},
  { path: 'user/:user_id/books', component: BookComponent},
  { path: 'home', component: HomeComponent},
  {path: 'book/:id', component: BookDetailComponent},   
  { path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserDetailComponent},  

  { path: '**', component: /*PageNotFoundComponent*/ HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
