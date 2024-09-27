import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/Customer';
import { Account } from '../models/Account';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrl: './transfer-modal.component.css'
})
export class TransferModalComponent implements OnInit {

  form: FormGroup;
  customer: Customer | undefined;
  accountIds: Array<Number> = [];

  constructor(public dialogRef: MatDialogRef<TransferModalComponent>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private customerService : CustomerService) {

    this.form = this.fb.group({
      fromAccountId: [''],
      amount: [''],
      toAccountId: ['']
    });
  }

  ngOnInit(): void {
      this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomerById(this.data.id).subscribe(data => {
      this.customer = JSON.parse(JSON.stringify(data));
      this.accountIds = this.customer?.accounts.map((account: any) => account.accountId) || [];
    });
  }


  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
