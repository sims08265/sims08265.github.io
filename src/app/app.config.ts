import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Réutilise le HTML pré-rendu ; les sections sous la ligne de flottaison s'activent quand le navigateur est libre.
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
  ]
};
