import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDsrQJ1niR3SeVUwjmyMN9TvxCE9HYbrYU",
    authDomain: "foodtesting-45d25.firebaseapp.com",
    projectId: "foodtesting-45d25",
    storageBucket: "foodtesting-45d25.appspot.com",
    messagingSenderId: "1070966005868",
    appId: "1:1070966005868:web:0557da47e2ffb26da7f849",
    measurementId: "G-RK5MZLNJZW"
  };


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);


