import { Injectable, Inject } from '@angular/core';
import { Country } from './country';

@Injectable()
export class CountryService {
	constructor(@Inject('Liferay') private Liferay: any) {
	}

	getCountries() {
		return new Promise<Country[]>((resolve) => {
			this.Liferay.Service(
				'/country/get-countries',
				{
					active: true
				},
				function(response:any) {
					resolve(response);
				}
			);
		});
	}
}