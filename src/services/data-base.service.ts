import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {User} from "../model/userModel";

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private dbPath = '/users'

  userRef: AngularFireList<User>

  constructor(private db: AngularFireDatabase) {
    this.userRef = this.db.list(this.dbPath)
  }

  getUsersList() {
    return this.userRef
  }

  addUser(user: any) {
    return this.userRef?.push(user)
  }

  deleteUser(key: string): Promise<void> {
    return this.userRef.remove(key);
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.userRef.update(key, value);
  }

  deleteAll(): Promise<void> {
    return this.userRef.remove();
  }

  getUsersByRole(roleId) {
    return this.db.list(this.dbPath, ref => ref.orderByChild('accessLevel').equalTo(roleId))
  }

  filterByName(term) {
    // return this.db.list(this.dbPath, ref => ref.orderByChild('displayName').endAt(term))
    const query = this.db.list(this.dbPath, (ref) => {
      let queryRef = ref.orderByKey();
      if (term) {
        queryRef = queryRef.endAt(term);
      }
      return queryRef
    });

    return query.valueChanges();
  }

  changeUsersRole(key, value) {
    return this.userRef.update(key, value);
  }

  getDisabledEnabledList(isDisabled){
    return this.db.list(this.dbPath, ref => ref.orderByChild('isDisabled').equalTo(isDisabled))
  }

}
