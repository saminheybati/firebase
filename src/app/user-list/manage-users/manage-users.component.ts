import {Component, OnInit, ViewChild} from '@angular/core';
import {DataBaseService} from "../../../services/data-base.service";
import {map} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";

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
  totalElements = 0
  loader = false
  newDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataBaseService: DataBaseService,
              private dialogRef: MatDialogRef<ManageUsersComponent>) {
  }

  ngOnInit(): void {
    this.selectedUsers = []
    this.getUsersList()
  }

  getUsersList() {
    this.loader=true
    this.dataBaseService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.dataSource = data
      this.allData = data

      this.newDataSource = new MatTableDataSource(this.allData);
      this.newDataSource.paginator = this.paginator;
      this.loader=false
      this.totalElements = this.dataSource.length
      console.log('users', data)
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
    console.log("term",this.term)
    this.newDataSource.filter = this.term.trim().toLowerCase();
    if (this.newDataSource.paginator) {
      this.newDataSource.paginator.firstPage();
    }
  }
}
