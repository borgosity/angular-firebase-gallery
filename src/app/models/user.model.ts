import { Roles } from './roles.model';

export class User {
  uid?: string;
  email?: string;
  photoURL?: string;
  roles?: Roles;

  constructor(authData) {
    this.uid = authData.uid;
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.roles = authData.uid ? { viewer: true } : { guest: true };
  }
}
