import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginLoginviewComponent } from '../login-loginview/login-loginview.component';
import { LoginRegisterviewComponent } from '../login-registerview/login-registerview.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LoginLoginviewComponent,
    LoginRegisterviewComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginViewIsActive: boolean = true;
}
