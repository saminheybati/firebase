import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PanelComponent} from "../panel.component";
import {UserListComponent} from "../../user-list/user-list.component";
import {AccessLevelsComponent} from "../../access-levels/access-levels.component";
import {ProfileComponent} from "../../profile/profile.component";
import {ControlValueComponent} from "../../control-value/control-value.component";
import {ExitConfirmGuard} from "../../../services/exit-confirm.guard";

const routes: Routes = [

  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'access-levels',
    component: AccessLevelsComponent,
    canDeactivate: [ExitConfirmGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canDeactivate: [ExitConfirmGuard]

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
