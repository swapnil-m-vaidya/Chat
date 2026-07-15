import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Chat from './Chat';
import SidePanel from './SidePanel';
import { randomPersona, getIcebreaker } from './bot';
import { newId } from './utils/id';
import styles from './styles.module.css';

// Code-split: the feedback board only loads when someone opens it.
const FeedbackBoard = lazy(() => import('./FeedbackBoard'));

const STORAGE_KEY = 'random-chat-state-v1';

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.chats) && saved.conversations) return saved;
  } catch (e) {
    // corrupted storage — start fresh
  }
  return { chats: [], conversations: {} };
}

function App() {
  const [state, setState] = useState(loadState);
  const [activeId, setActiveId] = useState(null);
  const [view, setView] = useState('chat'); // 'chat' | 'feedback'

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const createChat = useCallback(() => {
    const id = newId();
    const persona = randomPersona();
    const chat = { id, name: 'New chat', persona: persona.id, createdAt: Date.now() };
    const opener = {
      id: newId(),
      type: 'bot',
      text: getIcebreaker(persona.id),
      liked: null,
      time: Date.now(),
    };
    setState((s) => ({
      chats: [chat, ...s.chats],
      conversations: {
        ...s.conversations,
        [id]: { messages: [opener], feedback: null, ended: false },
      },
    }));
    setActiveId(id);
    setView('chat');
  }, []);

  const deleteChat = useCallback((id) => {
    setState((s) => {
      const { [id]: removed, ...rest } = s.conversations;
      return { chats: s.chats.filter((c) => c.id !== id), conversations: rest };
    });
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const renameChat = useCallback((id, name) => {
    setState((s) => ({
      ...s,
      chats: s.chats.map((c) => (c.id === id ? { ...c, name } : c)),
    }));
  }, []);

  // updater receives the current conversation and returns the next one.
  // Stable identity so memoized children can skip re-renders.
  const updateConversation = useCallback((id, updater) => {
    setState((s) => {
      const current = s.conversations[id];
      if (!current) return s;
      return { ...s, conversations: { ...s.conversations, [id]: updater(current) } };
    });
  }, []);

  const selectChat = useCallback((id) => {
    setActiveId(id);
    setView('chat');
  }, []);

  const showFeedback = useCallback(() => setView('feedback'), []);

  const activeChat = state.chats.find((c) => c.id === activeId) || null;

  return (
    <div className={styles.app}>
      <div className={styles.leftpanel}>
        <SidePanel
          chats={state.chats}
          conversations={state.conversations}
          activeId={view === 'chat' ? activeId : null}
          view={view}
          onNewChat={createChat}
          onSelectChat={selectChat}
          onDeleteChat={deleteChat}
          onShowFeedback={showFeedback}
        />
      </div>
      <div className={styles.rightpanel}>
        {view === 'feedback' ? (
          <Suspense fallback={null}>
            <FeedbackBoard chats={state.chats} conversations={state.conversations} />
          </Suspense>
        ) : (
          <Chat
            key={activeId}
            chat={activeChat}
            conversation={activeChat ? state.conversations[activeChat.id] : null}
            updateConversation={updateConversation}
            renameChat={renameChat}
            onNewChat={createChat}
          />
        )}
      </div>
    </div>
  );
}

export default App;
