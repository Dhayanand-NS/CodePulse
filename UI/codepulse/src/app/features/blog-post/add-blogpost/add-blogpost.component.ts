import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../Category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { category } from '../../Category/models/category.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';
@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, CommonModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy{
  model : AddBlogPost;
  categories$? : Observable<category[]>
  isImageModelVisible: boolean = false;
  selectedImageSubscription?: Subscription;
  constructor(private blogpostService : BlogPostService, private router : Router, private categoryservices : CategoryService, private ImageService : ImageService){
    this.model ={
      title :'',
      shortDescription: '',
      content:'',
      featuredImageUrl: '',
      urlHandle : '',
      publishedDate : new Date(),
      author : '',
      isVisible : true,
      categories :[]
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryservices.getAllCategories();
          this.selectedImageSubscription =  this.ImageService.onSelectedImage().subscribe({
          next :(res)=>{
            if(this.model){
               this.model.featuredImageUrl = res.url;
               this.CloseImagerSelectorModelPopUp();
            }
          }
        })
  }
  OnFormSubmit():void{
    this.blogpostService.addBlogPost(this.model).subscribe({
      next:(response)=>{
        console.log(this.model);
        this.router.navigateByUrl("admin/blogpost");
      }
    })
  }
    ShowImagerSelectorModelPopUp() : void{
    this.isImageModelVisible = true;
  }
  CloseImagerSelectorModelPopUp() : void{
        this.isImageModelVisible = false;

  }
    ngOnDestroy(): void {
this.selectedImageSubscription?.unsubscribe();
  }
}
