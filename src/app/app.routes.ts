import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'order_foods', loadChildren: () => import('./order-foods/order-foods.module').then(m => m.OrderFoodsModule) },
    { path: 'food', loadChildren: () => import('./food/food.module').then(m => m.FoodModule) },
    { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },  // Correct lazy loading for Checkout module
    { path: 'user', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule) },
    { path: 'cart', loadChildren: () => import('./cart-details/cart-details.module').then(m => m.CartDetailsModule) },
    { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule ) },
    { path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule ) },
    { path: 'order_history', loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule ) }
    
];
