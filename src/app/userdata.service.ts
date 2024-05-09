import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Userdata } from './userdata';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(
    private firestore: Firestore
  ) {
    this.getUserdata();
  }

  public userdataCollection: any[] = [];


  pushUserdata(userdata: Userdata){
    let userDataCollection = collection(this.firestore, 'userdata');
    
    addDoc(userDataCollection, {
      'email': userdata.email,
      'username': userdata.username,
      'gender': userdata.gender,
      'pkmntype1': userdata.pkmntype1,
      'pkmntype2': userdata.pkmntype2,
      'hphouse': userdata.hphouse
    });
  }

  
  private getUserdata(){
    let col = collection(this.firestore, 'userdata');
    const observable = collectionData(col);

    observable.subscribe((response) => {
      this.userdataCollection = response;
    });
  }


  getSingleUserdata(email: string) : Userdata {
    let userdata: Userdata = {
      email: '',
      username: '',
      avatar: '',
      gender: '',
      pkmntype1: '',
      pkmntype2: '',
      hphouse: '',
    };

    let user: Userdata;
    user = this.userdataCollection.find(data => data.email == email);

    if (user != undefined){
      userdata.email = user.email;
      userdata.username = user.username;
      userdata.avatar = user.avatar ? user.avatar : 'mewtwo' ;
      userdata.gender = user.gender;
      userdata.pkmntype1 = user.pkmntype1;
      userdata.pkmntype2 = user.pkmntype2;
      userdata.hphouse = user.hphouse;
    }

    return userdata;
  }
}
