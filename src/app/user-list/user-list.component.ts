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
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  dataSource = []
  allData = []
  displayedColumns: string[] = ['name', 'email', 'signUpTimeStamp', 'role', 'activity'];
  name: string = ''
  editMode = false
  editKey: string = ''
  accessLevels: any[]
  term = ''
  loader = false
  totalElements = 0
  newDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  timeTest = 15445658888
  disableFilter = true

  dateControl!: FormControl;
  sliderControl!: FormControl;

  constructor(private dataBaseService: DataBaseService,
              public dialog: MatDialog,
              private accessLevelService: AccessLevelsService) {
  }

  startDate = new Date(1685910600000)
  endDate = new Date(1687033800000)

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    ///new
    this.sliderControl = new FormControl();
    this.sliderControl?.valueChanges.subscribe((res) => {
      console.log("res slider slider",res)
    });
    this.dateControl = new FormControl();
    this.dateControl?.valueChanges.subscribe((res) => {
      console.log("res from formControl",res)
    });


    // console.log('this.timeTest', this.timeTest)
    var dateFormat = new Date(this.timeTest);
    // console.log('time', dateFormat)

    this.getUsersList()
    this.getAccessLevelsList()
  }

  getUsersList() {
    this.loader = true
    this.disableFilter = true
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
      setTimeout(() => this.totalElements = this.newDataSource.filteredData.length)
      setTimeout(() => this.newDataSource.paginator = this.paginator);
      this.loader = false
      this.disableFilter = false
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
      this.accessLevels = data

    });
  }

  filterByRole(event: MatSelectChange) {
    this.loader = true
    this.term = ''
    this.dataBaseService.getUsersByRole(event.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe((data: any) => {
      console.log("users", data)
      this.newDataSource = new MatTableDataSource(data);
      this.totalElements = this.newDataSource.filteredData.length
      this.loader = false
    });
  }

  filterByName(event: any) {
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


  pagination(event: any) {
    console.log("event", event)
  }

  // getSelectedDate(event: Date) {
  //   this.newDataSource.filter = event.getTime().toString().trim().toLowerCase();
  //   if (this.newDataSource.paginator) {
  //     this.newDataSource.paginator.firstPage();
  //   }
  // }


  getSelectedRangeDate(event: any) {
    console.log('event',event)
  }


}
