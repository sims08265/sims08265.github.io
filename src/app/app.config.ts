import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Réutilise le HTML pré-rendu au lieu de le reconstruire au démarrage.
    provideClientHydration(withEventReplay()),
  ]
};
