import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './avatar-card.component.html',
  styleUrl: './avatar-card.component.css'
})

export class AvatarCardComponent {
  @Input() avatarName: string = '';
  @Input() avatarSrc: string = 'mewtwo';
  @Input() type1: string = '';
  @Input() type2: string = '';
}
