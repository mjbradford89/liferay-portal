import { ActivatedRoute } from '@angular/router';
import { Component, Inject, Input, OnInit } from '../node_modules/@angular/core';
import { Country } from './country';
import { LocationService } from './location.service';

@Component({
	selector: 'country-content',
	template: `
		<div *ngIf="country">
		  <h2>{{country.name}} details!</h2>
		  <div><label>id: </label>{{country.countryId}}</div>
		  <div>
			<label>name: </label>
			<input [(ngModel)]="country.name" placeholder="name"/>
		  </div>
		</div>
	`
})

export class CountryDetailComponent implements OnInit {
	@Input()
	country: Country;
	sub: any;

	constructor(@Inject(ActivatedRoute)private route: ActivatedRoute, @Inject(LocationService) private locationService: LocationService) { }

	ngOnInit() {
	  this.sub = this.route.params.subscribe(params => {
	    let id = +params['id'];
	    if (id) {
	    	this.country = this.locationService.getCountryById(id);
	    }
	  });
	}

}