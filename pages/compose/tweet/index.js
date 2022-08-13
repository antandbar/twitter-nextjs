import { useState } from 'react';
import useUser from '../../../hooks/userUser';
import AppLayout from '../../../components/appLayout';
import Button from '../../../components/Button';
import styles from './Tweet.module.css';
import { addDevit } from '../../../firebase/client';
import { useRouter } from 'next/router';

const COMPOSE_STATES = {
    USER_NOT_KNOWN:0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1,
}

const ComposeTweet = () => {
  const user = useUser();
const router = useRouter();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

    const handleChange = (e) => {
        const { value } = e.target;
        setMessage(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(COMPOSE_STATES.LOADING);
        addDevit({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.userName,
        }).then(() => {
            router.push('/home');
        }
        ).catch((err) => {
            console.log(err);
            setStatus(COMPOSE_STATES.ERROR);
        }
        );
    }

    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea onChange={handleChange}
            className={styles.textarea}
            placeholder="¿Qué esta pasando?"
            value={message}
          />
          <div className={styles.div}>
            <Button disabled={isButtonDisabled} >Devitear</Button>
          </div>
        </form>
      </AppLayout>
    </>
  );
};

export default ComposeTweet;
