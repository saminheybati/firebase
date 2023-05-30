import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../services/data-base.service";
import {map} from "rxjs";
import {deleteUser} from "@angular/fire/auth";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [ 'name', 'delete', 'edit','image'];
  name: string = ''
  editMode = false
  editKey: string = ''

  constructor(private dataBaseService: DataBaseService) {
  }

  ngOnInit(): void {
    this.getUsersList()
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
      console.log(this.dataSource)
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
}
