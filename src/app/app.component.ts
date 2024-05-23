import { Component, HostBinding } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { SessionService } from './services/session.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  ROOT_ASSETS = 'assets';
  title: string = 'Tierra Arcade';

  constructor(
    public auth: Auth,
    public session: SessionService
  ){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (this.auth.currentUser?.email){
          session.updateSession(this.auth.currentUser?.email);
        }
      }
    });
  }
}
