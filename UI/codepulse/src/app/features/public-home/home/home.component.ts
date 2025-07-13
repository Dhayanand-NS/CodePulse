import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blogPost.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  blogPost$? :Observable<BlogPost[]>
  
  constructor(private BlogPostService : BlogPostService){
    
  }
  ngOnInit(): void {
  this.blogPost$ = this.BlogPostService.getAllBlogPosts()
  }
}
