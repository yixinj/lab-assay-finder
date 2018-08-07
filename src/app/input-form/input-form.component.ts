import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DataService } from '../data.service';

import { MoleculePreview } from '../molecule-preview';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  moleculeCtrl = new FormControl();
  filteredMolecules: Observable<MoleculePreview[]>;
  currentMolecule;

  // Empty molecules list for now
  moleculesList: MoleculePreview[] = [];

  allPossibleNames: string[] = [];

  formatData(): void {
  }

  onChange(selectedMolecule: string, evt: any) {
    // I HAVE NO IDEA WHAT evt does but it works lol (corresponds to $event)
    if (evt.source.selected) {
      this.currentMolecule = selectedMolecule;
      this.dataService.setMolecule(selectedMolecule);
      console.log('the selected molecule is ' + this.dataService.getMolecule());
    }
  }

  onSubmit() {
    // The work is all done in the TEMPLATE.
    console.log('Submit pressed.');
  }

  loadMoleculeList() {
    // Loads data for molecules
    this.dataService.getMoleculeList().subscribe(
      data => {
        console.log('Loading molecules list ...');
        this.moleculesList = data as MoleculePreview[]; // Stores as Molecules
        console.log(this.moleculesList);

        this.formatData();

        this.initFilter();
      },
      error => console.log(error)
    );
  }

  constructor(private dataService: DataService) {}

  // On init, loads module.
  ngOnInit() {
    this.loadMoleculeList();
  }

  // FILTER STUFF
  private _filterStates(value: string): MoleculePreview[] {
    const filterValue = value.toLowerCase();
    return this.moleculesList.filter(
      state => state.molName.toLowerCase().indexOf(filterValue) === 0
    );
  }
  initFilter() {
    this.filteredMolecules = this.moleculeCtrl.valueChanges.pipe(
      startWith(''),
      map(
        state =>
          state ? this._filterStates(state) : this.moleculesList.slice()
      )
    );
  }
}
