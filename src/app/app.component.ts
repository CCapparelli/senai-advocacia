import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageTestComponent } from './image-test/image-test.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'senai-advocacia';
}
