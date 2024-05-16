import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy } from 'firebase/firestore';
import { SessionService } from './session.service';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  
  constructor(
    private firestore: Firestore,
    private session: SessionService
  ) {
    this.getAllMessages();
  }

  public messageCollection: any[] = [];
  
  pushNewMessage(message: string){
    if (this.session.session.active){
      let userDataCollection = collection(this.firestore, 'messenger');
      
      addDoc(userDataCollection, {
        'user': this.session.session.username,
        'message': message,
        'timestamp': new Date(),
      });
    } else {
      Swal.fire({
        title: "Acceso no autorizado",
        text: "Sólo usuarios autenticados pueden enviar mensajes: debes iniciar sesión para usar el chat.",
        icon: "error"
      });
    }
  }
  
  private getAllMessages(){
    let col = collection(this.firestore, 'messenger');
    const sortedQuery = query(
      col,
      orderBy('timestamp', 'asc')
    );
    const observable = collectionData(sortedQuery);

    observable.subscribe((response) => {
      this.messageCollection = response;
    });
  }
}
