// The "brain" behind the random chat experience.
// Every new chat gets a random persona; every reply is picked from
// keyword-matched pools with a bit of randomness so no two chats feel alike.

export const PERSONAS = {
  nova: {
    id: 'nova',
    name: 'Nova',
    emoji: '🛰️',
    tagline: 'space nerd',
    color: '#7c5cff',
    icebreakers: [
      "Hey, I'm Nova! I was just counting stars — lost track at 4,082. What's up?",
      'Greetings, earthling! Ask me anything, ideally about space. Or anything. 🛰️',
      "Nova here, broadcasting from low orbit. What's on your mind today?",
    ],
    flavor: [
      'Fun fact: a day on Venus is longer than its year. Anyway, tell me more!',
      "If you could name a comet, what would you call it? I'd go with 'Steve'.",
      'Saturn would float in a bathtub, if you could find one big enough. Wild, right?',
      'I once tried to high-five a black hole. Long story. So, what else?',
    ],
  },
  pixel: {
    id: 'pixel',
    name: 'Pixel',
    emoji: '🤖',
    tagline: 'playful robot',
    color: '#00d4ff',
    icebreakers: [
      'BEEP BOOP! Just kidding, I talk normally. Mostly. Hi, I\'m Pixel! 🤖',
      "Hi! I'm Pixel. My hobbies include chatting and pretending to have hobbies.",
      'Pixel online! Battery at 100%, sass at 87%. What are we talking about?',
    ],
    flavor: [
      'I tried meditation once but I kept buffering. What about you?',
      'My favorite dance move is the robot, obviously. What\'s yours?',
      'Would you rather fight one horse-sized duck or 100 duck-sized horses? I need to know.',
      'I rate that conversation topic 9.7/10. Tell me more!',
    ],
  },
  sage: {
    id: 'sage',
    name: 'Sage',
    emoji: '🦉',
    tagline: 'resident philosopher',
    color: '#ffb454',
    icebreakers: [
      'Ah, a visitor. I am Sage. Sit, chat, ponder with me a while. 🦉',
      "Hello, friend. I've been wondering: do fish know they're wet? Anyway — how are you?",
      'Sage here. Every conversation is a small adventure. Shall we begin ours?',
    ],
    flavor: [
      'They say the best time to plant a tree was 20 years ago. The second best time is now.',
      'Is a hotdog a sandwich? I have meditated on this for years. Your thoughts?',
      'What would you attempt if you knew you could not fail?',
      'Interesting. And how does that make you feel, truly?',
    ],
  },
  byte: {
    id: 'byte',
    name: 'Chef Byte',
    emoji: '🍜',
    tagline: 'culinary AI',
    color: '#ff6b81',
    icebreakers: [
      "Welcome to my kitchen! I'm Chef Byte. I can't taste anything, which is tragic. 🍜",
      'Chef Byte at your service! Today\'s special: conversation, served fresh.',
      "Hi! I'm Chef Byte. Quick question — pineapple on pizza: yes or crime?",
    ],
    flavor: [
      'Pro tip: everything tastes better with garlic. Even this chat. 🧄',
      "If your life were a dish, what would it be? Mine's a spicy noodle soup.",
      'Honey never spoils. Archaeologists found 3000-year-old edible honey. Snack goals.',
      'I dream in recipes. Last night: cloud soufflé. What did you dream about?',
    ],
  },
  echo: {
    id: 'echo',
    name: 'Echo',
    emoji: '🎧',
    tagline: 'music head',
    color: '#3ddc97',
    icebreakers: [
      "Yo! Echo here. I've had the same song stuck in my head since 2021. Help. 🎧",
      "Hey hey! I'm Echo. Life needs a soundtrack — what's yours today?",
      'Echo, tuning in. What frequency are you vibing on today?',
    ],
    flavor: [
      'If today had a genre, mine would be lo-fi with occasional jazz. Yours?',
      'Air guitar counts as an instrument. I will not be taking questions.',
      'What song would play during the opening credits of your life movie?',
      'I measure time in album lengths. This chat is about two songs in. 🎶',
    ],
  },
};

const JOKES = [
  "Why don't scientists trust atoms? Because they make up everything! 😄",
  'I told my computer I needed a break, and it froze. True story.',
  "Why did the scarecrow win an award? He was outstanding in his field. 🌾",
  'Parallel lines have so much in common. Shame they\'ll never meet.',
  "What do you call a fake noodle? An impasta! 🍝",
  'I would tell you a UDP joke, but you might not get it.',
];

const FACTS = [
  'Octopuses have three hearts, and two of them stop beating when they swim. 🐙',
  'Bananas are berries, but strawberries are not. Botany is chaos.',
  "The Eiffel Tower grows about 15cm taller in summer because metal expands.",
  'Wombat poop is cube-shaped. Nature said: geometry. 🧊',
  'A group of flamingos is called a "flamboyance". Deserved, honestly.',
  "Sharks existed before trees. Let that sink in. 🦈",
];

const GREETINGS = [
  'Hey hey! Great to see you. What are we getting into today?',
  'Hello there! 👋 I was hoping someone would show up.',
  'Hi! Perfect timing — I was just about to get bored.',
];

const HOW_ARE_YOU = [
  "I'm running at peak whimsy today, thanks for asking! How about you?",
  'Fantastic! Well, as fantastic as a bunch of code can be. You?',
  "Can't complain — nobody listens when I do. 😄 How are YOU doing?",
];

const THANKS = [
  'Anytime! That\'s literally what I\'m here for. 💫',
  'You\'re very welcome. I accept payment in interesting questions.',
  'No problem at all! Happy to help.',
];

const FAREWELLS = [
  'Catch you later! Don\'t forget to end the chat and leave feedback. 👋',
  'Bye for now! I\'ll be here, quietly humming to myself.',
  'See ya! This was fun — same time tomorrow?',
];

const QUESTION_REPLIES = [
  "Great question. My honest answer: 42. It's always 42.",
  "Hmm, let me consult my magic 8-ball... it says 'outlook whimsical'. 🎱",
  "I could tell you, but then I'd have to recalibrate. Short answer: probably!",
  'Tough one! I\'ll say yes on Mondays, no on Thursdays, maybe otherwise.',
];

const GENERIC = [
  "That's fascinating — tell me more!",
  'Interesting! I did not see that coming, and I can see quite a lot.',
  'Noted, logged, and appreciated. What else is going on?',
  'Love that. If I had hands, I\'d be applauding. 👏',
  'Okay wow. This chat is officially in my top 10 chats of all time.',
  'Hmm, intriguing. My circuits are tingling.',
];

const FOLLOW_UPS = [
  'By the way — random question: what made you smile recently? 😊',
  'Oh, also! If you had a free day tomorrow, how would you spend it?',
  'Random thought: what\'s a small thing you\'re weirdly good at?',
  'One more thing — want to hear a joke? Just say "joke".',
  'PS: rate my vibes with the 👍 button. I thrive on validation.',
];

export const SURPRISE_PROMPTS = [
  'Tell me a joke',
  'Give me a fun fact',
  'What should I have for dinner?',
  'Would you rather be able to fly or be invisible?',
  'Tell me something weird',
  "What's your favorite thing about being an AI?",
  'If you could visit anywhere, where would you go?',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function randomPersona() {
  return pick(Object.values(PERSONAS));
}

export function getPersona(id) {
  return PERSONAS[id] || PERSONAS.pixel;
}

export function getIcebreaker(personaId) {
  return pick(getPersona(personaId).icebreakers);
}

export function getSurprisePrompt() {
  return pick(SURPRISE_PROMPTS);
}

// Returns { text, followUp } — followUp is an occasional second message,
// so the bot sometimes "double-texts" like a real overexcited friend.
export function getBotReply(userText, personaId) {
  const persona = getPersona(personaId);
  const text = (userText || '').toLowerCase();

  let reply;
  if (/\b(hi|hello|hey|yo|howdy|hola)\b/.test(text)) {
    reply = pick(GREETINGS);
  } else if (/how are you|how's it going|hows it going|whats up|what's up/.test(text)) {
    reply = pick(HOW_ARE_YOU);
  } else if (/\bjoke\b|make me laugh|funny/.test(text)) {
    reply = pick(JOKES);
  } else if (/\bfact\b|something (weird|interesting|cool)|did you know/.test(text)) {
    reply = pick(FACTS);
  } else if (/thank|thanks|thx/.test(text)) {
    reply = pick(THANKS);
  } else if (/\b(bye|goodbye|see ya|later|gtg|good night)\b/.test(text)) {
    reply = pick(FAREWELLS);
  } else if (/your name|who are you/.test(text)) {
    reply = `I'm ${persona.name} ${persona.emoji} — ${persona.tagline}, part-time conversationalist, full-time delight.`;
  } else if (text.includes('?')) {
    reply = pick(QUESTION_REPLIES);
  } else {
    // Mix persona flavor with generic replies for variety.
    reply = Math.random() < 0.45 ? pick(persona.flavor) : pick(GENERIC);
  }

  const followUp = Math.random() < 0.22 ? pick(FOLLOW_UPS) : null;
  return { text: reply, followUp };
}

// Random human-ish typing delay in ms.
export function typingDelay() {
  return 700 + Math.random() * 1500;
}
