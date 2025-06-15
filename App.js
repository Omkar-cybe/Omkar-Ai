import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input) return;
    setMessages([...messages, { type: 'user', text: input }]);

    try {
      const res = await fetch('https://omkar-ai-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Error contacting AI.' }]);
    }
    setInput('');
  };

  return (
    <div className="App">
      <h1>Omkar AI</h1>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.type}>{msg.text}</div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message" />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
