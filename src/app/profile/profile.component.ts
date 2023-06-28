import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UploadImageComponent} from "./upload-image/upload-image.component";
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {DataBaseService} from "../../services/data-base.service";
import {map} from "rxjs";
import {AccessLevelTitleComponent} from "../access-levels/access-level-title/access-level-title.component";
import {FormBuilder, FormControl} from "@angular/forms";
import {FileUploadService} from "../../services/file-upload.service";
import {CanDeactivateMyComponent} from "../../services/exit-confirm.guard";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, CanDeactivateMyComponent {
  loggedInUser: any
  loggedInUserData: any
  uid = ''
  profilePicture: any
  changedOnData = false
  signUpDate: Date
  loader = true

  constructor(public dialog: MatDialog,
              private uploadService: FileUploadService,
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
      avatarFullPath: [''],
      username: ['']
    }
  )

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedInUser = user
        this.uid = user.uid;
        this.getOneUserData()
      } else {
        // User is signed out
        // ...
      }
    });
  }

  openUploadDialog() {
    let dialog
    dialog = this.dialog.open(UploadImageComponent, {
      data: this.loggedInUserData
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loader=false
        setTimeout(() => this.getOneUserData())
      window.location.reload()
      }
    });
  }

  getSaveData(event: boolean) {
    console.log(event)
    if (event) {
      this.service.updateUser(this.loggedInUserData.key, this.userDataForm.value)
      this.changedOnData = false
    } else {
      this.userDataForm.patchValue(this.loggedInUserData)
      this.changedOnData = false
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
      console.log(this.loggedInUserData)
      this.signUpDate = new Date(+this.loggedInUserData.signUpTimeStamp)
      this.uploadService.getOneUrlByUserId(data[0].id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            (c.payload.val())
          )
        )
      ).subscribe((data: any) => {
        this.profilePicture = data[0].url
      });
      this.loader = false

    });
  }

  checkChanges() {
    this.changedOnData = this.loggedInUserData !== this.userDataForm.value;
  }

  getSelectedDate(event: Date) {
    this.userDataForm.patchValue({'signUpTimeStamp': event.getTime().toString().trim().toLowerCase()})
    this.changedOnData = true
  }

  confirm(): boolean {
    if (this.changedOnData) {
      return confirm('You didnt save you changes !!');
    }
    return true
  }

}
