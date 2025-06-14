import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../models/blogPost.model';
import { UpdateBlogPost } from '../models/update-blogpost.model';

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

    getBlogPostById( id : string | null): Observable<BlogPost>{
      return this.http.get<BlogPost>(`${environment.apiBaserl}api/BlogPost/${id}`)
    }

    updateBlogPost(id : string , model : UpdateBlogPost){
      return this.http.put<BlogPost>(`${environment.apiBaserl}api/BlogPost/${id}`,model)
    }

    deleteBlogPost(id : string | null){
      return this.http.delete<BlogPost>(`${environment.apiBaserl}api/BlogPost/${id}`)
    }
}
