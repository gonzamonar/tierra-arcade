import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-ahorcado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './game-ahorcado.component.html',
  styleUrl: './game-ahorcado.component.css',
  animations: [
    trigger('flyInOut', [
      state('*', style({ transform: 'translateY(0%)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({ transform: 'translateY(100%)' }))
      ])
    ]),
  ]
})

export class GameAhorcadoComponent {
  alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  lifes: number = 5;
  score: number = 0;
  
  exodiaReveal: string[] = [
    '../assets/ahorcado/hidden.png',
    '../assets/ahorcado/hidden.png',
    '../assets/ahorcado/hidden.png',
    '../assets/ahorcado/hidden.png',
    '../assets/ahorcado/hidden.png'
  ]

  exodia: string[] = [
    '../assets/ahorcado/exodia-1.png', 
    '../assets/ahorcado/exodia-5.png',
    '../assets/ahorcado/exodia-4.png',
    '../assets/ahorcado/exodia-2.png',
    '../assets/ahorcado/exodia-3.png'
  ]

  constructor () {
    Swal.fire({
      title: "Juego En Desarrollo",
      text: "El juego Ahorcado aún está en desarrollo, esta es sólo una vista visual del juego, pero aún no cuenta con funcionalidad.",
      icon: "info"
    });
  }
}
