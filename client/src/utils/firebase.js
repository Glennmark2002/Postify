import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "social-media-app-b0775.firebaseapp.com",
  projectId: "social-media-app-b0775",
  storageBucket: "social-media-app-b0775.firebasestorage.app",
  messagingSenderId: "221244352067",
  appId: "1:221244352067:web:19d16f96a4b6b6751556f6"
};

export const app = initializeApp(firebaseConfig);