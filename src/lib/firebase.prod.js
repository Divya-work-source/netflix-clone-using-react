// src/lib/firebase.prod.js

// ✅ Import functions from modular SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
      
// import { seedDatabase } from '../seed'; // still keep this commented if needed

// ✅ Config stays the same
const config = {
  apiKey: "AIzaSyD6rfFIRNC4j0YoRtZGi6vLlJ0M2baoffE",
  authDomain: "netflix-react-9480e.firebaseapp.com",
  projectId: "netflix-react-9480e",
  storageBucket: "netflix-react-9480e.appspot.com",
  messagingSenderId: "124358470674",
  appId: "1:124358470674:web:e265ab9bc66f7c4e9a3ccb"
};

// ✅ Initialize Firebase app
//const app = initializeApp(config);
const app = initializeApp(config);
const firestore = getFirestore(app);
const auth = getAuth(app); // ✅
;


// ❌ Don't use seedDatabase unless you're intentionally seeding data
// seedDatabase(app);

// ✅ Export explicitly
export { app, firestore, auth };
