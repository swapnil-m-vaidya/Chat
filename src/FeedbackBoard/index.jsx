import React from 'react';
import { getPersona } from '../bot';
import styles from './styles.module.css';

// Aggregates all conversation feedback in one place: per-chat star ratings,
// written feedback, and thumbs up/down totals on individual bot replies.
function FeedbackBoard({ chats, conversations }) {
  const rows = chats.map((chat) => {
    const convo = conversations[chat.id] || { messages: [], feedback: null };
    const likes = convo.messages.filter((m) => m.liked === true).length;
    const dislikes = convo.messages.filter((m) => m.liked === false).length;
    return { chat, convo, likes, dislikes };
  });

  const rated = rows.filter((r) => r.convo.feedback?.rating);
  const avgRating = rated.length
    ? (rated.reduce((sum, r) => sum + r.convo.feedback.rating, 0) / rated.length).toFixed(1)
    : '—';
  const totalLikes = rows.reduce((sum, r) => sum + r.likes, 0);
  const totalDislikes = rows.reduce((sum, r) => sum + r.dislikes, 0);

  return (
    <div className={styles.board}>
      <h1 className={styles.title}>⭐ Feedback board</h1>
      <p className={styles.subtitle}>Everything you've told the bots about themselves.</p>

      <div className={styles.statsrow}>
        <div className={styles.stat}>
          <div className={styles.statvalue}>{chats.length}</div>
          <div className={styles.statlabel}>chats</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statvalue}>{avgRating}</div>
          <div className={styles.statlabel}>avg rating</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statvalue}>👍 {totalLikes}</div>
          <div className={styles.statlabel}>liked replies</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statvalue}>👎 {totalDislikes}</div>
          <div className={styles.statlabel}>disliked replies</div>
        </div>
      </div>

      <div className={styles.cards}>
        {rows.length === 0 && (
          <div className={styles.empty}>Nothing here yet — go chat with someone first! 🎲</div>
        )}
        {rows.map(({ chat, convo, likes, dislikes }) => {
          const persona = getPersona(chat.persona);
          return (
            <div key={chat.id} className={styles.card}>
              <div className={styles.cardheader}>
                <span className={styles.cardemoji} style={{ background: `${persona.color}22` }}>
                  {persona.emoji}
                </span>
                <div className={styles.cardmeta}>
                  <div className={styles.cardname}>{chat.name}</div>
                  <div className={styles.cardsub}>
                    with {persona.name} · {convo.messages.length} messages
                    {convo.ended ? ' · ended' : ' · ongoing'}
                  </div>
                </div>
                <div className={styles.cardthumbs}>
                  {likes > 0 && <span>👍 {likes}</span>}
                  {dislikes > 0 && <span>👎 {dislikes}</span>}
                </div>
              </div>
              {convo.feedback?.rating ? (
                <div className={styles.cardbody}>
                  <div className={styles.cardstars}>
                    <span className={styles.starsOn}>{'★'.repeat(convo.feedback.rating)}</span>
                    <span className={styles.starsOff}>
                      {'★'.repeat(5 - convo.feedback.rating)}
                    </span>
                  </div>
                  {convo.feedback.text && (
                    <div className={styles.cardquote}>“{convo.feedback.text}”</div>
                  )}
                </div>
              ) : (
                <div className={styles.norating}>No rating yet — end the chat to leave one.</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeedbackBoard;
