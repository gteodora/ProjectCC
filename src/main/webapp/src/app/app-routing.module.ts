import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './util/auth-guard';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'user/:user_id/books', component: BookComponent, canActivate: [AuthGuard] },
  {path: 'book/:id', component: BookDetailComponent, canActivate: [AuthGuard] }, 
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  {path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
{path: 'about', component: AboutComponent},
  { path: '**', component: /*PageNotFoundComponent*/ HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
