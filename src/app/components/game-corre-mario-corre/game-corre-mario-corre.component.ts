import { Component, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SoundPlayerService } from '../../services/sound-player.service';

@Component({
  selector: 'app-game-corre-mario-corre',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './game-corre-mario-corre.component.html',
  styleUrl: './game-corre-mario-corre.component.css'
})
export class GameCorreMarioCorreComponent implements OnDestroy {
  ASSETS_DIR: string = '../../assets/images/games/corremariocorre';
  subscriptionThrower!: Subscription;
  subscriptionCollider!: Subscription;
  subscriptionLandscaper!: Subscription;

  score: number = 0;
  jumping: boolean = false;
  actionJump: boolean = false;
  docking: boolean = false;
  actionDock: boolean = false;
  running: boolean = false;
  throw: boolean[] = [false, false, false, false, false, false];
  throwDetected: boolean[] = [false, false, false, false, false, false];
  throwType: string[] = ['bullet', 'bullet', 'brick', 'bullet', 'shell', 'shell'];
  rendered: boolean[] = [false, false, false, false];

  cloudSrc: string = this.ASSETS_DIR + "/cloud1.png";
  brickSrc: string = this.ASSETS_DIR + "/brick.png";
  bulletSrc: string = this.ASSETS_DIR + "/bullet.png";
  shellSrc: string = this.ASSETS_DIR + "/red_shell.gif";
  left: number = 0;
  top: number = 0;
  topLowBrick: number = 0;


  constructor (
    private soundPlayer: SoundPlayerService
  ) { }


  startGame(){
    this.soundPlayer.play_Mario_LevelMusic();
    this.score = 0;
    this.trackMario();

    const source = interval(2000);
    this.subscriptionThrower = source.subscribe(val => this.throwObject());
    const source2 = interval(100);
    this.subscriptionCollider = source2.subscribe(val => this.detectCollision());
    const source3 = interval(2000);
    this.subscriptionLandscaper = source3.subscribe(val => this.renderLandscape());

    this.topLowBrick = this.top + 80;
    this.running = true;
  }

  stopGame(){
    this.soundPlayer.pause_Mario_LevelMusic();
    this.running = false;
    this.subscriptionThrower && this.subscriptionThrower.unsubscribe();
    this.subscriptionCollider && this.subscriptionCollider.unsubscribe();
    this.subscriptionLandscaper && this.subscriptionLandscaper.unsubscribe();
  }

  ngOnDestroy(): void {
    this.stopGame();
    this.soundPlayer.cleanBuffer();
  }

  trackMario() {
    this.left = this.getXCoords("mario");
    this.top = this.getYCoords("mario");
  }

  detectCollision(){
    for (let i=0; i<6; i++){
      if (this.throw[i]){
        let objectLeft = this.getXCoords("object" + i);
        if (objectLeft > 100 && objectLeft < 350) {
          if (i <= 2 && this.docking || i >= 3 && this.jumping) {
            if (!this.throwDetected[i]){
              this.throwDetected[i] = true;
              this.score += 1;
            }
          } else {
            this.soundPlayer.play_Mario_LostSound();
            this.stopGame();
          }
        }
      }
    }
  }

  renderLandscape() {
    let i = this.getRandomInt(4);
    if (!this.rendered[i]){
      this.rendered[i] = true;
      setTimeout(() => {
        this.rendered[i] = false;
      }, 5000);
    }
  }

  throwObject() {
    let i = this.getRandomInt(6);

    if (!this.throw[i]){
      this.throw[i] = true;
      this.soundPlayer.play_Mario_ThrowObjectSound(this.throwType[i]);

      setTimeout(() => {
        this.throw[i] = false;
        this.throwDetected[i] = false;
      }, 6000);
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  jump(){
    this.soundPlayer.play_Mario_JumpSound();
    this.jumping = true;
    this.actionJump = true;
    setTimeout(() => {
      this.jumping = false;
    }, 1300);
    setTimeout(() => {
      this.actionJump = false;
    }, 2000);
  }

  dock(){
    this.soundPlayer.play_Mario_DockSound();
    this.docking = true;
    this.actionDock = true;
    setTimeout(() => {
      this.docking = false;
    }, 1300);
    setTimeout(() => {
      this.actionDock = false;
    }, 2000);
  }

  getYCoords(id:string){
    const element = document.getElementById(id);
    return element?.getBoundingClientRect().top ? element?.getBoundingClientRect().top : 0 ;
  }

  getXCoords(id:string){
    const element = document.getElementById(id);
    return element?.getBoundingClientRect().left ? element?.getBoundingClientRect().left : 0 ;
  }

}
