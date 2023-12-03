import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import {collection, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { get } from 'firebase/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  userJSON: any;
  userList: any = [];
  unsubList;
  //unsubSingle;
  constructor(public dialog: MatDialog) {
    this.unsubList = this.subUsersList();
  }

  subUsersList(){
    return onSnapshot(this.getUserRef(), (list) =>{
      list.forEach(element => {
        this.userList.push(this.setUserObject(element.data(), element.id));
      });
    })
  }

  setUserObject(obj:any, id:string) {
    return {
      id: id || "",
      firstName: obj.firstName || "",
      lastName: obj.lastName || "",
      birthDate: obj.birthDate || "",
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
    }
  }

  ngOnDestroy(){
    this.unsubList();
  }
  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

  getUserRef(){
   return collection(this.firestore, 'users');
  }
}
