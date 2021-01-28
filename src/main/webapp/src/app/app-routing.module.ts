import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'app', component: AppComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'book', component: BookComponent},
  { path: 'user/:user_id/books', component: BookComponent},
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
