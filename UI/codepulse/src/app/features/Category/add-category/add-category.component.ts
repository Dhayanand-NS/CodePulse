import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{

model : AddCategoryRequest;
private addCategorySbscription? :Subscription;
constructor(private categoryService : CategoryService){
  this.model ={
    name:"",
    urlHandle :""
  }

}
  OnFormSubmit(){
    this.addCategorySbscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next :(Response)=>{
        console.log("Successful")
      }
    })
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.addCategorySbscription?.unsubscribe();
  }
}
