import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  { 
    path: '', 
    component: MyAccountComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'dashboards',
        pathMatch: 'full'
      },
      { 
        path: 'dashboards', 
        loadChildren: () => 
        import('./pages/dashboards/dashboards.module')
        .then(m => m.DashboardsModule)
      },
      { 
        path: 'delivery-address',
        loadChildren: () => import('./pages/delivery-address/delivery-address.module')
        .then(m => m.DeliveryAddressModule)
      },
      { 
        path: 'orders',
        loadChildren: () => import('./pages/orders/orders.module')
        .then(m => m.OrdersModule)
      },
      { path: 'information',
       loadChildren: () => import('./pages/information/information.module').then(m => m.InformationModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
