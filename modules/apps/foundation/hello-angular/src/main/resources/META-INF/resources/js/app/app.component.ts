import { Component, OnInit, Inject } from '../node_modules/@angular/core';
//import { ROUTER_DIRECTIVES } from '../node_modules/@angular/router';
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
		<select class="countries form-control" (change)="onChange($event.target.value)">
		  <option [value]="country.countryId" *ngFor="let country of countries">
			{{country.name}}
		  </option>
		</select>
	</div>

	<country-content [country]="selectedCountry"></country-content>
	`,
	directives: [CountryDetailComponent],
	providers: [CountryService]
})

export class AppComponent {
	componentName: 'AppComponent';
	title = 'Hello Angular!';
	countries: Country[];
	selectedCountry: Country;

	constructor(@Inject(CountryService) private countryService: CountryService) { }

	getCountries() {
		this.countryService.getCountries().then(countries => this.countries = countries);
	}

	ngOnInit() {
		this.getCountries();
	}

	onChange(countryId:number) {
		this.selectedCountry = this.getCountryById(countryId);
	}

	getCountryById(countryId:number):Country {
		for (var i =0; i < this.countries.length; i++) {
			var c = this.countries[i];
			if (c.countryId == countryId) {
				return c;
			}
		}
	}

}