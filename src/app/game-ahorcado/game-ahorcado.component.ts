import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-ahorcado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './game-ahorcado.component.html',
  styleUrl: './game-ahorcado.component.css'
})

export class GameAhorcadoComponent {
  alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  lifes: number = 5;
  
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

  

}
