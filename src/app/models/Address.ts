export class Address {
    
    public streetNumber : String = "";
    public city : String = "";
    public province : String = "";
    public postalCode : String = "";

    constructor(s : string, c : string, prov : string, post : string) {
        this.streetNumber = s;
        this.city = c;
        this.province = prov;
        this.postalCode = post;
    }
}