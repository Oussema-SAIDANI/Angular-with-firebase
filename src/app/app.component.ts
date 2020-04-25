import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
constructor() {
  var firebaseConfig = {
  apiKey: 'AIzaSyAUOPw0A2veHqJTZfr5jMNWklehH1eZx10',
  authDomain: 'fir-38432.firebaseapp.com',
  databaseURL: 'https://fir-38432.firebaseio.com',
  projectId: 'fir-38432',
  storageBucket: 'fir-38432.appspot.com',
  messagingSenderId: '662602856668',
  appId: '1:662602856668:web:7a92a7aec7b38d2c67dc19',
  measurementId: 'G-P0X259HHZ5'
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}
}
