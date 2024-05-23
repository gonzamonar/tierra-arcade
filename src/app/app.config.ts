import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(
        {"projectId":"tierra-arcade",
        "appId":"1:58622513807:web:442e86a721c6243e5616fa",
        "storageBucket":"tierra-arcade.appspot.com",
        "apiKey":"AIzaSyD4CaCEgI2znujU60TUIuxNJLQZAwGYBUA",
        "authDomain":"tierra-arcade.firebaseapp.com",
        "messagingSenderId":"58622513807"}
      ))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(HttpClientModule)
    ]
};
