import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { APP_ROUTES } from "./app.routes";
import { routerFeature } from "./shared/logic-router-state";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature),
    )
  ]
};