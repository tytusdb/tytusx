import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeTabComponent } from './code-tab/code-tab.component';
import { CodeTab2Component } from './code-tab2/code-tab2.component';

const routes: Routes = [
  { path: 'ct', component: CodeTabComponent },
  { path: 'ct2', component: CodeTab2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
