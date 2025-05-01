import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { category } from '../models/category.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [RouterModule,CommonModule],
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories$? :Observable <category[]>;

constructor(private categoryService : CategoryService){

 }
 ngOnInit(): void {
  this.categories$ = this.categoryService.getAllCategories();
}
}
