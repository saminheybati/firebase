import { Component, OnInit } from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {


  constructor(private  storageService: FileUploadService,) { }

  ngOnInit(): void {
  }

}
