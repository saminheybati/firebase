import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UploadImageComponent} from "./upload-image/upload-image.component";
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {DataBaseService} from "../../services/data-base.service";
import {map} from "rxjs";
import {AccessLevelTitleComponent} from "../access-levels/access-level-title/access-level-title.component";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayName = ''
  loggedInUser: any
  loggedInUserData: any
  uid = ''

  constructor(public dialog: MatDialog,
              private form: FormBuilder,
              private service: DataBaseService) {
  }

  userDataForm = this.form.group({
    dealershipDisplayName: [''],
    salesEmail: [''],
    salesPhoneNumber: [''],
    showRoomAddress: [''],
    accessLevel: [''],
    displayName: [''],
    email: [''],
    isDisabled: [''],
    id: [''],
    isSelected: [''],
    isTermsAccepted: [''],
    key: [''],
    phone: [''],
    signUpTimeStamp: [''],
    ts: [''],
    username: ['']
  }
  )

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user)
        this.loggedInUser = user
        this.uid = user.uid;
        this.getOneUserData()
        this.displayName = this.loggedInUser?.providerData[0].displayName

      } else {
        // User is signed out
        // ...
      }
    });
  }

  openUploadDialog() {
    this.dialog.open(UploadImageComponent, {
      data: 'sam'
    });
  }

  getSaveData(event: boolean) {
    console.log(event)
    if(event){
      this.service.updateUser(this.loggedInUserData.key,this.userDataForm.value)
    }
    else {
      this.userDataForm.patchValue(this.loggedInUserData)

    }
  }

  getOneUserData() {
    this.service.getOneUserByKey(this.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe(data => {
      console.log('data', data[0])
      this.loggedInUserData = data[0]
      this.userDataForm.patchValue(data[0])
    });
  }
}
