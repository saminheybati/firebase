import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccessLvlModel} from "../../model/accessLvlModel";
import {AccessLevelsService} from "../../services/access-levels.service";
import {map} from "rxjs";
import {A} from "@angular/cdk/keycodes";
import {MatDialog} from "@angular/material/dialog";
import {AccessLevelTitleComponent} from "./access-level-title/access-level-title.component";
import {CanDeactivateMyComponent} from "../../services/exit-confirm.guard";

@Component({
  selector: 'app-access-levels',
  templateUrl: './access-levels.component.html',
  styleUrls: ['./access-levels.component.scss']
})
export class AccessLevelsComponent implements OnInit, CanDeactivateMyComponent {
  dataSource: AccessLvlModel[];
  displayedColumns: string[] = ['Role Title', 'Capture', 'Setting', 'Template Builder', 'Template Capture', 'Manage Users', 'Edit User Models', 'All Spins', 'Access Levels'];
  selectedElements = []
  loader = true
  disable = false
  changedOnData = false
  exitChecker = true;

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
    this.disable = true
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
      this.disable = false
    });
    // this.accessLevelService.updateItem(element.key,element)
  }

  updateTitle() {
    console.log(this.selectedForEdit)
    this.accessLevelService.updateItem(this.selectedForEdit.key, this.selectedForEdit)
  }

  changeCheckbox(element, $event: MouseEvent) {
    // this.accessLevelService.updateItem(element.key,element)
    console.log('el', element)
    this.selectedElements.push(element)
    console.log("selected", this.selectedElements)
    this.changedOnData = true

  }

  getSaveData(event: boolean) {
    console.log('event', event)
    if (event) {
      for (let item of this.selectedElements) {
        this.accessLevelService.updateItem(item.key, item)
        this.changedOnData = false
      }
    } else {
      this.changedOnData = false
      this.selectedElements = []
      this.getAccLvlsList()
    }

  }

  confirm(): boolean {
    if (this.changedOnData) {
      if (this.exitChecker) {
        return confirm('You didnt save you changes !!');
      }
      return true;
    }
    return true
  }

  exit(event: boolean) {
    this.exitChecker = event;
  }
}
