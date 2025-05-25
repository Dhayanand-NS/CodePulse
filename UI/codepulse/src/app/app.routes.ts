import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './features/Category/add-category/add-category.component';
import { EditCategoryComponent } from './features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';

export const routes: Routes = [
    {
        path : 'admin/categories',
        component : CategoryListComponent 
    },
    {
        path : 'admin/categories/addcategory',
        component : AddCategoryComponent
    },
    {
        path : 'admin/categories/:id',
        component : EditCategoryComponent
    },
    {
        path:'admin/blogpost',
        component:BlogpostListComponent
    },
    {
        path:'admin/blogpost/addblogpost',
        component:AddBlogpostComponent
    }

];
