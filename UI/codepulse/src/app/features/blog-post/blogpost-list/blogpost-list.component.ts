import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogPost.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit{
blogPost$? :Observable<BlogPost[]>

  constructor( private blogPostService : BlogPostService){

  }
  ngOnInit(): void {
     this.blogPost$=this.blogPostService.getAllBlogPosts();
  }

}
