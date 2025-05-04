import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient } from '@angular/common/http';
import { category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { updateCategoryRequest } from '../models/update-category-request.model';
@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http : HttpClient) { }

  addCategory(model : AddCategoryRequest) : Observable<void>{
    return this.http.post<void>(`${environment.apiBaserl}api/Categories`, model)
  }

  getAllCategories() : Observable<category[]>{
    return this.http.get<category[]>(`${environment.apiBaserl}api/Categories`);
  }

  getCategoryById(id : string | null): Observable<category>{
    return this.http.get<category>(`${environment.apiBaserl}api/Categories/${id}`)
  }

  updateCategory(id:string | null, category :updateCategoryRequest) : Observable<category>{
    return this.http.put<category>(`${environment.apiBaserl}api/Categories/${id}`, category)
  }

  deleteCategory(id : string) : Observable<category>{
    return this.http.delete<category>(`${environment.apiBaserl}api/Categories/${id}`);
  }
}