// This module imports all the material2 components needed

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatExpansionModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  declarations: []
})
export class MaterialModule { }
