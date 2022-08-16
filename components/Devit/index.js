import Avatar from '../Avatar';
import useTimeAgo from '../../hooks/useTimeAgo';
import styles from './Devit.module.css';

const Devit = ({ avatar, userName, content, img, id, createdAt }) => {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <article className={styles.article}>
      <div className={styles.div}>
        <Avatar alt={userName} src={avatar} />
      </div>
      <section>
        <header>
          <strong>{userName}</strong>
          <span> . </span>
          <time className={styles.date}>{timeAgo}</time>
        </header>
        <p className={styles.p}>{content}</p>
        {img && <img className={styles.img} src={img} />}
      </section>
    </article>
  );
};

export default Devit;
