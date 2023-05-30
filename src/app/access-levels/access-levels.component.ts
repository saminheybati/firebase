import {Component, OnInit} from '@angular/core';
import {AccessLvlModel} from "../../model/accessLvlModel";
import {AccessLevelsService} from "../../services/access-levels.service";
import {map} from "rxjs";

@Component({
  selector: 'app-access-levels',
  templateUrl: './access-levels.component.html',
  styleUrls: ['./access-levels.component.scss']
})
export class AccessLevelsComponent implements OnInit {
  dataSource: AccessLvlModel[];
  displayedColumns: string[] = ['Role Title', 'Capture', 'Setting', 'Template Builder', 'Template Capture', 'Manage Users', 'Edit User Models', 'All Spins', 'Access Levels'];
  ngOnInit(): void {
    this.getAccLvlsList()
  }
  constructor(private accessLevelService: AccessLevelsService) {
    // this.accessLevelService.addNewAccLvl({
    //   id: "default",
    //   isAccessLevels: false,
    //   isAllSpins: false,
    //   isCapture: true,
    //   isEdit: false,
    //   isSetting: false,
    //   isTemplateBuilder: true,
    //   isTemplateCapture: false,
    //   isUserModels: false,
    //   isUsers: false,
    //   title: "test"
    // }).then(() => {
    //   console.log("add shod ")
    // })
  }
  getAccLvlsList() {
    this.accessLevelService.getList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.dataSource = data
      console.log(this.dataSource)
    });
  }

}
