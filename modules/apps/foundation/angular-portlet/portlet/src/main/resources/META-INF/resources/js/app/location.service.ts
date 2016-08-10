import { Injectable, Inject } from '@angular/core';
import { Country } from './country';
import { Region } from './region';

@Injectable()
export class LocationService {
	cache:Country[];

	constructor(@Inject('Liferay') private Liferay: any) { }

	getCountries() {
		var instance = this;
		return new Promise<Country[]>((resolve) => {
			if (!instance.cache) {
				this.Liferay.Service(
					'/country/get-countries',
					{
						active: true
					},
					function(response:any) {
						instance.cache = response;
						resolve(instance.cache);
					}
				);
			}
			else {
				resolve(instance.cache);
			}
		});
	}

	getRegions(countryId:number) {
		var instance = this;
		var country = this.getCountry(countryId);

		return new Promise<Region[]>((resolve) => {
			if (!country.regions) {
				this.Liferay.Service(
					'/region/get-regions',
					{
						active: true,
						countryId: countryId
					},
					function(response:any) {
						country.regions = response;
						resolve(country.regions);
					}
				);
			}
			else {
				resolve(country.regions);
			}
		});
	}

	getCountry(countryId:number):Country {
		if (!this.cache) {
			return null;
		}

		for (var i = 0; i < this.cache.length; i++) {
			var c = this.cache[i];
			if (c.countryId == countryId) {
				return c;
			}
		}
	}

	getRegion(countryId:number, regionId:number) {
		var country = this.getCountry(countryId);

		if (!country.regions) {
			return null;
		}

		for (var i = 0; i < country.regions.length; i++) {
			var r = country.regions[i];
			if (r.regionId == regionId) {
				return r;
			}
		}
	}
}