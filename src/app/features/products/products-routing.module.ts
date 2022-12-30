import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { 
    path: '',
    component: ProductsComponent,
    children: [
      { 
        path: 'detail',
        loadChildren: () => 
        import('./pages/detail/detail.module').then(m => m.DetailModule)
      },
      { 
        path: '',
        loadChildren: () => 
        import('./pages/list/list.module').then(m => m.ListModule)
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
