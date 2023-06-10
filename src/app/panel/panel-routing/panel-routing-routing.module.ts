import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PanelComponent} from "../panel.component";
import {UserListComponent} from "../../user-list/user-list.component";
import {AccessLevelsComponent} from "../../access-levels/access-levels.component";

const routes: Routes = [
  {
  path: '',
  component: PanelComponent,
},
  {
  path: 'users',
  component: UserListComponent,
},
  {
  path: 'access-levels',
  component: AccessLevelsComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingRoutingModule { }
