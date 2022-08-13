import { useState, useEffect } from 'react';
import AppLayout from '../../components/appLayout';
import Devit from '../../components/devit';
import useUser from '../../hooks/userUser';
import styles from './Home.module.css';
import { fetchLatestDevits } from '../../firebase/client';

const HomePage = () => {
  const [timeline, setTimeLine] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      fetchLatestDevits()
        .then(setTimeLine)
        .catch(err => {
          console.log(err);
        });
  }, [user]);

  return (
    <AppLayout>
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section>
        {timeline.map(({ createdAt,id, content, userName, avatar, userId }) => (
          <Devit
            key={id}
            id={id}
            content={content}
            userName={userName}
            avatar={avatar}
            userId={userId}
            createdAt={createdAt}
          />
        ))}
      </section>
      <nav className={styles.nav}></nav>
    </AppLayout>
  );
};
export default HomePage;
