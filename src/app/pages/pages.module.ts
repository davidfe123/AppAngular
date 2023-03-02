import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



@NgModule({
declarations: [
  DashboardComponent,
  ProgressComponent,
  Grafica1Component,
  PagesComponent
],
exports:[
  DashboardComponent,
  ProgressComponent,
  Grafica1Component,
  PagesComponent
],
imports: [
  FormsModule,
  CommonModule,
  SharedModule,
  RouterModule,
  ComponentsModule,
]
})
export class PagesModule { }