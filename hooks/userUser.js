import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from '../firebase/client';

const useUser = () => {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    user === null && router.push('/');
  }, [user]);

  return user;
};

export default useUser;
