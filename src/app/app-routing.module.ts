import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./features/main/main.module')
    .then(m => m.MainModule)
  },
  { 
    path: 'login', 
    loadChildren: () => import('./features/login/login.module')
    .then(m => m.LoginModule)
  },
  { 
    path: 'register',
    loadChildren: () => import('./features/register/register.module')
    .then(m => m.RegisterModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
