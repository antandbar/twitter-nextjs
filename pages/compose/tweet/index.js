import { useEffect, useState } from 'react';
import useUser from '../../../hooks/userUser';
import Button from '../../../components/Button';
import styles from './Tweet.module.css';
import { addDevit, uploadImage } from '../../../firebase/client';
import { useRouter } from 'next/router';
import { getDownloadURL } from 'firebase/storage';
import Avatar from '../../../components/Avatar';

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

const ComposeTweet = () => {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (task) {
      task.on(
        'state_changed',
        snapshot => {
          /*             const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ); */
          /*             console.log("Upload is " + progress + "% done");
            setProgress(prog); */
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          alert(error);
        },
        () => {
          console.log('onComplete');

          getDownloadURL(task.snapshot.ref).then(url => setImgURL(url));
        },
      );
    }
  }, [task]);

  const handleChange = e => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleDragEnter = e => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.none);
  };

  const handleDrop = e => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];

    const task = uploadImage(file);
    setTask(task);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL,
    })
      .then(() => {
        router.push('/home');
      })
      .catch(err => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
        <section className={styles.section_form_container}>
          <section className={styles.section_avatar_container}>
            <Avatar src={user?.avatar}></Avatar>
          </section>
        </section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={
              drag === DRAG_IMAGE_STATES.DRAG_OVER
                ? styles.textareaDragOver
                : styles.textarea
            }
            placeholder="¿Qué esta pasando?"
            value={message}
          />
          {imgURL && (
            <section className={styles.section_remove_img}>
              <button className={styles.button} onClick={() => setImgURL(null)}>
                x
              </button>
              <img className={styles.img} src={imgURL}></img>
            </section>
          )}
          <div className={styles.div}>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
    </>
  );
};

export default ComposeTweet;
