import { Component, Input } from '../node_modules/@angular/core';
import { Region } from './region';

@Component({
	selector: 'region',
	template: `
	`
})

export class RegionDetailComponent {
	@Input()
	region: Region
}