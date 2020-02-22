import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerPage } from './customer.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new-customer/new-customer.module').then( m => m.NewCustomerPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPageRoutingModule {}
