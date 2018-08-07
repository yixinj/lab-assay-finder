import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../data.service';
import { SettingsService } from '../settings.service';
import { MoleculeFull } from '../molecule-full';
import { concat } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'molName',
    'labName',
    'labLoc',
    'labTestName',
    'labClone',
    'labComment',
    'labLink',
    'molSynonym'
  ];
  dataSource: MatTableDataSource<MoleculeFull>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  molName: string; // id of antibody
  molList: MoleculeFull[]; // The actual antibody info

  getMolecules(): void {
    this.molName = this.route.snapshot.paramMap.get('molName');
    console.log(this.molName);
    this.sendInfo();
  }

  goBack(): void {
    this.location.back();
  }

  // Sends out currentId to the database to retrieve new info with POST
  sendInfo(): void {
    console.log('Retrieving all entities with molecule_name: ' + this.molName);

    const posted = { molName: this.molName };
    // POST TO SERVER
    // TODO: migrate this to DataService
    this.dataService.postJSON(posted).subscribe(res => {
      // Stores results
      this.molList = res as MoleculeFull[]; // OKAY this is completed and gives an AntibodyFull
      console.log('RESULT: ', this.molList);
      // Sets up the table
      this.setUpTable();
    });
  }

  // Stuff for the filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setUpTable(): void {
    // Assign the data to the data source for the table
    this.dataSource = new MatTableDataSource(this.molList);
    // Table stuff
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private dataService: DataService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getMolecules();
  }
}
