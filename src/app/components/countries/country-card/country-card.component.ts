import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../../_models/country.model';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent implements OnInit {
  @Input() country!: Country;
  showDetails: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onShowDetails() {
    this.showDetails = !this.showDetails;
  }
}
