import { platformBrowser, BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerFeature } from './app/shared/logic-router-state';
import { UiCoreModule } from './app/shared/ui-core/ui-core.module';
import { SharedModule } from './app/shared/shared.module';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, AppRoutingModule, HttpClientModule, StoreModule.forRoot(), EffectsModule.forRoot(), StoreModule.forFeature(routerFeature), UiCoreModule, SharedModule)]
})
  .catch(err => console.error(err));
