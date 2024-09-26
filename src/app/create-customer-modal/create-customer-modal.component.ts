import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
  styleUrl: './create-customer-modal.component.css'
})
export class CreateCustomerModalComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateCustomerModalComponent>, private fb: FormBuilder) {

    this.form = this.fb.group({
      type: [''],
      name: [''],
      address: this.fb.group({
        streetNumber: [''],
        postalCode: [''],
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
