import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AccessLevelsComponent} from "./access-levels/access-levels.component";

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'access-levels',
    component: AccessLevelsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
