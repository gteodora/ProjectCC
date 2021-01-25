import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';

const routes: Routes = [
  { path: 'book', component: BookComponent},
  { path: 'home', component: HomeComponent},
 // { path: 'user', component: UserComponent},

  { path: '**', component: /*PageNotFoundComponent*/ HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
