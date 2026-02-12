import { computed, EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer, Signal, signal, WritableSignal } from "@angular/core";
import { ConfigState, initialConfigState } from "../model-config/config.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";


export const CONFIG_STATE = new InjectionToken<WritableSignal<ConfigState>>('CONFIG_STATE', {
  providedIn: 'root',
  factory: () => signal(initialConfigState)
});

export function provideConfigState(url: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer((
      configState = inject(CONFIG_STATE),
      http = inject(HttpClient)
    ) => http.get<ConfigState>(url).pipe(
      tap(config => configState.set(config))
    ))
  ]);
}

export function injectUsername(): Signal<string> {
  const state = inject(CONFIG_STATE);

  return computed(() => state().userInfo.username);
}
