import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private firestore: Firestore) {
    this.getLogs();
  }
  
  public logdataCollection: any[] = [];

  private getLogs(){
    let col = collection(this.firestore, 'logins');
    const observable = collectionData(col);

    observable.subscribe((response) => {
      this.logdataCollection = response;
    });
  }
}
