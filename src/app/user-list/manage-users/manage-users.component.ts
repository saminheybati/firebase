import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../../services/data-base.service";
import {map} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  dataSource: any[];
  allData: any[];
  displayedColumns: string[] = ['email'];
  selectedUsers = []
  tabs = ['Delete Users', 'Enable Users', 'Disable Users'];
  buttonText = this.tabs[0]
  term = ''

  constructor(private dataBaseService: DataBaseService,
              private dialogRef: MatDialogRef<ManageUsersComponent>) {
  }

  ngOnInit(): void {
    this.selectedUsers = []
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
      this.allData=data
    });
  }

  changeCheckbox(user, event) {
    if (event == true) {
      // user.isSelected=false
      this.selectedUsers.push(user)
    } else {
      let index = this.selectedUsers.findIndex(item => item.key == user.key)
      this.selectedUsers.splice(index, 1)
    }
    console.log('selected users', this.selectedUsers)
  }

  selectionChange(event: number) {
    this.buttonText = this.tabs[event]
    this.selectedUsers = []
    if (this.buttonText === 'Delete Users') {
      this.getUsersList()
    } else if (this.buttonText === 'Enable Users') {
      this.getUsersByIsDisabled(true)
    } else if (this.buttonText === 'Disable Users') {
      this.getUsersByIsDisabled(false)
    }
  }

  action() {
    for (let user of this.selectedUsers) {
      user.isSelected = false
      if (this.buttonText === 'Delete Users') {
        this.dataBaseService.deleteUser(user.key)
      } else if (this.buttonText === 'Enable Users') {
        user.isDisabled = false
        this.dataBaseService.updateUser(user.key, user)
      } else if (this.buttonText === 'Disable Users') {
        user.isDisabled = true
        this.dataBaseService.updateUser(user.key, user)
      }
      this.dialogRef.close();
    }
  }

  getUsersByIsDisabled(isDisabled) {
    this.dataBaseService.getDisabledEnabledList(isDisabled).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe(data => {
      this.dataSource = data
    });
  }

  filterData($event: KeyboardEvent) {
    this.dataSource=this.allData.filter(x=>x.displayName.toLowerCase().includes(this.term.toLowerCase()))
    // this.dataSource=this.allData.filter(x=>x.email.toLowerCase().includes(this.term.toLowerCase()))
  }
}
