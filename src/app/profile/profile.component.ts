import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UploadImageComponent} from "./upload-image/upload-image.component";
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {DataBaseService} from "../../services/data-base.service";
import {map} from "rxjs";
import {AccessLevelTitleComponent} from "../access-levels/access-level-title/access-level-title.component";
import {FormBuilder, FormControl} from "@angular/forms";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {
  displayName = ''
  loggedInUser: any
  loggedInUserData: any
  uid = ''
  profilePicture: any
  changedOnData = false

  constructor(public dialog: MatDialog,
              private uploadService: FileUploadService,
              private form: FormBuilder,
              private service: DataBaseService) {
  }

  ngOnChanges(changes: SimpleChanges): void {

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
      avatarFullPath: [''],
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
      data: this.loggedInUserData
    });
  }

  getSaveData(event: boolean) {
    console.log(event)
    if (event) {
      this.service.updateUser(this.loggedInUserData.key, this.userDataForm.value)
    } else {
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
    ).subscribe((data: any) => {
      this.loggedInUserData = data[0]
      this.userDataForm.patchValue(data[0])
      this.uploadService.getOneUrlByUserId(data[0].id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            (c.payload.val())
          )
        )
      ).subscribe((data: any) => {
        console.log('img url ?', data[0].url)
        this.profilePicture = data[0].url
      });
    });
  }
}
