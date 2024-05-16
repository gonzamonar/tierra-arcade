import { Injectable } from '@angular/core';
import { Session } from '../interfaces/session';
import { Userdata } from '../interfaces/userdata';
import { UserdataService } from './userdata.service';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  usuario: string = '';

  constructor(
    private userdata: UserdataService,
  ) { }

  session: Session = {
    active: false,
    email: "",
    username: "",
    avatar: "",
    gender: "",
    pkmntype1: "",
    pkmntype2: "",
    hphouse: ""
  }

  updateSession(email: string){
    this.userdata.getSingleUserdata(email)
    .then((user) => {
      this.session.active = true;
      this.session.email = user.email;
      this.session.username = user.username;
      this.session.avatar = user.avatar ? user.avatar : 'mewtwo' ;
      this.session.gender = user.gender;
      this.session.pkmntype1 = user.pkmntype1;
      this.session.pkmntype2 = user.pkmntype2;
      this.session.hphouse = user.hphouse;
    });
  }

  closeSession(){
    this.session.active = false;
    this.session.email = "";
    this.session.username = "";
    this.session.avatar = "";
    this.session.gender = "";
    this.session.pkmntype1 = "";
    this.session.pkmntype2 = "";
    this.session.hphouse = "";
  }
}
