import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataBaseService} from "../../services/data-base.service";
import {map} from "rxjs";
import firebase from "firebase/compat";
import {AccessLevelsService} from "../../services/access-levels.service";
import {MatSelectChange} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit ,AfterViewInit{
  dataSource = []
  allData = []
  displayedColumns: string[] = ['name', 'email', 'role', 'activity'];
  name: string = ''
  editMode = false
  editKey: string = ''
  accessLevels: any[]
  term = ''
  loader = false
  totalElements = 0
  newDataSource: MatTableDataSource<any>;
 @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dataBaseService: DataBaseService,
              public dialog: MatDialog,
              private accessLevelService: AccessLevelsService) {
  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    this.getUsersList()
    this.getAccessLevelsList()
  }

  getUsersList() {
    this.loader = true
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
      // this.newDataSource.paginator = this.paginator;
      setTimeout(() =>  this.totalElements = this.newDataSource.filteredData.length)
      setTimeout(() => this.newDataSource.paginator = this.paginator);
      this.loader = false
      console.log('users', this.newDataSource)
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
    this.loader = true
    this.term=''
    this.dataBaseService.getUsersByRole(event.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe((data:any) => {
      this.newDataSource = new MatTableDataSource(data);
      this.totalElements = this.newDataSource.filteredData.length
      this.loader = false
    });
  }

  filterByName(event: any) {
    // console.log(this.term)
    // console.log("aall data", this.allData)
    // this.dataSource = this.allData.filter(x => x.displayName.toLowerCase().includes(this.term.toLowerCase()))
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.newDataSource=new MatTableDataSource(this.allData);
    this.newDataSource.filter = this.term.trim().toLowerCase();
    if (this.newDataSource.paginator) {
      this.newDataSource.paginator.firstPage();
    }
  }


  changeUsersRole(event: MatSelectChange, element) {
    this.dataBaseService.changeUsersRole(element.key, element)
  }

  openDialog() {
    this.dialog.open(ManageUsersComponent)

  }

  // getSaveData(event: boolean) {
  //    if (event){
  //     for (let item of this.selectedElements){
  //       this.accessLevelService.updateItem(item.key,item)
  //     }
  //   }
  //   else {
  //     this.selectedElements=[]
  //     this.getAccLvlsList()
  //   }
  //
  // }
  pagination(event: any) {
    console.log("event",event)

  }
}
