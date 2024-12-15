import { AfterViewInit, Component } from '@angular/core';
import { IContactMessage, emptyContactMessage } from '../../../data/model/entities/omRoot';
import { IForm } from '../../../data/model/guiOM';
import { OurContactForm } from './our-contact.form';

@Component({
  selector: 'our-contact',
  templateUrl: './our-contact.component.html',
  styleUrl: './our-contact.component.css'
})
export class OurContactComponent implements IForm<IContactMessage>, AfterViewInit {
  contactForm  : OurContactForm|null = null;
  formContainer: HTMLElement|null = null;
  
  ngAfterViewInit(): void {
    this.formContainer = document.getElementById('divContactForm');
    this.contactForm = new OurContactForm(this);
    this.contactForm.load(emptyContactMessage);
  }

  submit(msg: IContactMessage): void {
    alert(`Not implemented yet, ${msg.senderName}.`);
  }
}
