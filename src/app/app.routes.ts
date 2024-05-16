import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SolomonskeyComponent } from './components/solomonskey/solomonskey.component';
import { DatalabComponent } from './components/datalab/datalab.component';
import { GameAhorcadoComponent } from './components/game-ahorcado/game-ahorcado.component';
import { GameMayorMenorComponent } from './components/game-mayor-menor/game-mayor-menor.component';
import { LogsComponent } from './components/logs/logs.component';
import { AvatarSelectorComponent } from './components/avatar-selector/avatar-selector.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';

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
    },
    {
      path: 'solomon',
      component: SolomonskeyComponent,
      title: 'Tierra Arcade'
    },
    {
      path: 'data/datalab',
      component: DatalabComponent,
      title: 'Tierra Arcade'
    },
    {
      path: 'data/logs',
      component: LogsComponent,
      title: 'Tierra Arcade'
    },
    {
      path: 'juegos/ahorcado',
      component: GameAhorcadoComponent,
      title: 'Tierra Arcade'
    },
    {
      path: 'juegos/mayormenor',
      component: GameMayorMenorComponent,
      title: 'Tierra Arcade'
    },
    {
      path: 'chat',
      component: ChatroomComponent,
      title: 'Tierra Arcade'
    }
  ];
