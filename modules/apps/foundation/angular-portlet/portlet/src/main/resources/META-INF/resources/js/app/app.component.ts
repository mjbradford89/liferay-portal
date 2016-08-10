import { Component, Inject } from '../node_modules/@angular/core';
import { Router, ROUTER_DIRECTIVES } from '../node_modules/@angular/router';
import { Country } from './country';
import { CountryDetailComponent } from './country-detail.component';
import { LocationService } from './location.service';

@Component({
	selector: 'my-app',
	styleUrls: [`/o/angular-portlet/styles/app.component.css`],
	templateUrl: '/o/angular-portlet/templates/app.component.html',
	directives: [ROUTER_DIRECTIVES, CountryDetailComponent],
	providers: [LocationService]
})

export class AppComponent {
	componentName: 'AppComponent';
	title = 'This is an Angular Portlet inside Liferay Portal 7!';
	label = 'Select a country to get more information about it.';
	countries: Country[];

	constructor(
		@Inject(Router)private router: Router,
		@Inject(LocationService) private locationService: LocationService,
		@Inject('Liferay') private Liferay: any) {
		this.getCountries();
	}

	getCountries() {
		this.locationService.getCountries().then((countries) => {
			this.countries = countries;
		});
	}

	onChange(countryId:number) {
		this.locationService.getRegions(countryId).then(() => {
			this.router.navigate(['-/angular/country', countryId]);
		});
	}
}