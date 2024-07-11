import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://api.openweathermap.org/';
  private apiKey: string = '2e24cb6e1a47ce6c79c7689f3a754bf6';
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getData(st:any,contry:any) {
    const url = `${this.baseUrl}geo/1.0/direct?q=${st},${contry}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getweatherData(lat:any,lon:any){
    this.http.get<any>(`${this.baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`).subscribe(
      (data) => {
        this.dataSubject.next(data); // Emit the fetched data
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

}
