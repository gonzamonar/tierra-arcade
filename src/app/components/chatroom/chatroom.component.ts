import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { FormsModule } from '@angular/forms';
import { MessengerService } from '../../services/messenger.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProfileCardComponent,
    RouterModule,
    RouterOutlet,
    FontAwesomeModule
  ],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})

export class ChatroomComponent {
  message: string = '';
  scrollHeight: string = '10px';
  icon: IconDefinition = faPaperPlane;

  constructor (
    private messenger: MessengerService,
    public session: SessionService
  ) 
  { }

  getMessages() {
    const container = document.getElementById("chat-container");
    if (container){
      container.scrollTop = container.scrollHeight;
    }
    return this.messenger.messageCollection;
  }

  sendMessage() {
    if (this.message != '') {
      this.messenger.pushNewMessage(this.message);
      this.message = '';
    }
  }
}
