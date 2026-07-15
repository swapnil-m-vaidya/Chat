import React, { useEffect, useRef } from 'react';
import Message from '../Message';
import styles from './styles.module.css';

function Messages({ messages = [], persona, typing, onLike }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, typing]);

  return (
    <div className={styles.list}>
      {messages.map((message) => (
        <Message key={message.id} message={message} persona={persona} onLike={onLike} />
      ))}
      {typing && (
        <div className={styles.typingrow}>
          <span className={styles.typingavatar} style={{ background: `${persona.color}22` }}>
            {persona.emoji}
          </span>
          <div className={styles.typingbubble}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default Messages;
