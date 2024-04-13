import { useState } from 'react';
import { IMessage } from '../../data/interfaces';
import { error } from 'console';
import styles from './showMessage.module.css';

export default function ShowMessage(props: IMessage) {
  const [message, setMessage] = useState<IMessage>({
    message: props.message,
    error: props.error,
  });

  return (
    <>
      <div>
        {message && (
          <p className={message.error ? styles.error : styles.success}>
            {message.message}
          </p>
        )}
      </div>
    </>
  );
}
