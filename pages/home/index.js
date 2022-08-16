import { useState, useEffect } from 'react';
import Link from 'next/link';
import Devit from '../../components/devit';
import useUser from '../../hooks/userUser';
import styles from './Home.module.css';
import { fetchLatestDevits } from '../../firebase/client';
import Create from '../../components/icons/Create';
import Home from '../../components/icons/Home';
import Search from '../../components/icons/Search';

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
    <>
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        {timeline.map(
          ({ createdAt, img, id, content, userName, avatar, userId }) => (
            <Devit
              key={id}
              id={id}
              img={img}
              content={content}
              userName={userName}
              avatar={avatar}
              userId={userId}
              createdAt={createdAt}
            />
          ),
        )}
      </section>
      <nav className={styles.nav}>
        <Link href={'/home'}>
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href={'/search'}>
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href={'/compose/tweet'}>
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
    </>
  );
};
export default HomePage;
