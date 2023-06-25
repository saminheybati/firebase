import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PanelComponent} from "../panel.component";
import {UserListComponent} from "../../user-list/user-list.component";
import {AccessLevelsComponent} from "../../access-levels/access-levels.component";
import {ProfileComponent} from "../../profile/profile.component";
import {ControlValueComponent} from "../../control-value/control-value.component";

const routes: Routes = [

  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'access-levels',
    component: AccessLevelsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'control-value',
    component: ControlValueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingRoutingModule {
}
