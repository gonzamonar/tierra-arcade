import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPause, faPlay, faRepeat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  ASSETS_DIR: string = '../../assets/images/about';
  flipped: boolean = false;
  icon: IconDefinition = faRepeat;
}
