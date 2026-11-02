import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { RenderMode, ServerRoute, provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';

/** Une seule page, pré-rendue au build. */
const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];

export const config = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
});
