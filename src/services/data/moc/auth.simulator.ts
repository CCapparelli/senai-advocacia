import { of, throwError } from "rxjs";
import { MocData } from "./user";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class AuthSumulator {
  constructor(
    private mocData : MocData
  ) {}

  // Nota da professora
  // IMPORTANTE: para facilitar o estudo, utilizamos a lógica abaixo, porém, no
  // mundo real haveria uma chamada à uma service para acionar uma API e validar
  // o usuário e senha.
  call(userName: string, userPassword: string) {
    const data  = this.mocData.for(userName, userPassword);
    return data ? of(data) : throwError(() => this.newError(`Usuário ou senha inválido`));
  }
  
  // support/inner methods
  private newError(message: string) {
    const error: any = new Error(message);
    error.timestamp = Date.now();
    return error;
  }
}