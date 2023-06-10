import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AccessLevelsComponent} from "./access-levels/access-levels.component";
import {UserListComponent} from "./user-list/user-list.component";
import {PanelComponent} from "./panel/panel.component";

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },

  {
    path: 'panel',
    component: PanelComponent,
    loadChildren: () =>
      import('./panel/panel-routing/panel-routing-routing.module').then(
        m => m.PanelRoutingRoutingModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
