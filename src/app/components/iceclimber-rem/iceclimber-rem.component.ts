import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iceclimber-rem',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './iceclimber-rem.component.html',
  styleUrl: './iceclimber-rem.component.css'
})
export class IceclimberRemComponent {
  @Input() color: string = "#5fbc2c";
  @Input() black: string = "#000000";
  @Input() face: string = "#ff7760";
  @Input() faceshade: string = "#cf6958";
}
