import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer-modal',
  templateUrl: './update-customer-modal.component.html',
  styleUrl: './update-customer-modal.component.css'
})
export class UpdateCustomerModalComponent {

    form: FormGroup;

    constructor(public dialogRef: MatDialogRef<UpdateCustomerModalComponent>, private fb: FormBuilder) {

      this.form = this.fb.group({
        name: [''],
        address: this.fb.group({
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
