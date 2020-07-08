import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoComponent } from './components/ingreso/ingreso.component';
import { PrincipalComponent } from './components/principal/principal.component';

import { AuthGuard } from "./shared/guard/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: '/ingreso', pathMatch: 'full' },
  { path: 'ingreso', component: IngresoComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
