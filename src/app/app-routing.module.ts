import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    "path":"",
    "component":HomeComponent
  },
  {
    "path":"customers",
    "component":CustomersComponent
  },
  {
    "path":"accounts",
    "component":AccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
