import { Component, Inject, Input, OnInit, SimpleChange } from '../node_modules/@angular/core';
import { Country } from './country';
import { LocationService } from './location.service';
import { RegionDetailComponent } from './region-detail.component';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '../node_modules/@angular/router';

@Component({
	selector: 'location-content',
	templateUrl: '/o/angular-portlet/templates/country-detail.component.html',
	directives: [ROUTER_DIRECTIVES, RegionDetailComponent]
})

export class CountryDetailComponent implements OnInit {
	country: Country;
	sub: any;

	constructor(
		@Inject(Router)private router: Router,
		@Inject(ActivatedRoute)private route: ActivatedRoute,
		@Inject(LocationService) private locationService: LocationService) { }

	ngOnInit() {
		this.locationService.getCountries().then(() => {
		  this.sub = this.route.params.subscribe(params => {
		    let countryId = +params['countryId'];
		    if (countryId) {
		    	this.country = this.locationService.getCountry(countryId);
		    }
		  });
		});
	}

	onChange(regionId:number) {
		this.router.navigate(['-/angular/country', this.country.countryId, regionId]);
	}
}