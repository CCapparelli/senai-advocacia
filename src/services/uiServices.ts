import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUserData } from '../model/user/om';

@Injectable({providedIn: "root"})
export class ViewUpdater {
  private opts : HTMLElement|null;
  private dash : HTMLElement|null;
  private rprt : HTMLElement|null;
  private mtns : HTMLElement|null;
  private btnLogin : HTMLElement|null;

  constructor(private router: Router) {
    this.opts = document.getElementById('divAreas');
    this.dash = document.getElementById('link-dash');
    this.rprt = document.getElementById('link-reports');
    this.mtns = document.getElementById('link-meetings');
    this.btnLogin = document.getElementById('btn-login');
  }
 

  reset(data: IUserData|null) {
    if (this.opts) {
      this.opts.style.display = 'none';
    }
    if (this.btnLogin) {
      this.btnLogin.innerText = 'Login';
    }
    if (this.dash) {
      this.dash.style.display = 'none';
    }    
    if (this.rprt) {
      this.rprt.style.display = 'none';
    }  
    if (this.mtns) {
      this.mtns.style.display = 'none';
    }  
    this.assignToFooter(data);
    this.assignToHeader(data);
  }

  update(data: IUserData) {
    this.reset(data);
    if (this.btnLogin) {
      this.btnLogin.innerText = 'Logout';
    }
    if (this.opts) {
      this.opts.style.display = 'block';
    }
    this.assignToFooter(data);
    this.assignToHeader(data);
  }

  assignToFooter(data: IUserData|null) {
    let items = Array.from(document.getElementsByClassName('footer'));
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      
      if (data && data.roles.includes('admin')) {
        item.style.backgroundColor = '#262626';  /* retirar esses hardcore aê*/
        if (this.dash) {
          this.dash.style.display = 'block';
        }    
        if (this.rprt) {
          this.rprt.style.display = 'block';
        }  
        if (this.mtns) {
          this.mtns.style.display = 'block';
        } 

      } else if (data && data.roles.includes('client')) {
        item.style.backgroundColor = '#004040';
      
      } else if (data && data.roles.includes('lawer')) {
        item.style.backgroundColor = '#203470';
        if (this.rprt) {
          this.rprt.style.display = 'block';
        }    
        if (this.mtns) {
          this.mtns.style.display = 'block';
        } 
        
      } else {
        item.style.backgroundColor = '#41310A';
      }
    }
  }

  assignToHeader(data: IUserData|null) {
    let items = Array.from(document.getElementsByClassName('header'));
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      
      if (data && data.roles.includes('admin')) {
        item.style.backgroundColor = '#262626';  /* retirar esses hardcore aê*/
      
      } else if (data && data.roles.includes('client')) {
        item.style.backgroundColor = '#004040';
      
      } else if (data && data.roles.includes('lawer')) {
        item.style.backgroundColor = '#203470';
      
      } else {
        item.style.backgroundColor = '#41310A';
      }
    }
  }
}