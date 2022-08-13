import Link from 'next/link';
import AppLayout from '../../components/appLayout';
import styles from './Timeline.module.css';

const Timeline = ({ userName }) => {
  return (
    <AppLayout>
      <h1 className={styles.title}>This is the Timeline of {userName}</h1>
      <Link href={'/'}>
        <a>Go home</a>
      </Link>
      {/*   <style jsx> {`
  h1{
    color: red;
  }`}</style> */}
    </AppLayout>
  );
};

Timeline.getInitialProps = () => {
  return fetch('/api/hello').then(res => res.json()).then(data => {
    return { userName: data.name };
  });
}

export default Timeline;
