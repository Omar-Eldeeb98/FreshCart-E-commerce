import { PaymentComponent } from './components/payment/payment.component';
import { DetailsComponent } from './components/details/details.component';
import { authGuard } from './auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'HOME PAGE',
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
    title: 'CART PAGE',
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    component: WishlistComponent,
    title: 'Wish List PAGE',
  },
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsComponent,
    title: 'PRODUCTS PAGE',
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
    title: 'ALL ORDERS PAGE',
  },
  {
    path: 'payment/:id',
    canActivate: [authGuard],
    component: PaymentComponent,
    title: 'PAYMENT PAGE',
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
    title: 'CATEGORIES PAGE',
  },
  {
    path: 'productDetails/:productId',
    canActivate: [authGuard],
    component: DetailsComponent,
    title: 'DETAILS PAGE',
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    component: BrandsComponent,
    title: 'BRANDS PAGE',
  },
  { path: 'login', component: LoginComponent, title: 'LOGIN PAGE' },
  { path: 'register', component: RegisterComponent, title: 'REGISTER PAGE' },

  { path: '**', component: NotfoundComponent, title: 'NOTFOUND PAGE' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
