export class Account {
    public accountId: number;
    public nickname: string;
    public type: string;
    public balance : number = 0.0;
    public interestRate : number = 0.0;
    public nextCheckNumber : number = 1;

    constructor(a : number, nick : string, t : string, b : number, i : number, n : number) {
        this.accountId = a;
        this.nickname = nick;
        this.type = t;
        this.balance = b;
        this.interestRate = i;
        this.nextCheckNumber = n;
    }
}