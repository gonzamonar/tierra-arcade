import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Tierra Arcade'
    },
    {
      path: 'home',
      component: HomeComponent,
      title: 'Tierra Arcade - Login'
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Tierra Arcade - Login'
    },
    {
      path: 'about',
      component: AboutComponent,
      title: 'Tierra Arcade'
    }
  ];
