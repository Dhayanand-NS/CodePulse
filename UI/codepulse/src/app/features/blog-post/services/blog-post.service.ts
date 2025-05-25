import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http : HttpClient) {}
    addBlogPost (model : AddBlogPost): Observable<void>{
      return this.http.post<void>(`${environment.apiBaserl}api/BlogPost`, model)
    }
}
