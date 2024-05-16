import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CroupierService {
  suites: string[] = ['corazones', 'diamantes', 'picas', 'treboles'];

  constructor() { }

  getFrenchDeck(): string[] {
    let deck: string[] = [];

    for (let x in this.suites) {
      for (let i = 1; i < 14; i++) {
          let n = String(i);
          if (n == '1'){
              n = 'A';
          } else if (n == '11') {
              n = 'J';
          } else if (n == '12') {
              n = 'Q';
          } else if (n == '13') {
              n = 'K';
          }
          
          let carta = this.suites[x] + "_" + n;
          deck.push(carta)
      }
    }
  
    return deck;
  }

  getShuffledFrenchDeck(){
    let deck: string[] = [];
    deck = this.getFrenchDeck();
    this.shuffle(deck);
    return deck;
  }

  /* Fisher–Yates (aka Knuth) Shuffle Algorithm */
  shuffle(array: string[]) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
}
