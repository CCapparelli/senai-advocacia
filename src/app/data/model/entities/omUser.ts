import { Address } from "./omRoot";

// Usuário (cadastro e autenticação)
// 'futuramente', também em preferências
export interface IUser {
    email:string;
}

export interface IUserData extends IUser {
    name: string;
    mobile: string;
    addressInfo: Address;
    roles: string[];
    paths: string[];
}
export const emptyUserData : IUserData = {email:'', name:'', mobile:'', roles:[], paths:[], addressInfo: new Address('','','','')};

export interface IUserAuth extends IUser {
    pass:string;
    token:string;
}
export const emptyUserAuth : IUserAuth = {email:'', pass:'', token:''};

