import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { SessionService } from '../../services/session.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { browserLocalPersistence, getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';

@Component({
  selector: 'app-login-loginview',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './login-loginview.component.html',
  styleUrl: './login-loginview.component.css'
})

export class LoginLoginviewComponent {
  ASSETS_DIR: string = '../assets/images/login-form';
  userMail: string = "";
  userPwd: string = "";
  accessError: boolean = false;

  isRememberChecked!: boolean;
  simbaOpacity: number = 0;

  constructor(
    public auth: Auth, 
    private firestore: Firestore, 
    public session: SessionService, 
    private router: Router
  ) {  }
  
  LoginAuth() {
    this.accessError = false;
    let persistence = this.isRememberChecked ? browserLocalPersistence : inMemoryPersistence ;

    setPersistence(this.auth, persistence)
    .then(() =>
      signInWithEmailAndPassword(this.auth, this.userMail, this.userPwd)
      .then(
        (response) => {
          let col = collection(this.firestore, 'logins');
          addDoc(col, {fecha: new Date(), 'user': response.user.email});
          console.log(this.auth.currentUser);
          
          this.session.updateSession(response.user.email!);
          this.router.navigate(['/home']);
        }
      ).catch((e) => {
        this.accessError = true;
      })
    )
    .catch((error) => {
      console.error('Error setting session persistence:', error);
    });
  }


  quickAccess(user: string, pwd: string){
    this.userMail = user;
    this.userPwd = pwd;
  }
}
