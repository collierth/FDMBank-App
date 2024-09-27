import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../models/Customer';

@Component({
  selector: 'app-update-customer-modal',
  templateUrl: './update-customer-modal.component.html',
  styleUrl: './update-customer-modal.component.css'
})
export class UpdateCustomerModalComponent {

    form: FormGroup;

    constructor(public dialogRef: MatDialogRef<UpdateCustomerModalComponent>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
        name: [this.data?.customer?.name],
        address: this.fb.group({
          postalCode: [this.data?.customer?.address?.postalCode],
        })
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
