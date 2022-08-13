import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBCvIxu_t9I34F94922Hqj5CnucIciEkLs',
  authDomain: 'devter-b4b4b.firebaseapp.com',
  projectId: 'devter-b4b4b',
  storageBucket: 'devter-b4b4b.appspot.com',
  messagingSenderId: '37609696760',
  appId: '1:37609696760:web:ddfc5a5b5a2a215c3dba0d',
  measurementId: 'G-FB7ESW7SFD',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const mapUserFromFirebaseAuthToUser = userData => {
  GithubAuthProvider.credentialFromResult(userData);

  const { email, photoURL, displayName, uid } = userData;

  return {
    avatar: photoURL,
    email,
    userName: displayName,
    uid,
  };
};

export const onAuthStateChanged = onChange => {
  return getAuth().onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWhitGithub = () => {
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, githubProvider).catch(error => {
    console.log(error);
  });
};

export const addDevit = ({ avatar, content, userId, userName }) => {
  return addDoc(collection(db, 'devits'), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = async () => {
  const q = query(collection(db, 'devits'), orderBy('createdAt', 'desc'));
  const querySnap = await getDocs(q);
  const data = querySnap.docs.map(doc => {
    const { createdAt } = doc.data();

    return {
      ...doc.data(),
      id: doc.id,
      createdAt: +createdAt.toDate(),
    };
  });
  return data;
};
