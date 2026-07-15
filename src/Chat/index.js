import React, { useState } from 'react';
import uuid from 'react-uuid';
import Messages from '../Messages';
import { getBotReply, getPersona, getSurprisePrompt, typingDelay, PERSONAS } from '../bot';
import styles from './styles.module.css';

function Chat({ chat, conversation, updateConversation, renameChat, onNewChat }) {
  const [inputmessage, setinputmessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [toast, setToast] = useState('');

  const persona = chat ? getPersona(chat.persona) : null;

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(''), 2200);
  };

  const appendMessage = (chatId, message) => {
    updateConversation(chatId, (c) => ({ ...c, messages: [...c.messages, message] }));
  };

  const sendMessage = (raw) => {
    const text = (raw ?? inputmessage).trim();
    if (!text || !chat || conversation.ended || typing) return;

    const chatId = chat.id;
    const isFirstUserMessage = !conversation.messages.some((m) => m.type === 'user');
    appendMessage(chatId, { id: uuid(), type: 'user', text, time: Date.now() });
    if (isFirstUserMessage) {
      renameChat(chatId, text.length > 30 ? `${text.slice(0, 30)}…` : text);
    }
    setinputmessage('');
    setTyping(true);

    const { text: replyText, followUp } = getBotReply(text, chat.persona);
    setTimeout(() => {
      appendMessage(chatId, { id: uuid(), type: 'bot', text: replyText, liked: null, time: Date.now() });
      if (followUp) {
        setTimeout(() => {
          appendMessage(chatId, { id: uuid(), type: 'bot', text: followUp, liked: null, time: Date.now() });
          setTyping(false);
        }, typingDelay());
      } else {
        setTyping(false);
      }
    }, typingDelay());
  };

  const handleLike = (messageId, value) => {
    updateConversation(chat.id, (c) => ({
      ...c,
      messages: c.messages.map((m) =>
        m.id === messageId ? { ...m, liked: m.liked === value ? null : value } : m
      ),
    }));
  };

  const handleShare = () => {
    const lines = conversation.messages.map(
      (m) => `${m.type === 'user' ? 'You' : `${persona.name} ${persona.emoji}`}: ${m.text}`
    );
    const transcript = `🎲 Banter — chat with ${persona.name}\n${'—'.repeat(24)}\n${lines.join('\n')}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(transcript).then(
        () => showToast('Transcript copied to clipboard! 📋'),
        () => showToast('Could not copy — sorry!')
      );
    } else {
      showToast('Sharing is not supported in this browser');
    }
  };

  const submitFeedback = (skip) => {
    updateConversation(chat.id, (c) => ({
      ...c,
      ended: true,
      feedback: skip ? c.feedback : { rating, text: feedbackText.trim(), at: Date.now() },
    }));
    setFeedbackOpen(false);
    if (!skip) showToast('Thanks for the feedback! 💜');
  };

  if (!chat || !conversation) {
    return (
      <div className={styles.hero}>
        <div className={styles.herodice}>🎲</div>
        <h1 className={styles.herotitle}>Meet someone new</h1>
        <p className={styles.herosub}>
          Every chat pairs you with a random AI persona. You never know who picks up.
        </p>
        <div className={styles.personarow}>
          {Object.values(PERSONAS).map((p) => (
            <div key={p.id} className={styles.personachip} style={{ borderColor: `${p.color}55` }}>
              <span className={styles.personaemoji}>{p.emoji}</span>
              <span>
                <b>{p.name}</b> · {p.tagline}
              </span>
            </div>
          ))}
        </div>
        <button type="button" className={styles.herobutton} onClick={onNewChat}>
          🎲 Roll a new chat
        </button>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerleft}>
          <span className={styles.headeremoji} style={{ background: `${persona.color}22` }}>
            {persona.emoji}
          </span>
          <div>
            <div className={styles.headername}>{persona.name}</div>
            <div className={styles.headerstatus}>
              {conversation.ended ? 'chat ended' : typing ? 'typing…' : persona.tagline}
            </div>
          </div>
        </div>
        <div className={styles.headeractions}>
          <button type="button" className={styles.ghostbutton} onClick={handleShare}>
            ⇪ Share
          </button>
          {!conversation.ended && (
            <button
              type="button"
              className={styles.ghostbutton}
              onClick={() => setFeedbackOpen(true)}
            >
              ◼ End chat
            </button>
          )}
        </div>
      </div>

      <div className={styles.upper}>
        <Messages
          messages={conversation.messages}
          persona={persona}
          typing={typing}
          onLike={handleLike}
        />
      </div>

      {feedbackOpen && !conversation.ended && (
        <div className={styles.feedback}>
          <div className={styles.feedbacktitle}>How was chatting with {persona.name}?</div>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.star} ${n <= rating ? styles.starActive : ''}`}
                onClick={() => setRating(n)}
              >
                ★
              </button>
            ))}
          </div>
          <input
            className={styles.feedback_input}
            placeholder="Anything to add? (optional)"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <div className={styles.feedbackactions}>
            <button
              type="button"
              className={styles.primarybutton}
              disabled={rating === 0}
              onClick={() => submitFeedback(false)}
            >
              Submit & end chat
            </button>
            <button type="button" className={styles.ghostbutton} onClick={() => submitFeedback(true)}>
              End without feedback
            </button>
            <button type="button" className={styles.ghostbutton} onClick={() => setFeedbackOpen(false)}>
              Keep chatting
            </button>
          </div>
        </div>
      )}

      {conversation.ended ? (
        <div className={styles.endedbar}>
          <span>
            This chat has ended.
            {conversation.feedback?.rating
              ? ` You rated it ${'★'.repeat(conversation.feedback.rating)}`
              : ''}
          </span>
          <button type="button" className={styles.primarybutton} onClick={onNewChat}>
            🎲 Roll a new chat
          </button>
        </div>
      ) : (
        <div className={styles.lower}>
          <button
            type="button"
            className={styles.dicebutton}
            title="Surprise me — send a random prompt"
            onClick={() => sendMessage(getSurprisePrompt())}
          >
            🎲
          </button>
          <input
            type="text"
            name="text"
            className={styles.input}
            value={inputmessage}
            onChange={(e) => setinputmessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder={`Say something to ${persona.name}…`}
            autoFocus
          />
          <button
            type="button"
            className={styles.sendbutton}
            disabled={!inputmessage.trim() || typing}
            onClick={() => sendMessage()}
          >
            Send ➤
          </button>
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}

export default Chat;
