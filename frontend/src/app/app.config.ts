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
import { timerReducer } from './components/timer/store/timer.reducer';
import { TimerEffects } from './components/timer/store/timer.effects';
import { sessionReducer } from './components/session/store/session.reducers';
import { SessionEffects } from './components/session/store/session.effect';
import { statisticsReducer } from './pages/statistics/store/statistics.reducer';
import { StatisticsEffects } from './pages/statistics/store/statistics.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(FormsModule),
    provideStore({ auth: authReducer, tags: tagsReducer, messages:messagesReducer, timer:timerReducer, session:sessionReducer, statistics:statisticsReducer }),
    provideEffects([AuthEffects, TagsEffects, MessagesEffects, TimerEffects, SessionEffects, StatisticsEffects]), //DODATI KAD IZ KOMPONENTE DISPATCHUJEM!!!
    provideStoreDevtools(),
  ],
};
