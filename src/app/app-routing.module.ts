import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { FavoritePageComponent } from './components/partials/favorite-page/favorite-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent
  },
  {
    path: 'tag/:tag',
    component: HomeComponent
  },
  {
    path: 'food/:id',
    component: FoodPageComponent
  },
  {
    path: 'cart-page',
    component: CartComponent
  },
  {
    path: 'favorite-page',
    component: FavoritePageComponent
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'register-page',
    component: RegisterPageComponent
  },
  {
    path: 'checkout-page',
    component: CheckoutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
