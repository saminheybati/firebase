import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
import {FileUpload} from "../../model/fileUpload";
import {finalize, map} from "rxjs";
import {Dimensions, ImageCroppedEvent, ImageTransform} from "./interfaces";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  // @Output() uploadedFile = new EventEmitter<any>()
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[];

  // constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    // this.getUploadList()
    // this.getOneFileByKey()
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(' this.selectedFiles', this.selectedFiles)
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
  //
  //
  // getUploadList() {
  //   this.uploadService.getFiles(6).snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
  //     )
  //   ).subscribe(fileUploads => {
  //     this.fileUploads = fileUploads;
  //     console.log('upeloads ', this.fileUploads)
  //   });
  // }
  //
  // getOneFileByKey() {
  //
  // }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation?: number;
  translateH = 0;
  translateV = 0;
  scale = 1;
  aspectRatio = 4 / 3;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {
    translateUnit: 'px'
  };
  imageURL?: string;
  loading = false;
  allowMoveImage = false;
  hidden = false;

  constructor(private uploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) {
  }

  fileChangeEvent(event: any): void {
    this.loading = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || '');
    console.log('event',event);
    console.log('cropped img',this.croppedImage);
  }

test= this.sanitizer.bypassSecurityTrustUrl("blob:http://localhost:4400/915aa597-dc9c-4e1c-9b32-13ba935533ce" );


  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
    this.loading = false;
  }

  loadImageFailed() {
    console.error('Load image failed');
  }

  rotateLeft() {
    this.loading = true;
    setTimeout(() => { // Use timeout because rotating image is a heavy operation and will block the ui thread
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  moveLeft() {
    this.transform = {
      ...this.transform,
      translateH: ++this.translateH
    };
  }

  moveRight() {
    this.transform = {
      ...this.transform,
      translateH: --this.translateH
    };
  }

  moveTop() {
    this.transform = {
      ...this.transform,
      translateV: ++this.translateV
    };
  }

  moveBottom() {
    this.transform = {
      ...this.transform,
      translateV: --this.translateV
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {
      translateUnit: 'px'
    };
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  toggleAspectRatio() {
    this.aspectRatio = this.aspectRatio === 4 / 3 ? 16 / 5 : 4 / 3;
  }

}
