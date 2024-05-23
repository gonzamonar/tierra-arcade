import { Component, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-solomonskey',
  standalone: true,
  imports: [],
  templateUrl: './solomonskey.component.html',
  styleUrl: './solomonskey.component.css'
})
export class SolomonskeyComponent {
  hasStarted: boolean = false;

  constructor(
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document) { }

  start(){
    if (!this.hasStarted){
      let script = this._renderer2.createElement('script');
      script.type = `text/javascript`;
      script.text = `nes_load_url('nes-canvas', "assets/roms/solomonskey.nes");`;
      this._renderer2.appendChild(this._document.body, script);
      this.hasStarted = true;
    }
  }
  
  getInfo(){
    alert("Movimiento: Arrow Keys. Start: Enter. Select: Tab A Button: A. B Button: S");
  }
}
