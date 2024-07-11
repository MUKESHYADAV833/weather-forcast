import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Country, State } from 'country-state-city';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {

  public selectedCountry: any;
  public countries: any = [];
  public states: any = [];
  form: FormGroup = this.fb.group({
    country: ['', Validators.required],
    state: [{ value: '' }, this.getStateValidator()],
  });
  data: any;
  public localDate: any = new Date();

  private dataSubscription: Subscription | undefined;

  cordinates: any = { latitude: 0, longitude: 0 };
  JsonData: any;

  constructor(private apiservice: ApiService, private user: UserService, private router: Router, private fb: FormBuilder,) {
    this.getCountryDetails();
    this.data = {
      Country: '',
      'Location Name': '',
      Longitude: '',
      Latitude: '',
      'Weather Condition': '',
      'Detailed Description': '',
      Temperature: '',
      'Feels Like Temperature': '',
      'Minimum Temperature': '',
      'Maximum Temperature': '',
      'Atmospheric Pressure': '',
      Humidity: '',
      Visibility: '',
      'Wind Speed': '',
      'Wind Direction': '',
      Cloudiness: '',
      'Sunrise Time': '',
      'Sunset Time': '',
      'Timezone Offset': '',
    };

  }

  ngOnInit(): void {
    if (this.form.value.country == '') {
      this.form.controls['country'].setValue(101);
      this.form.controls['state'].setValue(34);
      this.getStatesByCountry(101);
      this.submit();
    }
    this.dataSubscription = this.apiservice.data$.subscribe(
      (data) => {
        this.data = data; // Update the component's data when data is emitted
        this.JsonData = data;
        this.localDate = this.user.convertToTimezone(
          this.user.convertToGMT(this.JsonData.dt),
          this.JsonData.timezone
        );
        this.data = {
          Country: data.sys.country,
          'Location Name': data.name,
          Longitude: data.coord.lon,
          Latitude: data.coord.lat,
          'Weather Condition': data.weather[0].main,
          'Detailed Description': data.weather[0].description,
          Temperature: this.user.kelvinToCelsius(data.main.temp) + ' °C',
          'Feels Like Temperature':
            this.user.kelvinToCelsius(data.main.feels_like) + ' °C',
          'Minimum Temperature':
            this.user.kelvinToCelsius(data.main.temp_min) + ' °C',
          'Maximum Temperature':
            this.user.kelvinToCelsius(data.main.temp_max) + ' °C',
          'Atmospheric Pressure': data.main.pressure + ' hPa',
          Humidity: data.main.humidity + ' %',
          Visibility: data.visibility / 1000 + ' Km',
          'Wind Speed': this.user.convertToKmPerHour(data.wind.speed) + ' km/h',
          'Wind Direction': data.wind.deg + '°',
          Cloudiness: data.clouds.all + '°',
          'Sunrise Time': this.user.convertToTimezone(
            this.user.convertToGMT(data.sys.sunrise),
            this.JsonData.timezone
          ),
          'Sunset Time': this.user.convertToTimezone(
            this.user.convertToGMT(data.sys.sunset),
            this.JsonData.timezone
          ),
          'Timezone Offset': this.user.timezoneOffsetToUTC(data.timezone),
        };
      }
    );
  }

  submit() {
    if (this.form.valid) {
      const selectedCountry = this.countries.find(
        (country: any) => country.id == this.form.value['country']
      );
      if (selectedCountry) {
        const selectedState = this.states.find(
          (state: any) => state.id == this.form.value['state']
        );

        if (
          selectedState &&
          selectedState.latitude &&
          selectedState.longitude
        ) {
          console.log(selectedState)
          this.apiservice.getweatherData(selectedState.latitude, selectedState.longitude);
        } else {
          alert("No data found please search something else")
          // this.form.controls['state'].setValue('');
          // this.handleGeocode(selectedCountry);
        }
      }
    } else {
      console.log('Form is not valid!');
    }
  }

  changeState() {
    console.log(this.form.value.country)
    if(this.form.value.country!=''){
    // this.submit()
    }
  }
  handleGeocode(selectedCountry: any) {
    // this.loading = true;
    console.log(selectedCountry,"select")
    this.form.controls['state'].setValue(selectedCountry.id);
    console.log(this.form.value)
    this.apiservice.getData(this.form.value['state'], selectedCountry.name)
      .subscribe(
        (data: any) => {
          console.log(data,"data")
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  getCountryDetails() {
    this.countries = Country.getAllCountries().map((country, index) => ({
      id: index + 1,
      name: country.name,
      countryCode: country.isoCode
    }));
  }


  getStatesByCountry(countryId: number): void {
    const selectedCountry = this.countries.find(
      (country: any) => country.id == countryId
    );
  
    if (selectedCountry) {
      const countryData = State.getStatesOfCountry(selectedCountry.countryCode);
      if (countryData) {
        this.states = countryData.map((state, index) => ({
          id: index + 1,
          name: state.name,
          countryId,
          isoCode: state.isoCode,
          latitude: state.latitude,
          longitude: state.longitude,
        }));
  
        if (this.states.length == 0) {
          this.form.controls['state'].setValue('');
          this
          console.log(this.states,"staets")
        }
  
        this.form?.get('state')?.enable();
        
        // this.submit();
      }
    } else {
      console.error('Country not found');
    }
  }
  

  getStateValidator() {
    return (control: any) => {
      if (this.states.length > 0) {
        return Validators.required(control);
      } else {
        return null;
      }
    };
  }

  changecountry() {
    console.log(this.form.value.country,"cpuntry")
    this.form.controls['state'].setValue('');
    this.states=[]
    this.getStatesByCountry(this.form.value.country);
  }
  

}