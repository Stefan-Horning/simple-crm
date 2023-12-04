import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import {collection, addDoc, doc,getDoc,onSnapshot} from "firebase/firestore"; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  firestore: Firestore = inject(Firestore);
  userID:any;
  user: User = new User();
  UserList
  constructor(private route: ActivatedRoute, public dialog: MatDialog){
    this.userID = this.route.snapshot.paramMap.get('id');
    this.UserList = this.getUserFromFirebase();
  }

  ngOnDestroy(){
    this.UserList();
  }

  getSingleRef(){
    return doc(collection(this.firestore, 'users'),this.userID);
  }


  getUserFromFirebase(){
    return onSnapshot(this.getSingleRef(), (element) => {
     this.user = new User(element.data());
     this.user.id = this.userID;
    });
  }

  ngOnInit(): void {
    
  }

  editUserMenu(){
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.user = new User(JSON.parse(JSON.stringify(this.user)));
  }

  editAddress(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user =new User(JSON.parse(JSON.stringify(this.user)));
  }

}
