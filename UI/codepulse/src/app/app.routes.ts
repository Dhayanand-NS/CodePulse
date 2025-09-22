import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './features/Category/add-category/add-category.component';
import { EditCategoryComponent } from './features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public-home/home/home.component';
import { BlogDetailsComponent } from './features/public-home/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';

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
        component : CategoryListComponent,
        canActivate:[authGuard] 
    }, 
    {
        path : 'admin/categories/addcategory',
        component : AddCategoryComponent,
        canActivate:[authGuard]
    },
    {
        path : 'admin/categories/:id',
        component : EditCategoryComponent,
        canActivate:[authGuard]
    },
    {
        path:'admin/blogpost',
        component:BlogpostListComponent,
        canActivate:[authGuard]
    },
    {
        path:'admin/blogpost/addblogpost',
        component:AddBlogpostComponent,
        canActivate:[authGuard]
    },
    {
        path:'admin/blogpost/:id',
        component:EditBlogpostComponent,
        canActivate:[authGuard]
    },
    {
        path:'login',
        component:LoginComponent
    }

];
