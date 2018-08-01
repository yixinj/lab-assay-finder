import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { DisplayComponent } from './display/display.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: InputFormComponent },
  { path: ':molecule_name', component: DisplayComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true })  // Turns on HashLocation (instead of PathLocation)
  ],
})
export class AppRoutingModule { }
