import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'food', loadChildren: () => import('./food/food.module').then(m => m.FoodModule) },
    { path: 'cart', loadChildren: () => import('./cart-details/cart-details.module').then(m => m.CartDetailsModule) },
    { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule ) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule ) }
    
];