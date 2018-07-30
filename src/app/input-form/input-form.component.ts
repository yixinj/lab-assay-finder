import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DataService } from '../data.service';

import { Molecule } from '../molecule';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})

export class InputFormComponent implements OnInit {
  loading = false;
  // Filter stuff
  moleculeCtrl = new FormControl();
  filteredMolecules: Observable<Molecule[]>;
  currentMolecule;

  // Empty molecules list for now
  molecules: Molecule[] = [];

  onChange(selectedMolecule: string, evt: any) {
    // I HAVE NO IDEA WHAT evt does but it works lol (corresponds to $event)
    if (evt.source.selected) {
      console.log('something changed!');
      this.currentMolecule = selectedMolecule;
      this.dataService.setMolecule(selectedMolecule);
      console.log('the new selected molecule is ' + this.dataService.getMolecule());
    }
  }

  onSubmit() {
    // The work is all done in the TEMPLATE.
    console.log('Submit pressed.');
    // this.dataService.sendInfo();
  }

  load() {  // Loads data for molecules
    this.dataService.getJSON().subscribe(data => {
      console.log('Loading molecules list ...');
      this.loading = true;

      this.molecules = data as Molecule[]; // Stores as Molecules
      console.log(this.molecules);
      this.initFilter();
      this.loading = false;
    },
      error => console.log(error));
  }

  // Initializes autocomplete filter. Used to be in constructor.
  initFilter() {
    this.filteredMolecules = this.moleculeCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.molecules.slice())
      );
  }

  constructor(private dataService: DataService) {
  }


  // On init, loads module.
  ngOnInit() {
    this.load();
  }

  // FILTER STUFF
  private _filterStates(value: string): Molecule[] {
    const filterValue = value.toLowerCase();
    return this.molecules.filter(state => state.molecule_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
