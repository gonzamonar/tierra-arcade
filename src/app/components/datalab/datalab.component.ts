import { Component } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { Userdata } from '../../interfaces/userdata';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-datalab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './datalab.component.html',
  styleUrl: './datalab.component.css'
})
export class DatalabComponent {

  constructor(
    public userdata: UserdataService,
  ) { }

}
