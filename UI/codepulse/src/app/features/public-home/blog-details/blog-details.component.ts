import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blogPost.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, FormsModule,MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{
  url : string | null = null;
  blogPOst$? : Observable<BlogPost>

  constructor(private route : ActivatedRoute, private BlogPostService :BlogPostService){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        this.url = params.get('url')
      }
    });

    if(this.url){
     this.blogPOst$ = this.BlogPostService.getBlogPostByUrlHandle(this.url);
    }
  }



}
