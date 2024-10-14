import { Component, OnInit } from '@angular/core';
import { Account } from '../models/Account';
import { AccountService } from '../account.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/Customer';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  public accounts : Array<Account> = [];
  placeholder: String = 'Search...';
  searchQuery: string = '';
  selectedFilter: string = '';

  constructor(private accountService : AccountService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAccounts();
  }

  openCreateAccountModal() {
    const createAccountDialogRef = this.dialog.open(CreateAccountModalComponent);

    createAccountDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAccount(result);
      }
    })
  }

  openTransactionModal(id: number) {
    const transactionDialogRef = this.dialog.open(TransactionModalComponent);

    transactionDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.transaction(result, id);
      }
    })
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = JSON.parse(JSON.stringify(data));
      console.log(this.accounts);
    });
  }

  addAccount(accountData: any) {
    this.accountService.addAccount(accountData).subscribe(data => {
      this.getAccounts();
    });
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe(response => {
      this.getAccounts();
    })
  }

  getAccountById() {
    console.log(this.searchQuery);
    this.accountService.getAccountById(this.searchQuery).subscribe(data => {
      this.accounts.length = 0;
      this.accounts.push(JSON.parse(JSON.stringify(data)));
    });
  }

  getAccountsByCity() {
    console.log(this.searchQuery);
    this.accountService.getAccountsByCity(this.searchQuery).subscribe(data => {
      this.accounts = JSON.parse(JSON.stringify(data));
    })
  }

  updatePlaceholder(event: Event): void {
    const filterCriteria = event.target as HTMLInputElement;
    this.placeholder = `Search by ${filterCriteria.value}`;
  }

  onSubmit() {
    console.log(this.selectedFilter);
    if (this.selectedFilter === 'ID') {
      console.log("by id");
      this.getAccountById();
    }
    else if (this.selectedFilter === 'City') {
      this.getAccountsByCity();
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.getAccounts();
  } 

  transaction(transactionData: any, id: number) {
    this.accountService.transaction(transactionData, id).subscribe(data => {
      this.getAccounts();
    })
  }

}
