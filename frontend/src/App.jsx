import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const chatEndRef = useRef(null);

  const { data: initialMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => (await axios.get('http://localhost:4000/api/messages')).data,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (initialMessages) setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    const onNewMessage = (newMessage) => setMessages((prev) => [...prev, newMessage]);
    const onTypingStart = (user) => setTypingUsers((prev) => [...new Set([...prev, user])]);
    const onTypingStop = (user) => setTypingUsers((prev) => prev.filter((u) => u !== user));

    socket.on('newMessage', onNewMessage);
    socket.on('typingStart', onTypingStart);
    socket.on('typingStop', onTypingStop);

    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('typingStart', onTypingStart);
      socket.off('typingStop', onTypingStop);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getTypingText = () => {
    if (typingUsers.length === 0) return null;
    if (typingUsers.length === 1) return `${typingUsers[0]} is typing...`;
    return `${typingUsers.join(', ')} are typing...`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md p-4 text-center">
        <h1 className="text-xl font-bold text-gray-800">Real-Time Chat</h1>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <p><strong className="text-gray-900">{msg.user}:</strong> {msg.message}</p>
              <p className="text-xs text-gray-400 ml-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="bg-white p-4 shadow-inner">
        <div className="max-w-2xl mx-auto">
          <div className="h-6 text-sm text-gray-500 italic">{getTypingText()}</div>
          <div className="flex items-center">
            <input type="text" placeholder="Type your message..." className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">Send</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;