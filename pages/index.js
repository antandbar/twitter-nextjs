import { useEffect } from 'react';
import AppLayout from '../components/appLayout';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Button from '../components/Button';
import { loginWhitGithub } from '../firebase/client';
import { useRouter } from 'next/router';
import useUser from '../hooks/userUser';

export default function Home() {
  const user = useUser();
  const router = useRouter();

 

  useEffect(() => {
    user && router.replace('/home');
  } ,[user]);

  const handleClick = () => {
    loginWhitGithub()
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <AppLayout>
        <section className={styles.section}>
          <Image src="/logo.png" alt="logo" width="100px" height="100px" />
          <h1 className={styles.h1}>Devter</h1>
          <h2 className={styles.h2}>
            Talk about development <br />
            with developers
          </h2>
          <div className={styles.div_button}>
            {user === null && (
              <Button onClick={handleClick}>Login with Github</Button>
            )}
            {user === undefined && <span>Loading...</span>}
          </div>
        </section>
      </AppLayout>
    </>
  );
}
