import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeRequireLoginComponent } from '../home-require-login/home-require-login.component';
import { SessionService } from '../../services/session.service';
import { Session } from '../../interfaces/session';
import { CommonModule } from '@angular/common';
import { HomeControlPanelComponent } from '../home-control-panel/home-control-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HomeRequireLoginComponent,
    HomeControlPanelComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  session: Session;

  constructor(sessionService: SessionService) {
    this.session = sessionService.session;
  }
}
