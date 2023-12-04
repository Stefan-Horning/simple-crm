import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import {collection, addDoc, doc,getDoc,onSnapshot,updateDoc} from "firebase/firestore"; 

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit{
  user:any;
  loading:boolean = false;
  birthDate:any;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){
    
  }

  ngOnInit(): void {
    this.birthDate = new Date(this.user.birthDate);
  }

  async saveUser(){
    this.loading = true;
    await updateDoc(this.getSingleRef(), JSON.parse(JSON.stringify(this.user))).then(() =>{this.loading = false; this.dialogRef.close()});
  }

  getSingleRef(){
    return doc(collection(this.firestore, 'users'),this.user.id);
  }
}
