import { provideRouter, RouterConfig } from '../node_modules/@angular/router';
import { CountryDetailComponent } from './country-detail.component';
import { AppComponent } from './app.component';

// Route Configuration
export const routes: RouterConfig = [
  { path: '-/angular/country', component: CountryDetailComponent },
  { path: '-/angular/country/:id', component: CountryDetailComponent },
  { path: '', redirectTo: '-/angular/country', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

// Export routes
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes, {enableTracing: true})
];