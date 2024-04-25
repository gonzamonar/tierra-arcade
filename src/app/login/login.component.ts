import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  typelist: string[] = [' ', 'acero', 'agua', 'bicho', 'dragón', 'eléctrico', 'fantasma', 'fuego', 'hada',
  'hielo', 'lucha', 'normal', 'planta', 'psíquico', 'roca', 'siniestro', 'tierra', 'veneno', 'volador'];

  imgtype1: string = "../assets/tipos/none.png";
  imgtype2: string = "../assets/tipos/none.png";

  changeType1(e: Event) {
    if (e.target !== null){
      const target = e.target as HTMLSelectElement;
      let value = (target.value == ' ') ? 'none' : target.value ;
      this.imgtype1 = "../assets/tipos/" + value + ".png";
    }
  }

  changeType2(e: Event) {
    if (e.target !== null){
      const target = e.target as HTMLSelectElement;
      let value = (target.value == ' ') ? 'none' : target.value ;
      this.imgtype2 = "../assets/tipos/" + value + ".png";
    }
  }

  changeViewLoad(){
    let btnNew = document.getElementById("btn-new");
    let btnLoad = document.getElementById("btn-load");
    let registerForm = document.querySelector(".register-form");
    let loginForm = document.querySelector(".login-form");

    btnLoad?.classList.remove("inactive");
    btnNew?.classList.add("inactive");
    loginForm?.classList.remove("hidden");
    registerForm?.classList.add("hidden");
  }

  changeViewNew(){
    let btnNew = document.getElementById("btn-new");
    let btnLoad = document.getElementById("btn-load");
    let registerForm = document.querySelector(".register-form");
    let loginForm = document.querySelector(".login-form");

    btnLoad?.classList.add("inactive");
    btnNew?.classList.remove("inactive");
    loginForm?.classList.add("hidden");
    registerForm?.classList.remove("hidden");
  }
}
