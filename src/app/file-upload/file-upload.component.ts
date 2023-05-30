import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
import {FileUpload} from "../../model/fileUpload";
import {finalize, map} from "rxjs";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() uploadedFile = new EventEmitter<any>()
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[];

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.getUploadList()
    this.getOneFileByKey()
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        console.log('this.currentFileUpload', this.currentFileUpload.file.name)
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
      let index=this.fileUploads?.findIndex(item=>item.name===this.currentFileUpload?.file.name)
      console.log("index",index)
      console.log("list",this.fileUploads)
      // this.uploadedFile.emit()
    }
  }


  getUploadList() {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log('upeloads ', this.fileUploads)
    });
  }

  getOneFileByKey() {

  }

}
