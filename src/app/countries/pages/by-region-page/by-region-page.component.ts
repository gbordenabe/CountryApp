import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public selectedRegion?: Region | '';
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term: Region) {
    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService.searchRegion(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
