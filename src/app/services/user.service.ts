import { Injectable } from '@angular/core';
// import { ngxLoadingAnimationTypes } from 'ngx-loading';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  public config = {
    primaryColour: PrimaryWhite,
    secondaryColour: SecondaryGrey,
    tertiaryColour: PrimaryWhite,
    backdropBorderRadius: '3px',
  };

  public months = ['Jan','Feb','Mar','Apr', 'May','Jun','Jul', 'Aug','Sep','Oct','Nov','Dec'];

  public days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  kelvinToCelsius(kelvin: any) {
    // Formula to convert Kelvin to Celsius: Celsius = Kelvin - 273.15
    var celsius = kelvin - 273.15;
    // Rounding to two decimal places
    celsius = Math.round(celsius);
    return celsius;
  }

  convertToTimezone(gmtDate: any, offset: any) {
    var parts = gmtDate.split(/[\s,]+/);
    var day = parseInt(parts[1]);
    var month = parts[2];
    var year = parseInt(parts[3]);
    var time = parts[4].split(':');
    var hour = parseInt(time[0]);
    var minute = parseInt(time[1]);
    var second = parseInt(time[2]);

    var monthIndex = this.months.indexOf(month);
    var date = new Date(Date.UTC(year, monthIndex, day, hour, minute, second));
    var offsetMillis = offset * 1000;
    date.setTime(date.getTime() + offsetMillis);

    var dayOfWeek = this.days[date.getUTCDay()];
    var ampm = 'AM';
    var hour12 = date.getUTCHours();
    if (hour12 >= 12) {
      ampm = 'PM';
      if (hour12 > 12) {
        hour12 -= 12;
      }
    }
    if (hour12 == 0) {
      hour12 = 12;
    }
    var formattedDate =
      day +
      ' ' +
      month +
      ', ' +
      dayOfWeek +
      ', ' +
      hour12 +
      ':' +
      (date.getUTCMinutes() < 10 ? '0' : '') +
      date.getUTCMinutes() +
      ' ' +
      ampm;

    return formattedDate;
  }

  convertToGMT(epoch: number) {
    var date = new Date(epoch * 1000);
    var gmtDate = date.toUTCString();
    return gmtDate;
  }

  timezoneOffsetToUTC(offset: number) {
    var hours = Math.floor(Math.abs(offset) / 3600);
    var minutes = Math.floor((Math.abs(offset) % 3600) / 60);

    var sign = offset < 0 ? '-' : '+';

    var utcString =
      'UTC ' + sign + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

    return utcString;
  }

  convertToKmPerHour(metersPerSecond: number) {
    let windSpeed = metersPerSecond * 3.6
    return windSpeed.toFixed(2);
  }
}
