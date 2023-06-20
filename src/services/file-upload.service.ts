import {Injectable, Query} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUpload} from "../model/fileUpload";
import {finalize, Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})


export class FileUploadService {
  private dbPath = '/uploads'

  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.dbPath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();

  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.dbPath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.dbPath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.name)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.dbPath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.dbPath);
    storageRef.child(name).delete();
  }

  getOneUrlByUserId(id: any) {
    return this.db.list(this.dbPath, ref => ref.orderByChild('name').equalTo(id))

  }

}
