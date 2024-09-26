import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../models/Customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrl: './create-account-modal.component.css'
})
export class CreateAccountModalComponent implements OnInit {

  form: FormGroup;
  public customers : Array<String> = [];
  public customerIDs : Array<number> = [];

  constructor(public dialogRef: MatDialogRef<CreateAccountModalComponent>, private fb: FormBuilder, private customerService : CustomerService) {
    
    this.form = this.fb.group({
      customerId: new FormControl(''),
      type: [''],
      balance: [''],
      interestRate: [''],
      nextCheckNumber: ['']
    });
  }

  ngOnInit(): void {
      this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = JSON.parse(JSON.stringify(data));
      this.customerIDs = this.customers.map((customer: any) => customer.customerId);
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
