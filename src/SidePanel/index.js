import React from 'react';
import { getPersona } from '../bot';
import styles from './styles.module.css';

function SidePanel({
  chats,
  conversations,
  activeId,
  view,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onShowFeedback,
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.brand}>
        <span className={styles.brandmark}>🎲</span>
        <div>
          <div className={styles.brandname}>Banter</div>
          <div className={styles.brandsub}>random chats, random friends</div>
        </div>
      </div>

      <button type="button" className={styles.newchat} onClick={onNewChat}>
        <span className={styles.newchatplus}>+</span> New random chat
      </button>

      <div className={styles.chatsview}>
        {chats.length === 0 && (
          <div className={styles.empty}>
            No chats yet.
            <br />
            Roll the dice above 🎲
          </div>
        )}
        {chats.map((chat) => {
          const persona = getPersona(chat.persona);
          const convo = conversations[chat.id];
          return (
            <div
              key={chat.id}
              className={`${styles.chatitem} ${chat.id === activeId ? styles.chatitemActive : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <span className={styles.chatemoji} style={{ background: `${persona.color}22` }}>
                {persona.emoji}
              </span>
              <div className={styles.chatmeta}>
                <div className={styles.chatname}>{chat.name}</div>
                <div className={styles.chatsub}>
                  with {persona.name}
                  {convo?.ended ? ' · ended' : ''}
                </div>
              </div>
              <button
                type="button"
                className={styles.delete}
                title="Delete chat"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={`${styles.feedbacknav} ${view === 'feedback' ? styles.feedbacknavActive : ''}`}
        onClick={onShowFeedback}
      >
        ⭐ Feedback board
      </button>
    </div>
  );
}

export default SidePanel;
