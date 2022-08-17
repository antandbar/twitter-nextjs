import Link from 'next/link';
import { useRouter } from 'next/router';
import Avatar from '../Avatar';
import useTimeAgo from '../../hooks/useTimeAgo';
import styles from './Devit.module.css';

const Devit = ({ avatar, userName, content, img, id, createdAt }) => {
  const timeAgo = useTimeAgo(createdAt);
  const router = useRouter();

  const handleArticleClick = e => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  return (
    <article onClick={handleArticleClick} className={styles.article}>
      <div className={styles.div}>
        <Avatar alt={userName} src={avatar} />
      </div>
      <section>
        <header>
          <strong>{userName}</strong>
          <span> . </span>
          <Link href={`/status/${id}`}>
            <a className={styles.a}>
              <time>{timeAgo}</time>
            </a>
          </Link>
        </header>
        <p className={styles.p}>{content}</p>
        {img && <img className={styles.img} src={img} />}
      </section>
    </article>
  );
};

export default Devit;
