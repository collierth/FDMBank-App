import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/Customer';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerModalComponent } from '../create-customer-modal/create-customer-modal.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateCustomerModalComponent } from '../update-customer-modal/update-customer-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  public customers : Array<Customer> = [];
  placeholder: String = 'Search...';
  searchQuery: string = '';
  selectedFilter: string = '';

  constructor(private customerService: CustomerService, public dialog: MatDialog, private router: Router) {

  }

    ngOnInit(): void {

      this.getCustomers();

    }

    navigateToCustomerDetail(customerId: number) {
      this.router.navigate(['/customerDetail'], { queryParams: { id: customerId.toString() } });
    }

    openCreateModal() {
      const createDialogRef = this.dialog.open(CreateCustomerModalComponent);

      createDialogRef.afterClosed().subscribe(result => {
        if(result) {
          
          this.addCustomer(result);

        }
      })
    }

    openUpdateModal(customer: Customer) {
      const updateDialogRef = this.dialog.open(UpdateCustomerModalComponent, {
        data: { customer }
      });

      updateDialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.updateCustomer(result, customer.customerId);
        }
      })
    }

    addCustomer(customerData: any) {
      this.customerService.addCustomer(customerData).subscribe(data => {
        this.getCustomers();
      });
    }

    updateCustomer(customerData: any, id: number) {
      this.customerService.updateCustomer(customerData, id).subscribe(data => {
        this.getCustomers();
      })
    }

    getCustomers() {
      this.customerService.getCustomers().subscribe(data => {
        this.customers = JSON.parse(JSON.stringify(data));
        console.log(this.customers);
      });
    }

    deleteCustomer(id: number) {
      this.customerService.deleteCustomer(id).subscribe(response => {
        this.getCustomers();
      })
    }

    onSubmit() {
      console.log(this.selectedFilter);
      if (this.selectedFilter === 'ID') {
        this.getCustomerById();
      }
      else if (this.selectedFilter === 'City') {
        this.getCustomersByCity();
      }
    }

    getCustomerById() {
      this.customerService.getCustomerById(this.searchQuery).subscribe(data => {
        this.customers.length = 0;
        this.customers.push(JSON.parse(JSON.stringify(data)));
      })
    }

    getCustomersByCity() {
      this.customerService.getCustomersByCity(this.searchQuery).subscribe(data => {
        this.customers = JSON.parse(JSON.stringify(data));
      })
    }

    updatePlaceholder(event: Event): void {
      const filterCriteria = event.target as HTMLInputElement;
      this.placeholder = `Search by ${filterCriteria.value}`;
    }
  
    clearSearch() {
      this.searchQuery = '';
      this.getCustomers();
  }
}
