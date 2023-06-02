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

  constructor(private accessLevelService: AccessLevelsService,) {
    let accLvl = {
      id: "default",
      isAccessLevels: false,
      isAllSpins: false,
      isCapture: true,
      isEdit: false,
      isSetting: true,
      isTemplateBuilder: false,
      isTemplateCapture: true,
      isUserModels: true,
      isUsers: true,
      title: "Level3"
    }
    // this.accLvlService.create(accLvl)
    // this.accessLevelService.addNewAccLvl({
    //   id: "default",
    //   isAccessLevels: false,
    //   isAllSpins: false,
    //   isCapture: true,
    //   isEdit: false,
    //   isSetting: true,
    //   isTemplateBuilder: false,
    //   isTemplateCapture: true,
    //   isUserModels: true,
    //   isUsers: true,
    //   title: "Level3"
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

  editTitle(element) {
    this.accessLevelService.getOneByKey(element.key).snapshotChanges().pipe(
    ).subscribe(data => {
      console.log("data", data)
    });
  }
}
