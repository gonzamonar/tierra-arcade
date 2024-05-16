import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, getDocs, limit, query, where } from 'firebase/firestore';
import { Userdata } from '../interfaces/userdata';

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
      'avatar': userdata.avatar ? userdata.avatar : 'mewtwo',
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


  async getSingleUserdata(email: string) : Promise<Userdata> {
    let userdata: Userdata = {
      email: '',
      username: '',
      avatar: '',
      gender: '',
      pkmntype1: '',
      pkmntype2: '',
      hphouse: '',
    };

    let col = collection(this.firestore, 'userdata');
    const emailQuery = query(
      col, 
      where("email", "==", email), 
      limit(1),
    );

    const querySnapshot = await getDocs(emailQuery);
    querySnapshot.forEach((doc) => {
      userdata.email = doc.data()['email'];
      userdata.username = doc.data()['username'];
      userdata.avatar = doc.data()['avatar'] ? doc.data()['avatar'] : 'mewtwo' ;
      userdata.gender = doc.data()['gender'];
      userdata.pkmntype1 = doc.data()['pkmntype1'];
      userdata.pkmntype2 = doc.data()['pkmntype2'];
      userdata.hphouse = doc.data()['hphouse'];
    });
    
    return userdata;
  }
}
