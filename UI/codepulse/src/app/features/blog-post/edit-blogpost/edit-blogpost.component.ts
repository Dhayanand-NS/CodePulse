import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blogPost.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../Category/services/category.service';
import { category } from '../../Category/models/category.model';
import { UpdateBlogPost } from '../models/update-blogpost.model';

@Component({
  selector: 'app-edit-blogpost',
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit ,OnDestroy {

  id : string | null = null
  paramsSubscription? : Subscription
  updateBlogPostSubscription? : Subscription
  blogPostSubscription? : Subscription
  deleteBlogPostSubscription? : Subscription
  model? : BlogPost
  categories$? : Observable<category[]>
  selectedCategories? : string[]
  constructor(private route : ActivatedRoute, private blogPostService : BlogPostService, private catgoryServices : CategoryService, private router :Router){

  }

  ngOnInit(): void {
   this.categories$= this.catgoryServices.getAllCategories();
    this.paramsSubscription = this.route.paramMap.subscribe({
      next:(params)=>{
        this.id = params.get('id');
        if(this.id){
          this.blogPostSubscription =this.blogPostService.getBlogPostById(this.id).subscribe({
            next:(response)=>{
              this.model = response;
              this.selectedCategories = response.categories.map(x=>x.id);
            }
          })
        }
      }
    })
  }
  ngOnDestroy(): void {
      this.paramsSubscription?.unsubscribe();
      this.updateBlogPostSubscription?.unsubscribe();
      this.blogPostSubscription?.unsubscribe();
      this.deleteBlogPostSubscription?.unsubscribe();
  }
  OnFormSubmit() : void{
    if(this.model && this.id){
      var updateBlogPost : UpdateBlogPost ={
        categories : this.selectedCategories ?? [] ,
        isVisible : this.model.isVisible,
        author : this.model.author,
        publishedDate: this.model.publishedDate,
        urlHandle : this.model.urlHandle,
        content : this.model.content,
        shortDescription : this.model.shortDescription,
        title : this.model.title,
        featuredImageUrl: this.model.featuredImageUrl

      }
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next:(response)=>{
          this.router.navigateByUrl('admin/blogpost');
        }
      })
    }
  }
  OnDelete() : void{
   this.deleteBlogPostSubscription =  this.blogPostService.deleteBlogPost(this.id).subscribe({
      next:(response)=>{
         this.router.navigateByUrl('admin/blogpost');
      }
    })
  }
}
