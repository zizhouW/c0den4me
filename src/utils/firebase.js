import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBoKHpIeR2b8utUMBg89m3O_GMPbc5stM",
  authDomain: "jack-codename.firebaseapp.com",
  databaseURL: "https://jack-codename.firebaseio.com",
  projectId: "jack-codename",
  storageBucket: "jack-codename.appspot.com",
  messagingSenderId: "666397717310",
  appId: "1:666397717310:web:49ace9237bbda0f120326f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
