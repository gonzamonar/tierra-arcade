import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io
import { RouterModule, RouterOutlet } from '@angular/router';
import { CroupierService } from '../../services/croupier.service';
import { IconDefinition, faPause, faPlay, faVolumeHigh, faVolumeOff, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SoundPlayerService } from '../../services/sound-player.service';

@Component({
  selector: 'app-game-ahorcado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    FontAwesomeModule
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

export class GameAhorcadoComponent implements OnInit, OnDestroy {
  ASSETS_DIR: string = '../../assets/images/games/ahorcado';
  alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  KEYWORD: string = '';
  MASKED_KEYWORD: string = '';
  wordList: any[] = [];
  usedChars: string[] = [];
  usedWords: string[] = [];
  musicIcon: IconDefinition = faVolumeHigh;
  gameRunning: boolean = false;

  lifes: number = 5;
  score: number = 0;

  constructor (
    private croupier: CroupierService,
    private soundPlayer: SoundPlayerService
  ) { }

  
  ngOnInit(): void {
    this.soundPlayer.play_Ahorcado_AmbientMusic();
  }
  
  ngOnDestroy(): void {
    this.soundPlayer.pause_Ahorcado_AmbientMusic();
    this.soundPlayer.cleanBuffer();
  }


  startGame() {
    this.score = 0;
    this.gameRunning = true;
    this.fetchJSONData();
  }
  
  submitAnswer(char: string){
    if (!this.usedChars.includes(char)){
      this.usedChars.push(char);
      if (this.KEYWORD.includes(char)){
        this.unmaskChar(char);
        this.score += 1;
      } else {
        this.score -= this.score == 0 ? 0 : 1 ;
        this.lifes -= 1;
      }
    }

    if (this.lifes == 0) {
      this.soundPlayer.play_Ahorcado_LaughSound();
      this.MASKED_KEYWORD = '';
      setTimeout(() => {
        this.gameRunning = false;
      }, 2500);
    }
    
    if (!this.MASKED_KEYWORD.includes('_') && this.MASKED_KEYWORD != '') {
      this.score += this.lifes;
      setTimeout(() => {
        this.getNewKeyword();
      }, 1500);
    }
  }

  unmaskChar(char: string){
    while (this.KEYWORD.includes(char)){
      let i = this.KEYWORD.indexOf(char);
      this.KEYWORD = this.replaceAt(this.KEYWORD, i, '_');
      this.MASKED_KEYWORD = this.replaceAt(this.MASKED_KEYWORD, i, char);
    }
  }

  showKeyword(){
    return this.MASKED_KEYWORD.split("").join(" ");
  }

  replaceAt(str: string, index: number, replacement: string) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
  }

  isCharUsed(char: string){
    return this.usedChars.includes(char) ? true : false ;
  }

  bulbColor(char: string){
    let bulbColor = 'unselectedColor';
    if (this.usedChars.includes(char)){
      bulbColor = this.MASKED_KEYWORD.includes(char) ? 'rightColor' : 'wrongColor' ;
    }
    return bulbColor;
  }

  getLifes(n: number){
    return n+1 > this.lifes;
  }

  fetchJSONData() {
    fetch("../../assets/json/ahorcadoWordList.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
          this.wordList = data;
          this.croupier.shuffle(this.wordList);
          this.getNewKeyword();
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
  }


  getNewKeyword(){
    let word = '';
    let dictLen = this.wordList.length;

    do {
      let n = this.getRandomInt(dictLen);
      word = this.wordList[n]['word'];
    } while (this.usedWords.includes(word));

    this.usedWords.push(word);
    this.replaceVowels(word);

    this.KEYWORD = word.toUpperCase();
    console.log(this.KEYWORD);
    let len: number = this.KEYWORD.length;
    this.MASKED_KEYWORD = "_".repeat(len);
    this.lifes = 5;
    this.usedChars = [];
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  replaceVowels(word: string){
    word.replaceAll('á', 'a');
    word.replaceAll('é', 'e');
    word.replaceAll('í', 'i');
    word.replaceAll('ó', 'o');
    word.replaceAll('ú', 'u');
  }

  switchMusic() {
    if (this.musicIcon == faVolumeHigh){
      this.musicIcon = faVolumeXmark;
      this.soundPlayer.pause_Ahorcado_AmbientMusic();
    } else {
      this.musicIcon = faVolumeHigh;
      this.soundPlayer.play_Ahorcado_AmbientMusic();
    }
  }
}
