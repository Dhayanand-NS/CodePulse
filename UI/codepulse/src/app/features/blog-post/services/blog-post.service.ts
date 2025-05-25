import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../models/blogPost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http : HttpClient) {}

    addBlogPost (model : AddBlogPost): Observable<void>{
      return this.http.post<void>(`${environment.apiBaserl}api/BlogPost`, model)
    }

    getAllBlogPosts() : Observable<BlogPost[]>{
      return this.http.get<BlogPost[]>(`${environment.apiBaserl}api/BlogPost`)
    }
}
