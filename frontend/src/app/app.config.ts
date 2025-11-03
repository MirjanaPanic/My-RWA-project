import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptor } from './features/auth/interceptors/auth.interceptor';
import { provideStore, StoreModule } from '@ngrx/store';
import { authReducer } from './features/auth/store/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './features/auth/store/auth.effects';
import { tagsReducer } from './pages/settings/store/tags/tags.reducer';
import { TagsEffects } from './pages/settings/store/tags/tags.effects';
import { messagesReducer } from './pages/settings/store/messages/messages.reducer';
import { MessagesEffects } from './pages/settings/store/messages/messages.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(FormsModule),
    provideStore({ auth: authReducer, tags: tagsReducer, messages:messagesReducer }),
    provideEffects([AuthEffects, TagsEffects, MessagesEffects]), //DODATI KAD IZ KOMPONENTE DISPATCHUJEM!!!
    provideStoreDevtools(),
  ],
};
