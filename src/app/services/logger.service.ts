import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, orderBy, query } from 'firebase/firestore';

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
    const sortedQuery = query(
      col,
      orderBy('fecha', 'desc')
    );

    const observable = collectionData(sortedQuery);

    observable.subscribe((response) => {
      this.logdataCollection = response;
    });
  }
}
