import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyANbjnB29yQMQWAsaqsvyOHRhMTWchGQPg',
  authDomain: 'ytclone-react-nachiketa.firebaseapp.com',
  projectId: 'ytclone-react-nachiketa',
  storageBucket: 'ytclone-react-nachiketa.appspot.com',
  messagingSenderId: '367381486456',
  appId: '1:367381486456:web:be49f2a6c4c9caa40b068d',
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
