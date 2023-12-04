import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import {collection, addDoc, doc,getDoc,onSnapshot,updateDoc} from "firebase/firestore"; 

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: any;
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){}

  async saveUser(){
    this.loading = true;
    await updateDoc(this.getSingleRef(), JSON.parse(JSON.stringify(this.user))).then(() =>{this.loading = false; this.dialogRef.close()});
    
  }

  getSingleRef(){
    return doc(collection(this.firestore, 'users'),this.user.id);
  }
}
