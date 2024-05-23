import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SoundPlayerService {
  SOUNDS_DIR = "../../../assets/sounds/";
  currentMusic!: any;

  constructor() { }

  // FUNCIONES GENERALES
  playSound(path: string, volume: number = 1){
    let sound = new Audio(path);
    sound.src = path;
    sound.volume = volume;
    sound.play();
    // (() => {      
    // })
  }
  
  playInLoop(path: string, volume: number = 1){
    this.currentMusic = new Audio(path);
    this.currentMusic.volume = volume;
    this.currentMusic.loop = true;
    this.currentMusic.play();
    // (() => {
    // })
  }

  play(){
    if (this.currentMusic){
      this.currentMusic.play();
    }
  }

  pause(){
    if (this.currentMusic){
      this.currentMusic.pause();
    }
  }

  load(){
    if (this.currentMusic){
      this.currentMusic.load();
    }
  }


  cleanBuffer(){
    this.currentMusic = null;
  }


  // CORRE MARIO, CORRE
  play_Mario_LevelMusic() {
    if (!this.currentMusic){
      this.playInLoop(this.SOUNDS_DIR + "mario/overworld.m4a", 0.6);
    } else {
      this.load();
      this.play();
    }
  }

  pause_Mario_LevelMusic() {
    this.pause();
  }

  play_Mario_LostSound(){
    this.playSound(this.SOUNDS_DIR + "mario/lost.m4a", 0.7);
  }

  play_Mario_ThrowObjectSound(objectType: string){
    switch (objectType) {
      case 'bullet':
        this.play_Mario_BulletSound();
        break;
      case 'shell':
        this.play_Mario_ShellSound();
        break;
      case 'brick':
        this.play_Mario_BrickSound();
        break;
    }
  }

  play_Mario_BulletSound(){
    this.playSound(this.SOUNDS_DIR + "mario/bullet.mp3", 0.2);
  }

  play_Mario_ShellSound(){
    this.playSound(this.SOUNDS_DIR + "mario/shell.mp3");
  }

  play_Mario_BrickSound(){
    this.playSound(this.SOUNDS_DIR + "mario/brick.mp3");
  }

  play_Mario_JumpSound(){
    this.playSound(this.SOUNDS_DIR + "mario/jump.mp3", 0.1);
  }

  play_Mario_DockSound(){
    this.playSound(this.SOUNDS_DIR + "mario/dock.mp3", 0.5);
  }



  // POKETRIVIA

  play_Poketrivia_AmbientMusic() {
    if (!this.currentMusic){
      this.playInLoop(this.SOUNDS_DIR + "poketrivia/gen3music.mp3", 0.8);
    } else {
      this.play();
    }
  }

  pause_Poketrivia_AmbientMusic() {
    this.pause();
  }

  play_Poketrivia_CorrectSound(){
    this.playSound(this.SOUNDS_DIR + "poketrivia/correct.mp3", 0.3);
  }

  play_Poketrivia_WrongSound(){
    this.playSound(this.SOUNDS_DIR + "poketrivia/wrong.mp3", 0.3);
  }



  // AHORCADO
  play_Ahorcado_AmbientMusic() {
    if (!this.currentMusic){
      this.playInLoop(this.SOUNDS_DIR + "ahorcado/dont_go_in.mp3", 0.7);
    } else {
      this.play();
    }
  }

  pause_Ahorcado_AmbientMusic() {
    this.pause();
  }

  play_Ahorcado_LaughSound(){
    this.playSound(this.SOUNDS_DIR + "ahorcado/laugh_talesfromthecrypt.mp3", 0.7);
  }



  // MAYOR MENOR
  play_MayorMenor_AmbientMusic() {
    if (!this.currentMusic){
      this.playInLoop(this.SOUNDS_DIR + "mayormenor/1940smusic.mp3", 0.5);
    } else {
      this.play();
    }
  }

  pause_MayorMenor_AmbientMusic() {
    this.pause();
  }

  play_MayorMenor_FlipSound(){
    this.playSound(this.SOUNDS_DIR + "mayormenor/flip.mp3", 1);
  }

  play_MayorMenor_Right(){
    this.playSound(this.SOUNDS_DIR + "mayormenor/crowd_cheer.mp3", 1);
  }

  play_MayorMenor_Wrong(){
    // this.playSound(this.SOUNDS_DIR + "mayormenor/crowd_disappointed.mp3", 1);
  }

}
