import {AccessLvlModel} from "./accessLvlModel";

export class User {
  id: string;
  ts: string;
  accessLevel: AccessLvlModel
  email: string
isTermsAccepted:boolean
  phone:string
  username:string
  signUpTimeStamp:string
  displayName:string
  isDisabled:boolean
  avatarFullPath:string
}
