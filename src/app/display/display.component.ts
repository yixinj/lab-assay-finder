import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from '../data.service';
import { AntibodyFull } from '../antibody-full';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  id: number;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAntibody();
  }

  getAntibody(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }
}
