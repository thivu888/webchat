import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
  apiKey : "AIzaSyA46_UAys_JrNGAs0piLch-c0dVn_ZLmIY" , 
  authDomain : "chatapp-307815.firebaseapp.com" , 
  projectId : "chatapp-307815" , 
  storageBucket : "chatapp-307815.appspot.com" , 
  messagingSenderId : "679354963050" , 
  appId : "1: 679354963050: web: f053735b8d04d995c0a613" 
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
