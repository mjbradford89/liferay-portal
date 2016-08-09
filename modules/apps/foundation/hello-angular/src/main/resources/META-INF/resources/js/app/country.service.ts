import { Injectable, Inject } from '@angular/core';
import { Country } from './country';

@Injectable()
export class CountryService {
	countryCache:Country[];

	constructor(@Inject('Liferay') private Liferay: any) {
	}

	getCountries() {
		var instance = this;
		return new Promise<Country[]>((resolve) => {
			this.Liferay.Service(
				'/country/get-countries',
				{
					active: true
				},
				function(response:any) {
					instance.countryCache = response;
					resolve(instance.countryCache);
				}
			);
		});
	}

	getCountryById(countryId:number):Country {
		for (var i =0; i < this.countryCache.length; i++) {
			var c = this.countryCache[i];
			if (c.countryId == countryId) {
				return c;
			}
		}
	}
}