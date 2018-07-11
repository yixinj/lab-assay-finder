import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Selected antibody
  currentId: number;

  constructor(private http: HttpClient) {
    // this.loadData();
  }

  // Function to set the current antibody's id
  public setId(x: number): void {
    this.currentId = x;
  }

  // Function to get the current antibody's id
  public getId(): number {
    return this.currentId;
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://antibodies.immunohub.net/get_list.php')
      .pipe(map((res: any) => res));
    // return this.http.get('http://antibodies.immunohub.net/get.php');
  }

  // public loadData() {
  //   this.getJSON().subscribe(
  //     data => {
  //       console.log('Getting data ...');
  //       console.log(data);
  //       console.log('Data obtained.');
  //     },
  //     error => console.log(error));
  // }

  // Sends out currentId to the database to retrieve new info
  public sendInfo(): void {

  }
}
