import { Region } from './region';

export class Country {
	countryId: number;
	name: string;
	regions: Region[];

	constructor(config:Country) {
		this.countryId = config.countryId;
		this.name = config.name;
	}
}