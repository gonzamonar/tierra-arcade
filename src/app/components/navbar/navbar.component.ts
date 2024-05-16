import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Session } from '../../interfaces/session';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    ProfileCardComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  sessionData!: Session;

  constructor(
    public auth: Auth,
    public session: SessionService
  ) {
    this.sessionData = this.session.session;
   }


  Logout() {
    signOut(this.auth).then(
      () => {
        Swal.fire({
          title: "¿Deseas cerrar sesión?",
          text: "(Podés volver cuando quieras.)",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#42b54d",
          confirmButtonText: "Sí, salir",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "¡Sesión cerrada!",
              text: "Tu sesión fue cerrada exitosamente.",
              icon: "success"
            });
            this.session.closeSession();
          }
        });
    })
  }
}
