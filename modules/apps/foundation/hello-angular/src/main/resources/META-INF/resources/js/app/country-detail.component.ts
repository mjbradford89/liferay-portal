import { Component, Input } from '../node_modules/@angular/core';
import { Country } from './country';

@Component({
	selector: 'country-content',
	template: `
		<div *ngIf="country">
		  <h2>{{country.name}} details!</h2>
		  <div><label>id: </label>{{country.countryId}}</div>
		  <div>
			<label>name: </label>
			<input [(ngModel)]="country.name" placeholder="name"/>
		  </div>
		</div>
	`
})

export class CountryDetailComponent {
	@Input()
	country: Country;
}