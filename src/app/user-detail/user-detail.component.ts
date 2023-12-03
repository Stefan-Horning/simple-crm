import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import {collection, addDoc, doc,getDoc,onSnapshot} from "firebase/firestore"; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

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
  constructor(private route: ActivatedRoute){
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
     console.log(this.user)
    });
  }

  ngOnInit(): void {
    
  }
}
