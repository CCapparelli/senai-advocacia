// Contato (Contacte-nos)
export interface IContactMessage {
    ourEmail:string;
    senderEmail:string;
    senderName: string;
    senderMobile: string;
    messageTitle: string;
    messageText: string;
}
export const emptyContactMessage : IContactMessage = { messageText: '', messageTitle: '', ourEmail: '', senderEmail: '', senderMobile: '', senderName: ''};

// Login e signup (login, auth, etc.)
export interface ILogin {
    email:string;
    password:string;
}
export const emptyLogin :ILogin = { email: '', password: ''};

export interface ISignup extends ILogin {
    name:string;
    confirmPassword:string;
}
export const emptySignup :ISignup = { email: '', name: '', password: '', confirmPassword: ''};