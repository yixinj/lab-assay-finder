import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  displayedColumns: string[] = ['id', 'institution_name', 'clone_name'];
  dataSource: MatTableDataSource<MoleculeFull>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  molecule_name: string; // id of antibody
  molecules: MoleculeFull[]; // The actual antibody info

  constructor(
    private dataService: DataService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getMolecules();
  }

  setUpTable(): void {
    // Assign the data to the data source for the table
    this.dataSource = new MatTableDataSource(this.molecules);
    // Table stuff
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getMolecules(): void {
    this.molecule_name = this.route.snapshot.paramMap.get('molecule_name');
    this.sendInfo();
  }

  goBack(): void {
    this.location.back();
  }

  // Sends out currentId to the database to retrieve new info with POST
  sendInfo(): void {
    console.log('Retrieving all entities with molecule_name: ' + this.molecule_name);

    const posted = { molecule_name: this.molecule_name };
    // POST TO SERVER
    // TODO: migrate this to DataService
    this.dataService.postJSON(posted).subscribe(
      res => {
        // Stores results
        this.molecules = res as MoleculeFull[]; // OKAY this is completed and gives an AntibodyFull
        console.log('RESULT: ', this.molecules);
        // Sets up the table
        this.setUpTable();
      }
    );
  }

  // Stuff for the filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
