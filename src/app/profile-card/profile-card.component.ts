import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})

export class ProfileCardComponent {
  username: string = '';
  type1: string = '';
  type2: string = '';
  type1alt: string = '';
  type2alt: string = '';
  hasType1: boolean = false;
  hasType2: boolean = false;
  avatar: string = '';
  avataralt: string = '';
  
  constructor(
    public session: SessionService,
  )
  {
    this.username = this.session.session.username;
    this.type1 = `../assets/tipos/icon-${this.session.session.pkmntype1}.svg`;
    this.type2 = `../assets/tipos/icon-${this.session.session.pkmntype2}.svg`;
    this.type1alt = `Tipo ${this.session.session.pkmntype1}`;
    this.type2alt = `Tipo ${this.session.session.pkmntype2}`;
    this.avatar = `../assets/avatar/${this.session.session.avatar}.avif`;
    this.avataralt = `Avatar ${this.session.session.avatar}`;

    let type1 = this.session.session.pkmntype1;
    let type2 = this.session.session.pkmntype2;
    this.hasType1 = (type1 == 'none' || type1 == '') ? false : true ;
    this.hasType2 = (type2 == 'none' || type2 == '') ? false : true ;
  }
}
