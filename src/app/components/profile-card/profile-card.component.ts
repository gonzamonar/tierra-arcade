import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AvatarCardComponent } from '../avatar-card/avatar-card.component';


@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [AvatarCardComponent],
  templateUrl: './profile-card.component.html'
})

export class ProfileCardComponent {

  constructor(public session: SessionService) { }
}
