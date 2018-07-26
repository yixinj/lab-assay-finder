import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../data.service';
import { SettingsService } from '../settings.service';
import { MoleculeFull } from '../molecule-full';
import { concat } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  id: number; // id of antibody
  molecule: MoleculeFull; // The actual antibody info

  constructor(
    private dataService: DataService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getMolecule();
  }

  getMolecule(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.sendInfo();
  }

  goBack(): void {
    this.location.back();
  }

  // Sends out currentId to the database to retrieve new info
  sendInfo(): void {
    console.log('Sending info ...' + this.id);


    const posted = { id: this.id };
    // POST TO SERVER
    this.http.post<any>(
      'http://molecules.immunohub.net/get_molecule_info.php',
      posted,
    ).subscribe(
      res => {
        this.molecule = res as MoleculeFull; // OKAY this is completed and gives an AntibodyFull
        console.log('RESULT: ', this.molecule);
      }
    );
  }
}
