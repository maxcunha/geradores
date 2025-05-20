/// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIziatdToHUKLQbrOg0NAHD_8JEK9SGbA",
  authDomain: "manutencao-equipamentos.firebaseapp.com",
  projectId: "manutencao-equipamentos",
  storageBucket: "manutencao-equipamentos.appspot.com",
  messagingSenderId: "1052571330492",
  appId: "1:1052571330492:web:33c78e5db89c3e90286db9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
