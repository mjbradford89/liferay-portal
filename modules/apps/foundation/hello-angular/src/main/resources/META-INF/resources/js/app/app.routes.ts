import { provideRouter, RouterConfig } from '../node_modules/@angular/router';
import { CountryDetailComponent } from './country-detail.component';
import { AppComponent } from './app.component';

// Route Configuration
export const routes: RouterConfig = [
  { path: '', component: AppComponent },
  { path: 'country', component: CountryDetailComponent },
  { path: 'country/:id', component: CountryDetailComponent },
  { path: '**', redirectTo: '' }
];

// Export routes
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes, {enableTracing: true})
];