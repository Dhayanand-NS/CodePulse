import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './features/Category/add-category/add-category.component';
import { EditCategoryComponent } from './features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public-home/home/home.component';
import { BlogDetailsComponent } from './features/public-home/blog-details/blog-details.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent
    },
    {
        path : 'blog/:url',
        component : BlogDetailsComponent
    },
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
    },
    {
        path:'admin/blogpost/:id',
        component:EditBlogpostComponent
    }

];
