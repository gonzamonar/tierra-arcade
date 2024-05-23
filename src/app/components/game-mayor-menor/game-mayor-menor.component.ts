import { Component, OnDestroy, OnInit } from '@angular/core';
import { CroupierService } from '../../services/croupier.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SoundPlayerService } from '../../services/sound-player.service';

@Component({
  selector: 'app-game-mayor-menor',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './game-mayor-menor.component.html',
  styleUrl: './game-mayor-menor.component.css'
})
export class GameMayorMenorComponent implements OnInit, OnDestroy {
  ASSETS_DIR: string = '../../assets/images/games/mayormenor';
  DECK_ROOT: string = this.ASSETS_DIR + '/deck';
  score: number = 0;
  index: number = 0;
  
  deck: string[] = [];
  lastCard: string = 'cover';
  lastCardBis: string = 'cover';

  prevCard: string = '';
  prevCardValue: number = 0;
  prevCardSuit: string = '';
  prevCardColor: string = '';

  flipping: boolean = false;
  block: boolean = false;
  switchCard: boolean = true;


  constructor (
    private croupier: CroupierService,
    private soundPlayer: SoundPlayerService
  ) {
    this.deck = this.croupier.getShuffledFrenchDeck();
  }

  ngOnInit(): void {
    // this.soundPlayer.play_MayorMenor_AmbientMusic();
    setTimeout(() => {
      this.swapCard('none');
    }, 1000);
  }

  ngOnDestroy(): void {
    // this.soundPlayer.play_MayorMenor_AmbientMusic();
    // this.soundPlayer.cleanBuffer();
  }


  swapCard(bet: string){
    this.soundPlayer.play_MayorMenor_FlipSound();
    let newCard = this.deck[this.index];
    let newCardValue = newCard.split("_")[1];
    let newCardNum = 0;
    let newCardSuit = newCard.split("_")[0];
    let newCardColor = (newCardSuit == 'diamantes' || newCardSuit == 'corazones') ? 'rojo' : 'negro';

    switch (newCardValue) {
      case 'J':
        newCardNum = 11;
        break;
      case 'Q':
        newCardNum = 12;
        break;
      case 'K':
        newCardNum = 13;
        break;
      case 'A':
        newCardNum = 14;
        break;
      default:
        newCardNum = Number(newCardValue);
    }

  if (bet != 'none'){
    let guess = false;
    if (bet == 'mayor') {
      if (newCardNum > this.prevCardValue) {
          this.score += 1;
          guess = true;
      } else {
        this.score -= 0;
      }
    } else if (bet == 'menor') {
        if (newCardNum < this.prevCardValue) {
          this.score += 1;
          guess = true;
        } else {
          this.score -= 0;
        }
    } else if (bet == 'igual') {
        if (newCardNum == this.prevCardValue) {
          this.score += 1;
          guess = true;
        } else {
          this.score -= 0;
        }
      }
      if (guess) {
        this.soundPlayer.play_Poketrivia_CorrectSound();
      } else {
        this.soundPlayer.play_Poketrivia_WrongSound();
      }
    }

    this.prevCard = newCard;
    this.prevCardValue = newCardNum;
    this.prevCardSuit = newCardSuit;
    this.prevCardColor = newCardColor;

    this.flipping = true;
    this.block = true;
    
    if (this.switchCard) {
      this.lastCard = this.deck[this.index];
    } else {
      this.lastCardBis = this.deck[this.index];
    }

    setTimeout(() => {
      this.flipping = false;
      this.switchCard = !this.switchCard;
      this.soundPlayer.play_MayorMenor_FlipSound();
    }, 2500);
        
    setTimeout(() => {
      this.index++;
      this.block = false;
    }, 3500);

  }


  

}

