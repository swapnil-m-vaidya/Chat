import React from 'react';
import styles from './styles.module.css';

const formatTime = (ts) =>
  ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

// Likes live on the message object itself (persisted with the conversation),
// so they survive chat switches and reloads.
const Message = ({ message, persona, onLike }) => {
  const { id, type, text, liked, time } = message;

  if (type === 'user') {
    return (
      <div className={`${styles.row} ${styles.rowUser}`}>
        <div className={styles.bubblewrap}>
          <div className={`${styles.bubble} ${styles.bubbleUser}`}>{text}</div>
          <div className={`${styles.time} ${styles.timeUser}`}>{formatTime(time)}</div>
        </div>
        <span className={`${styles.avatar} ${styles.avatarUser}`}>🙂</span>
      </div>
    );
  }

  if (type === 'bot') {
    return (
      <div className={styles.row}>
        <span className={styles.avatar} style={{ background: `${persona.color}22` }}>
          {persona.emoji}
        </span>
        <div className={styles.bubblewrap}>
          <div className={`${styles.bubble} ${styles.bubbleBot}`}>
            {text}
            <div className={`${styles.thumbs} ${liked !== null ? styles.thumbsPinned : ''}`}>
              <button
                type="button"
                title="Good response"
                className={liked === true ? styles.thumbActive : styles.thumb}
                onClick={() => onLike(id, true)}
              >
                👍
              </button>
              <button
                type="button"
                title="Bad response"
                className={liked === false ? styles.thumbActive : styles.thumb}
                onClick={() => onLike(id, false)}
              >
                👎
              </button>
            </div>
          </div>
          <div className={styles.time}>
            {persona.name} · {formatTime(time)}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Message;
