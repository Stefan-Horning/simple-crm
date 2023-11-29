import { Component } from '@angular/core';
import { User } from 'src/models/user.class';

import { doc, addDoc } from "firebase/firestore"; 

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: any;
  constructor(){
    
  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is' , this.user);

  }
}
