import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { updateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id : string | null = null ;
  paramsSubscription? : Subscription;
  category? : category;
  updateCategorySubscription? : Subscription
  constructor(private route : ActivatedRoute, private categoryService :CategoryService, private router :Router){
  }
  ngOnInit(): void {
    this.paramsSubscription =this.route.paramMap.subscribe({
      next:(params)=>{
        this.id = params.get('id');
        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next:(response)=>{
              this.category = response;
            }
          })
        }
      }
    })
  }
  OnFormSubmit():void{
   const updateCategory : updateCategoryRequest={
    name: this.category?.name ?? '',
    urlHandle : this.category?.urlHandle ?? ''
   }
   this.updateCategorySubscription = this.categoryService.updateCategory(this.id,updateCategory).subscribe({
      next:(response)=>{
        this.router.navigateByUrl("/admin/categories");

      }
    })
  }
  OnDelete() : void{
    if(this.id){
      this.categoryService.deleteCategory(this.id).subscribe({
        next:(response)=>{
          this.router.navigateByUrl("/admin/categories");
        }
      })
    }
  }

  ngOnDestroy(): void {
    
    this.paramsSubscription?.unsubscribe();
    this.updateCategorySubscription?.unsubscribe();
  }


}
