import {Component} from '@angular/core';
import {DataBaseService} from "../services/data-base.service";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firstTaskFireBase';
  name: string = ''
  userList: any[] = []
  editMode = false
  editKey :string=''

  constructor(private dataBaseService: DataBaseService) {
    this.getUsersList()
  }

  addUserToFireBase() {
    if(!this.editMode){
      this.dataBaseService.addUser({
        'name': this.name
      })?.then(() => {
        console.log("add shod ")
        this.name = ''
      })
    }
    else {
      let test={
        name:this.name
      }
         this.dataBaseService.updateUser(this.editKey,test)
      .then(() => {
        this.getUsersList()
        this.name=''
        this.editMode=false
      })
      .catch(err => console.log(err));
    }

  }

  getUsersList() {
    this.dataBaseService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.userList = data
    });
  }

  deleteUser(item: any) {
    console.log(item)
    this.dataBaseService.deleteUser(item.key)
      .then(() => {
        this.getUsersList();
      })
      .catch(err => console.log(err));
  }

  editUser(item: any) {
    this.name = item.name
    this.editMode=true
    this.editKey=item.key
  }


  removeAllUsers() {
    this.dataBaseService.deleteAll()
      .then(() => this.getUsersList())
      .catch(err => console.log(err));
  }
}
