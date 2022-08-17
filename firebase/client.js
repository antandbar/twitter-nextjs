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
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

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

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return addDoc(collection(db, 'devits'), {
    avatar,
    content,
    img,
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

export const uploadImage = file => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask;
};
