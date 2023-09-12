import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXP8TYOqZaTBWt_FrZiNS9QcbzOnacT08",

  authDomain: "nft-lending-borrowing.firebaseapp.com",

  projectId: "nft-lending-borrowing",

  storageBucket: "nft-lending-borrowing.appspot.com",

  messagingSenderId: "8028283668",

  appId: "1:8028283668:web:f26502e03d2e86ec945801",
};

export const firebase = initializeApp(firebaseConfig);
