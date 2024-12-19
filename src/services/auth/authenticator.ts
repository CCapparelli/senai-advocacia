import { of, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class Authenticator {
  private mocData = [
    {email:'alice.client@acme.com', pass:'12345', token:'fake-token1' },
    {email:'bob.lawer@acme.com',    pass:'12345', token:'fake-token2' },
    {email:'carol.admim@acme.com',  pass:'12345', token:'fake-token3' },
  ];
  
  // Nota da professora:
  // IMPORTANTE: para facilitar o estudo, utilizamos a lógica abaixo, porém, no
  // mundo real haveria uma chamada à uma service para acionar uma API e validar
  // o usuário e senha.

  public authenticate(userEmail: string, userPassword: string) : boolean {
    const token = this.call(userEmail, userPassword);
    if (token)
      return true;
    else 
      return false;
  }

  private call(userEmail: string, userPassword: string) {
    const data  = this.mocData.filter(x => x.email === userEmail && x.pass === userPassword)[0];
    return data ? of(data.token) : throwError(() => this.newError(`Usuário ou senha inválido`));
  }
  
  // support/inner methods
  private newError(message: string) {
    const error: any = new Error(message);
    error.timestamp = Date.now();
    return error;
  }
}