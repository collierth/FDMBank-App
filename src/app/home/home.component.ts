import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public customerCount : number = 0;
  public accountCount : number = 0;

  constructor(private customerService: CustomerService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customerCount = JSON.parse(JSON.stringify(data)).length;
    });

    this.accountService.getAccounts().subscribe(data => {
      this.accountCount = JSON.parse(JSON.stringify(data)).length;
    })
  }
}
