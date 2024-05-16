import { Component, OnInit } from '@angular/core';
import { CroupierService } from '../../services/croupier.service';
import { RouterModule, RouterOutlet } from '@angular/router';

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
export class GameMayorMenorComponent implements OnInit {
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
  ) {
    this.deck = this.croupier.getShuffledFrenchDeck();
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.swapCard('none');
    }, 1000);
    console.log(this.deck);
  }


  swapCard(bet: string){
    let newCard = this.deck[this.index];
    let newCardValue = newCard.split("_")[1];
    let newCardNum = 0;
    let newCardSuit = newCard.split("_")[0];
    let newCardColor = (newCardSuit == 'diamantes' || newCardSuit == 'corazones') ? 'rojo' : 'negro';

    console.log(this.index);
    console.log("Apuesta: " + bet);
    console.log("Nueva Carta: " + newCard);
    console.log("Carta Anterior: " + this.prevCard);

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
    if (bet == 'mayor') {
      if (newCardNum > this.prevCardValue) {
          this.score += 1;
      } else {
        this.score -= 0;
      }
    } else if (bet == 'menor') {
        if (newCardNum < this.prevCardValue) {
          this.score += 1;
        } else {
          this.score -= 0;
        }
    } else if (bet == 'igual') {
        if (newCardNum == this.prevCardValue) {
          this.score += 1;
        } else {
          this.score -= 0;
        }
      }
    }

    this.prevCard = newCard;
    this.prevCardValue = newCardNum;
    this.prevCardSuit = newCardSuit;
    this.prevCardColor = newCardColor;

    this.flipping = true;
    this.block = true;
    // this.deck.shift();
    
    if (this.switchCard) {
      this.lastCard = this.deck[this.index];
    } else {
      this.lastCardBis = this.deck[this.index];
    }

    setTimeout(() => {
      this.flipping = false;
      this.switchCard = !this.switchCard;
    }, 2500);
        
    setTimeout(() => {
      this.index++;
      this.block = false;
    }, 3500);

  }


  

}

