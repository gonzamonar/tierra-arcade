import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SolomonskeyComponent } from './solomonskey/solomonskey.component';
import { DatalabComponent } from './datalab/datalab.component';
import { GameAhorcadoComponent } from './game-ahorcado/game-ahorcado.component';
import { GameMayorMenorComponent } from './game-mayor-menor/game-mayor-menor.component';
import { LogsComponent } from './logs/logs.component';

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
    }
  ];
