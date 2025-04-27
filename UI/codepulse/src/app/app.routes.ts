import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './features/Category/add-category/add-category.component';

export const routes: Routes = [
    {
        path : 'admin/categories',
        component : CategoryListComponent 
    },
    {
        path : 'admin/categories/addcategory',
        component : AddCategoryComponent
    }
];
