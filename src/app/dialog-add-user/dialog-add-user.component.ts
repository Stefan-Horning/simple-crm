import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import {collection, addDoc} from "firebase/firestore"; 


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: any;

  firestore: Firestore = inject(Firestore);
  constructor(){
    
  }

  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is' , this.user);
    await addDoc(this.getUserRef(),this.user).catch(
      (err) => {console.error(err)}
    ).then((docRef) =>{console.log("Document written with ID: ", docRef?.id);})
    
  }

  getUserRef(){
    return collection(this.firestore, 'users');
  }
}
