export class Address {
    address: string = '';
    city: string = '';
    state: string = '';
    postalCode:string = '';

    constructor(address: string, city: string,  state: string, postalCode: string) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }

    toString() {
        return `${this.address}
        ${this.postalCode} - ${this.city}/${this.state}`;
    }
}

