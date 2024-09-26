export class Account {
    public accountId: number;
    public balance : number = 0.0;
    public interestRate : number = 0.0;
    public nextCheckNumber : number = 1;

    constructor(a : number, b : number, i : number, n : number) {
        this.accountId = a;
        this.balance = b;
        this.interestRate = i;
        this.nextCheckNumber = n;
    }
}