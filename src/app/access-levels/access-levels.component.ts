import {Component, OnInit} from '@angular/core';
import {AccessLvlModel} from "../../model/accessLvlModel";
import {AccessLevelsService} from "../../services/access-levels.service";
import {map} from "rxjs";
import {A} from "@angular/cdk/keycodes";
import {MatDialog} from "@angular/material/dialog";
import {AccessLevelTitleComponent} from "./access-level-title/access-level-title.component";

@Component({
  selector: 'app-access-levels',
  templateUrl: './access-levels.component.html',
  styleUrls: ['./access-levels.component.scss']
})
export class AccessLevelsComponent implements OnInit {
  dataSource: AccessLvlModel[];
  displayedColumns: string[] = ['Role Title', 'Capture', 'Setting', 'Template Builder', 'Template Capture', 'Manage Users', 'Edit User Models', 'All Spins', 'Access Levels'];
  selectedElements = []
  loader = true
  disable = false

  ngOnInit(): void {
    this.getAccLvlsList()
  }

  selectedForEdit: any

  constructor(private accessLevelService: AccessLevelsService,
              public dialog: MatDialog) {
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
      this.loader = false
      this.dataSource = data
      console.log('acc lvl', this.dataSource)
    });
  }

  getItem(element) {
    this.disable=true
    this.accessLevelService.getOneByKey(element.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe(data => {
      this.selectedForEdit = data[0]
      this.dialog.open(AccessLevelTitleComponent, {
        data: this.selectedForEdit
      });
      this.disable=false
    });
    // this.accessLevelService.updateItem(element.key,element)
  }

  updateTitle() {
    console.log(this.selectedForEdit)
    this.accessLevelService.updateItem(this.selectedForEdit.key, this.selectedForEdit)
  }

  changeCheckbox(element, $event: MouseEvent) {
    // this.accessLevelService.updateItem(element.key,element)
    this.selectedElements.push(element)
    console.log("selected", this.selectedElements)

  }

  getSaveData(event: boolean) {
    console.log('event', event)
    if (event) {
      for (let item of this.selectedElements) {
        this.accessLevelService.updateItem(item.key, item)
      }
    } else {
      this.selectedElements = []
      this.getAccLvlsList()
    }

  }
}
