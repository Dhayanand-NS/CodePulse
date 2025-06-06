import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../Category/services/category.service';
import { Observable } from 'rxjs';
import { category } from '../../Category/models/category.model';
@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, CommonModule,  MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit{
  model : AddBlogPost;
  categories$? : Observable<category[]>
  constructor(private blogpostService : BlogPostService, private router : Router, private categoryservices : CategoryService){
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
  }
  OnFormSubmit():void{
    this.blogpostService.addBlogPost(this.model).subscribe({
      next:(response)=>{
        console.log(this.model);
        this.router.navigateByUrl("admin/blogpost");
      }
    })
  }
}
