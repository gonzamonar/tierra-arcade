import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-require-login',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './home-require-login.component.html',
  styleUrl: '../home/home.component.css'
})
export class HomeRequireLoginComponent {

}
