import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  author: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen',  author: 'H'},
  {position: 2, name: 'Helium', author: 'He'},
  {position: 3, name: 'Lithium', author: 'Li'},
  {position: 4, name: 'Beryllium', author: 'Be'},
  {position: 5, name: 'Boron', author: 'B'},
  {position: 6, name: 'Carbon', author: 'C'},
  {position: 7, name: 'Nitrogen', author: 'N'},
];

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent  {
  displayedColumns: string[] = ['position', 'name', 'author'];
  dataSource = ELEMENT_DATA;



}
