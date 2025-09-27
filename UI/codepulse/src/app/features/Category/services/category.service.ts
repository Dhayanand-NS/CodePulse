import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { updateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';
import { CategorFilter } from '../models/filters-modal';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaserl}api/Categories?addAuth=true`,model);
  }

  getAllCategories(model? : CategorFilter): Observable<category[]> {
      let params = new HttpParams();

  if (model) {
    // why params ? bcs in GET method we can only send data through query string and not body
    // So we are sending everything in query strings
    if (model.name) {
      params = params.set('name', model.name);
    }
    if (model.urlHandle) {
      params = params.set('urlHandle', model.urlHandle);
    }
    if (model.sort) {
      params = params.set('sort', model.sort);
    }
    if (model.sortable) {
      params = params.set('sortable', model.sortable);
    }
    if (model.pagenumber) {
      params = params.set('pagenumber', model.pagenumber);
    }
    if (model.pagesize) {
      params = params.set('pagesize', model.pagesize);
    }
  }
    return this.http.get<category[]>(`${environment.apiBaserl}api/Categories`,{params});
  }

  getCategoryById(id: string | null): Observable<category> {
    return this.http.get<category>(
      `${environment.apiBaserl}api/Categories/${id}`
    );
  }
  getCategoryCount(): Observable<number> {
    return this.http.get<number>(
      `${environment.apiBaserl}api/Categories/Count`
    );
  }
  updateCategory(id: string | null, category: updateCategoryRequest): Observable<category> {
    return this.http.put<category>(`${environment.apiBaserl}api/Categories/${id}?addAuth=true`,category );
  }

  deleteCategory(id: string): Observable<category> {
    return this.http.delete<category>(`${environment.apiBaserl}api/Categories/${id}?addAuth=true`);
  }
}