import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io

@Component({
  selector: 'app-home-control-panel',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './home-control-panel.component.html',
  styleUrls: ['../home/home.component.css', 'home-control-panel.component.css']
})
export class HomeControlPanelComponent {

  mensajePreguntados() {
    Swal.fire({
      title: "Juego En Desarrollo",
      text: "El juego Preguntados aún está en desarrollo, estará disponible el 23/05/2024.",
      icon: "info"
    });
  }
}
