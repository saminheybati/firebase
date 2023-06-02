import {Injectable} from '@angular/core';
import {AccessLvlModel} from "../model/accessLvlModel";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class AccessLevelsService {
  private dbPath = '/access-levels'
  accessLevelRef: AngularFireList<AccessLvlModel>

  constructor(private db: AngularFireDatabase) {
    this.accessLevelRef = this.db.list(this.dbPath)
  }

  getList() {
    return this.accessLevelRef
  }
  addNewAccLvl(accessLevel:AccessLvlModel){
    return this.accessLevelRef?.push(accessLevel)
  }
  getOneByKey(key:string){
  return this.db.list(this.dbPath,ref=>ref.orderByKey().equalTo(key))

  }
}
