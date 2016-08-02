///<reference path="../../../../../../../node_modules/typescript/lib/lib.es6.d.ts"/> 
import { bootstrap } from '../node_modules/@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { provide } from '@angular/core';

//import { APP_ROUTER_PROVIDERS } from './app.routes';

// bootstrap(AppComponent, [
// 	APP_ROUTER_PROVIDERS
// ]);

export function main(Liferay:any) {
	bootstrap(AppComponent, [
		provide('Liferay', {useValue: Liferay})
	]);
}