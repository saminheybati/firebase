import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../services/data-base.service";
import {map} from "rxjs";
import firebase from "firebase/compat";
import {AccessLevelsService} from "../../services/access-levels.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource: any[];
  displayedColumns: string[] = ['name', 'email', 'role'];
  name: string = ''
  editMode = false
  editKey: string = ''
  accessLevels: any[]
  term = ''

  constructor(private dataBaseService: DataBaseService,
              private accessLevelService: AccessLevelsService) {
  }

  ngOnInit(): void {
    this.getUsersList()
    this.getAccessLevelsList()
  }

  getUsersList() {
    this.dataBaseService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.dataSource = data
      console.log('users', data)
    });
  }

  addUserToFireBase() {
    if (!this.editMode) {
      this.dataBaseService.addUser({
        'name': this.name
      })?.then(() => {
        console.log("add shod ")
        this.name = ''
      })
    } else {
      let test = {
        name: this.name
      }
      this.dataBaseService.updateUser(this.editKey, test)
        .then(() => {
          this.getUsersList()
          this.name = ''
          this.editMode = false
        })
        .catch(err => console.log(err));
    }
  }

  deleteUser(el: any) {
    console.log(el)
    this.dataBaseService.deleteUser(el.key)
      .then(() => {
        this.getUsersList();
      })
      .catch(err => console.log(err));
  }

  getAccessLevelsList() {
    this.accessLevelService.getList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      console.log('access levels', data)
      this.accessLevels = data
    });
  }

  filterByRole(event: MatSelectChange) {
    console.log(event.value)
    this.dataBaseService.getUsersByRole(event.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe(data => {
      this.dataSource = data
    });
  }

  filterByName(event: KeyboardEvent) {
    console.log(this.term)
    this.dataBaseService.filterByName(this.term).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe(data => {
      console.log('data : filter by name ', data)
    });
  }


  changeUsersRole(event: MatSelectChange, element) {
    console.log('event', event.value)
    console.log('element', element)
    this.dataBaseService.changeUsersRole(element.key, element)
  }
}
