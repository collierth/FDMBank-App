import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { UpdateCustomerModalComponent } from '../update-customer-modal/update-customer-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransferModalComponent } from '../transfer-modal/transfer-modal.component';
import { AccountService } from '../account.service';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {

  public customer: Customer | undefined;
  id: string = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private customerService: CustomerService, private router: Router, private accountService: AccountService) {

  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        this.getCustomer();
      })
  }

  getCustomer() {
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.customer = JSON.parse(JSON.stringify(data));
      console.log(this.customer);
    })
  }

  openUpdateModal(customer: Customer | undefined) {

    if (customer)
    {
      const updateDialogRef = this.dialog.open(UpdateCustomerModalComponent, {
        data: { customer }
      });
  
      updateDialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.updateCustomer(result, customer.customerId);
        }
      })
    }
    
  }

  openTransactionModal(id: number) {
    const transactionDialogRef = this.dialog.open(TransactionModalComponent);

    transactionDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.transaction(result, id);
      }
    })
  }

  transaction(transactionData: any, id: number) {
    this.accountService.transaction(transactionData, id).subscribe(data => {
      this.getCustomer();
    })
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe(response => {
      this.getCustomer();
    })
  }

  openTransferModal(id: number) {
    const dialogConfig = new MatDialogConfig();
  

    const transactionDialogRef = this.dialog.open(TransferModalComponent, {
      data: { id: id }
    });

    transactionDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.transferFrom(result);
        this.transferTo(result);
      }
    })
  }

  transferFrom(transferData: any) {
    this.accountService.transferFrom(transferData).subscribe(data => {
      this.getCustomer();
    })
  }

  transferTo(transferData: any) {
    this.accountService.transferTo(transferData).subscribe(data => {
      this.getCustomer();
    })
  }

  updateCustomer(customerData: any, id: number) {
    this.customerService.updateCustomer(customerData, id).subscribe(data => {
      this.getCustomer();
    })
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(response => {
      this.router.navigate(['/customers']);
    })
  }
}
