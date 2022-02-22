import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvDo-od5VHPDTWo7jpVKsAtA8hwPVzx0U",
  authDomain: "meditation-1b274.firebaseapp.com",
  projectId: "meditation-1b274",
  storageBucket: "meditation-1b274.appspot.com",
  messagingSenderId: "885235770770",
  appId: "1:885235770770:web:17001e87aa10a52748cd4b",
  measurementId: "G-0XVDKPQZHQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);