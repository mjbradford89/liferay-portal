import { ActivatedRoute, ROUTER_DIRECTIVES } from '../node_modules/@angular/router';
import { Component, Inject, Input, OnInit } from '../node_modules/@angular/core';
import { LocationService } from './location.service';
import { Country } from './country';
import { Region } from './region';

@Component({
	selector: 'location-content',
	templateUrl: '/o/angular-portlet/templates/region-detail.component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class RegionDetailComponent implements OnInit {
	@Input() region: Region;
	country: Country;
	sub: any;

	constructor(
		@Inject(ActivatedRoute)private route: ActivatedRoute,
		@Inject(LocationService) private locationService: LocationService) { }

	ngOnInit() {
		this.locationService.getCountries().then(() => {
			this.sub = this.route.params.subscribe(params => {
				let countryId = +params['countryId'];
				if (countryId) {
					this.locationService.getRegions(countryId).then(() => {
						let regionId = +params['regionId'];
						if (regionId) {
							this.country = this.locationService.getCountry(countryId);
							this.region = this.locationService.getRegion(countryId, regionId);
						}
					});
				}
			});
		});
	}
}