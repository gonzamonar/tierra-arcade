import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { PoketriviaService } from '../../services/poketrivia.service';
import { TriviaGuessPokemon } from '../../interfaces/trivia-guess-pokemon';
import { TriviaOption } from '../../interfaces/trivia-option';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io
import { SoundPlayerService } from '../../services/sound-player.service';

@Component({
  selector: 'app-game-poketrivia',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './game-poketrivia.component.html',
  styleUrl: './game-poketrivia.component.css'
})

export class GamePoketriviaComponent implements OnInit, OnDestroy {
  ASSETS_DIR: string = '../../assets/images/games/poketrivia';

  musicIcon: IconDefinition = faPlay;
  questionContent: TriviaGuessPokemon = {
    imgSrc: '',
    optionList: [
      {option: '', isCorrect: false},
      {option: '', isCorrect: false},
      {option: '', isCorrect: false},
      {option: '', isCorrect: false}
    ]
  };

  screenSrc: string = '';
  optionlist: TriviaOption[] = [];
  screenMessage: string = '';
  score: number = 0;
  count: number = 0;
  answering: boolean = false;

  constructor (
    private poketrivia: PoketriviaService,
    private soundPlayer: SoundPlayerService
  ) { }
  
  
  ngOnInit(): void {
    this.getNewQuestion();
    this.soundPlayer.play_Poketrivia_AmbientMusic();
  }

  ngOnDestroy(): void {
    this.soundPlayer.pause_Poketrivia_AmbientMusic();
    this.soundPlayer.cleanBuffer();
  }

  switchMusic() {
    if (this.musicIcon == faPlay){
      this.musicIcon = faPause;
      this.soundPlayer.pause_Poketrivia_AmbientMusic();
    } else {
      this.musicIcon = faPlay;
      this.soundPlayer.play_Poketrivia_AmbientMusic();
    }
  }


  submitAnswer(isCorrect: boolean) {
    this.count += 1;
    this.answering = true;
    
    if (isCorrect) {
      this.score += 1;
      this.soundPlayer.play_Poketrivia_CorrectSound();
      this.screenMessage = '¡CORRECTO!';
    } else {
      this.soundPlayer.play_Poketrivia_WrongSound();
      this.screenMessage = '¡Opción incorrecta!';
    }

    setTimeout(() => {
      this.getNewQuestion();
      this.answering = false;
    }, 1500);
  }

  getNewQuestion() {
    this.questionContent = this.poketrivia.getGuessPokemonQuestion();
    this.screenMessage = '¿Quién es ese pokemon?';
  }
}
