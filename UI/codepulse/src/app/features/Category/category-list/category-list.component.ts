import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { category } from '../models/category.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorFilter } from '../models/filters-modal';

@Component({
  selector: 'app-category-list',
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  modal: CategorFilter;
  categories$?: Observable<category[]>;
  totalCount? : number;
  list:number[] =[];
  currentPage=1;

  constructor(private categoryService: CategoryService) {
    this.modal = {
      name: '',
      urlHandle: '',
      sort:'',
      sortable:'',
      pagenumber:1,
      pagesize:2

    };
  }
  ngOnInit(): void {
    this.categoryService.getCategoryCount().subscribe({
      next:(value)=>{
          this.totalCount = value;
          this.list= new Array(Math.ceil(value/this.modal.pagesize))
          this.categories$ = this.categoryService.getAllCategories(this.modal);

      }
    })
  }
  OnFormSubmit() {
    this.categories$ = this.categoryService.getAllCategories(this.modal);
  }
  ToSort(sortable : string,sort : string){
    this.modal={
      name:'',
      urlHandle:'',
      sort:sort,
      sortable:sortable,
      pagenumber:1,
      pagesize:2
    }
    this.categories$ = this.categoryService.getAllCategories(this.modal);
  }
  getDataByPage(pagenumber : number){
    if(pagenumber > this.list.length){
      return
    }
    if(pagenumber < 1){
      return
    }
   this.modal={
      name:'',
      urlHandle:'',
      sort:'',
      sortable:'',
      pagenumber:pagenumber,
      pagesize:2
    }
    this.currentPage = this.modal.pagenumber;
    this.categories$ = this.categoryService.getAllCategories(this.modal);
  }
}

