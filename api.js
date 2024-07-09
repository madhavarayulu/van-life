import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'vanlife-4051b.firebaseapp.com',
  projectId: 'vanlife-4051b',
  storageBucket: 'vanlife-4051b.appspot.com',
  messagingSenderId: '406846962008',
  appId: '1:406846962008:web:a361a3a745a95a66930d2d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, 'vans');

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id);
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', '123'));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function loginUser(creds) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    return { message: data.message };
  }

  // if (!res.ok) {
  //   throw {
  //     message: data.message,
  //     statusText: res.statusText,
  //     status: res.status,
  //   };
  // }

  return data;
}
