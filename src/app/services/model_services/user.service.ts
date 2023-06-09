import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'User';

  constructor(private asf: AngularFirestore) { }

  
  create(user: User){
    return this.asf.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll(){
    return this.asf.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string){
    return this.asf.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User){
    return this.asf.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string){
    return this.asf.collection<User>(this.collectionName).doc(id).delete();
  }

  getAllAdmin() {
    return this.asf.collection<User>(this.collectionName, ref => ref.where('Admin', '==', true)).valueChanges();
  }

}
