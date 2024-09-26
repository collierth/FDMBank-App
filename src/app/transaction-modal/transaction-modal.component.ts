import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {

    form: FormGroup;

    constructor(public dialogRef: MatDialogRef<TransactionModalComponent>, private fb: FormBuilder) {

      this.form = this.fb.group({
        type: [''],
        amount: [''],
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
