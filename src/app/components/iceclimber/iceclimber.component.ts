import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iceclimber',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './iceclimber.component.html',
  styleUrl: './iceclimber.component.css'
})

export class IceclimberComponent {
    @Input() color: string = "#5fbc2c";
    @Input() black: string = "#000000";
    @Input() face: string = "#ff7760";
    @Input() faceshade: string = "#cf6958";
}
