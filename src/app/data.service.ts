import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { MoleculeFull } from './molecule-full';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Selected antibody
  currentMolecule: string;
  currentAntibody: MoleculeFull;

  constructor(private http: HttpClient) {
    // this.loadData();
  }

  // Function to set the current antibody's id
  public setMolecule(x: string): void {
    this.currentMolecule = x;
  }

  // Function to get the current antibody's id
  public getMolecule(): string {
    return this.currentMolecule;
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://molecules.immunohub.net/get_molecule_list.php')
      .pipe(map((res: any) => res));
    // return this.http.get('http://antibodies.immunohub.net/get.php');
  }

  public postJSON(posted): Observable<any> {
    return this.http.post<any>(
      'http://molecules.immunohub.net/get_molecule_info.php', posted);
  }

}
