import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarCardComponent } from '../avatar-card/avatar-card.component';
import { CroupierService } from '../../services/croupier.service';

@Component({
  selector: 'app-avatar-selector',
  standalone: true,
  imports: [
    CommonModule,
    AvatarCardComponent
  ],
  templateUrl: './avatar-selector.component.html',
  styleUrl: './avatar-selector.component.css'
})

export class AvatarSelectorComponent {
  ASSETS_DIR: string = '../../assets/images/profile/avatar';

  avatarList: any[] = [];
  @Output() avatarViewEvent = new EventEmitter<boolean>();
  @Output() avatarSrcEvent = new EventEmitter<string>();

  switchView(avatarSrc: string) {
    this.avatarViewEvent.emit(false);
    this.avatarSrcEvent.emit(avatarSrc);
  }

  constructor (
    private croupier: CroupierService
  ) {
    this.fetchJSONData();
  }

  fetchJSONData() {
    fetch("../../assets/json/avatarList.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
          this.avatarList = data;
          this.croupier.shuffle(this.avatarList);
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
  }
}
