import { Injectable } from '@angular/core';
import { PokeapiService } from './pokeapi.service';
import { TriviaGuessPokemon } from '../interfaces/trivia-guess-pokemon';

@Injectable({
  providedIn: 'root'
})
export class PoketriviaService {
  MAX_POKEMON: number = 1025;

  constructor(
    private pokeapi: PokeapiService
  ) { }

  // question: TriviaGuessPokemon
  getGuessPokemonQuestion() {
    let question: TriviaGuessPokemon = {
      imgSrc: '',
      optionList: [
        {option: '', isCorrect: false},
        {option: '', isCorrect: false},
        {option: '', isCorrect: false},
        {option: '', isCorrect: false}
      ]
    };

    let pokeNumbers: number[] = [];

    for (let i=0; i<4; i++){
      let n = this.getRandomInt(this.MAX_POKEMON) + 1;
      if (pokeNumbers.includes(n)){
        i--;
      } else {
        pokeNumbers.push(n);
      }
    }

    let isCorrect = this.getRandomInt(4);

    for (let i=0; i<4; i++){
      this.pokeapi.pokemon(pokeNumbers[i]).subscribe(
        response => {
          question.optionList[i].option = response['name'];
          if (i==isCorrect){
            question.imgSrc = response['sprites']['other']['official-artwork']['front_default'];
            question.optionList[i].isCorrect = true;
          } else {
            question.optionList[i].isCorrect = false;
          }
      });
    }
    
    return question;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
