import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import {collection, addDoc} from "firebase/firestore"; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  userJSON: any;
  birthDate: any;
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>){
    
  }

  async saveUser(){
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    this.userJSON = JSON.parse(JSON.stringify(this.user));
    await addDoc(this.getUserRef(),this.userJSON).catch(
      (err) => {console.error(err)}
    ).then(() =>{ this.loading = false; this.dialogRef.close();})
   
  }

  getUserRef(){
    return collection(this.firestore, 'users');
  }
}
