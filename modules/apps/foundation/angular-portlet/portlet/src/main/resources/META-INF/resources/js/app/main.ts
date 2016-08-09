///<reference path="../../../../../../../node_modules/typescript/lib/lib.es6.d.ts"/> 
import { bootstrap } from '../node_modules/@angular/platform-browser-dynamic';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';
import { provide } from '@angular/core';

export function main(Liferay:any, A:any, baseRenderUrl:String) {
	bootstrap(AppComponent, [
		provide('Liferay', {useValue: Liferay}),
		provide('baseRenderUrl', {useValue: baseRenderUrl}),
		provide('A', {useValue: A}),
		APP_ROUTER_PROVIDERS
	]);
}