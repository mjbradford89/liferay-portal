import { Component, OnInit, Inject } from '../node_modules/@angular/core';
import { Router, ROUTER_DIRECTIVES } from '../node_modules/@angular/router';
import { Country } from './country';
import { CountryDetailComponent } from './country-detail.component';
import { CountryService } from './country.service';

@Component({
	selector: 'my-app',

	styles: [`
		h1 {
	color:#545454;
	background:#02A8F4;
	padding:15px;
	box-shadow:2px 2px 2px 0 rgba(0, 0, 0, 0.3);
	}
	`],

	template: `
	<h1>{{title}}</h1>

	<div class="form-group">
		<label>{{label}}</label>
		<select class="countries form-control" (change)="onChange($event.target.value)">
		  <option [value]="country.countryId" *ngFor="let country of countries"  [selected]="country.countryId == 19">
			{{country.name}}
		  </option>
		</select>
	</div>

	<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES, CountryDetailComponent],
	providers: [CountryService]
})

export class AppComponent {
	componentName: 'AppComponent';
	title = 'This is an Angular Portlet inside Liferay Portal 7!';
	label = 'Select a country to get more information about it.'
	countries: Country[];

	constructor(@Inject(Router)private router: Router, @Inject(CountryService) private countryService: CountryService) { }

	getCountries() {
		this.countryService.getCountries().then((countries) => {
			this.countries = countries;
			this.router.navigate(['/country', 19]); //start on united states
		});
	}

	ngOnInit() {
		this.getCountries();
	}

	onChange(countryId:number) {
		this.router.navigate(['/country', countryId]);
	}
}