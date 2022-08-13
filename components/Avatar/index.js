import styles from './Avatar.module.css';

const Avatar = ({ src, alt, text, withText }) => {
  return (
    <div className={styles.container}>
      <img src={src} title={alt} className={styles.avatar} />
      {withText && <strong> {text || alt}</strong>}
    </div>
  );
};

export default Avatar;
