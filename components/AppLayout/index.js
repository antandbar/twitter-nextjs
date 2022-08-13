import Head from 'next/head';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={styles.div_main}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default AppLayout;
