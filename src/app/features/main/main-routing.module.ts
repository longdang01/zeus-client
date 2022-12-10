import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '',
    component: MainComponent,
    children: [
      { 
        path: 'home', 
        redirectTo: '',
        pathMatch: 'full'
      },
      { 
        path: '',
        loadChildren: () => import('../home/home.module')
        .then(m => m.HomeModule)
      },
      { 
        path: 'products',
        loadChildren: () => import('../products/products.module')
        .then(m => m.ProductsModule) 
      },
      { 
        path: 'detail',
        loadChildren: () => import('../detail/detail.module')
        .then(m => m.DetailModule)
      },
      { 
        path: 'cart', 
        loadChildren: () => import('../cart/cart.module')
        .then(m => m.CartModule)
      },
      { 
        path: 'checkout', 
        loadChildren: () => import('../checkout/checkout.module')
        .then(m => m.CheckoutModule),
        canActivate: [AuthGuard]
      },
      { 
        path: 'my-account', 
        loadChildren: () => import('../my-account/my-account.module')
        .then(m => m.MyAccountModule),
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
