import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Basic2Guard } from '../guards/basic2.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
        { path: 'login', canActivate:[Basic2Guard] ,component: LoginComponent},
        { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
