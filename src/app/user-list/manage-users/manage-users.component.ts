import {Component, OnInit, ViewChild} from '@angular/core';
import {DataBaseService} from "../../../services/data-base.service";
import {map} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";
import {ConfirmationActionComponent} from "../../confirmation-action/confirmation-action.component";

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
              public dialog: MatDialog,
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
      this.newDataSource = new MatTableDataSource(this.allData)
     setTimeout(() => this.newDataSource.paginator = this.paginator)
      this.loader=false
      this.totalElements = this.newDataSource.filteredData.length
      setTimeout(() =>  console.log('users', data))
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
    this.term=''
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
    let confirmationDialog
    for (let user of this.selectedUsers) {
      user.isSelected = false
      if (this.buttonText === 'Delete Users') {
        confirmationDialog =this.dialog.open(ConfirmationActionComponent, {
          data: 'delete selected users',
        });
        confirmationDialog.afterClosed().subscribe(result => {
          if(result==='yes'){
            this.dataBaseService.deleteUser(user.key)
            this.dialogRef.close();
          }
        });
      } else if (this.buttonText === 'Enable Users') {
        confirmationDialog =this.dialog.open(ConfirmationActionComponent, {
          data: 'enable selected users',
        });
        confirmationDialog.afterClosed().subscribe(result => {
          if(result==='yes'){
            user.isDisabled = false
            this.dataBaseService.updateUser(user.key, user)
            this.dialogRef.close();
          }
        });
      } else if (this.buttonText === 'Disable Users') {
        confirmationDialog =this.dialog.open(ConfirmationActionComponent, {
          data: 'disable selected users',
        });
        confirmationDialog.afterClosed().subscribe(result => {
          if(result==='yes'){
            user.isDisabled = true
            this.dataBaseService.updateUser(user.key, user)
            this.dialogRef.close();

          }
        });

      }
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
      console.log(data)
      this.newDataSource = new MatTableDataSource(data)
      setTimeout(() => this.newDataSource.paginator = this.paginator)
      this.loader=false
      this.totalElements = data.length
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
