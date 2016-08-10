import { Region } from './region';

export class Country {
	countryId: number;
	name: string;
	a3: string;
	regions: Region[];

	constructor(config:any) {
		this.countryId = config.countryId;
		this.name = config.name;
		this.a3 = config.a3;
	}
}