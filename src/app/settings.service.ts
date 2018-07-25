import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  acronym = true;
  description = true;

  constructor() { }
}
