import { Account } from "./Account";
import { Address } from "./Address";

export class Customer {
    public customerId: number;
    public name: String = "";
    public address: Address;
    public accounts: Array<Account> = [];

    constructor (c : number, n : String, a : Address, accts : Array<Account>) { 
        this.customerId = c;
        this.name = n;
        this.address = a;
        this.accounts = accts;
    }
}