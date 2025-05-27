import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, CommonModule,  MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {
  model : AddBlogPost;
  constructor(private blogpostService : BlogPostService, private router : Router){
    this.model ={
      title :'',
      shortDescription: '',
      content:'',
      featuredImageUrl: '',
      urlHandle : '',
      publishedDate : new Date(),
      author : '',
      isVisible : true
    }
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
