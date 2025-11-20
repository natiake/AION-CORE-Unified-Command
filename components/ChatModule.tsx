import React, { useState } from 'react';
import { Message, User } from '../types';
import { MOCK_MESSAGES } from '../constants';
import { Send, Lock, ShieldCheck } from 'lucide-react';

export const ChatModule: React.FC<{ user: User }> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      sender: user.name, // In a real app, this would be dynamic
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEncrypted: true,
      channel: 'General'
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-slate-850 p-3 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldCheck size={18} className="text-brand-safe" />
          <span className="font-mono font-bold text-sm text-slate-200">SECURE COMMS</span>
        </div>
        <span className="text-xs text-slate-500 uppercase tracking-wider">Encrypted AES-256</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => {
          const isMe = msg.sender === user.name;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                isMe 
                  ? 'bg-brand-blue/20 border border-brand-blue/30 text-blue-100 rounded-tr-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
              }`}>
                <div className="flex justify-between items-center mb-1 space-x-4">
                  <span className={`text-xs font-bold ${isMe ? 'text-brand-blue' : 'text-brand-accent'}`}>
                    {msg.sender}
                  </span>
                  {msg.isEncrypted && <Lock size={10} className="text-slate-400" />}
                </div>
                <p>{msg.content}</p>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-850 border-t border-slate-800">
        <div className="flex items-center space-x-2 bg-slate-950 rounded border border-slate-700 px-3 py-2 focus-within:border-brand-blue/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type secure message..."
            className="bg-transparent border-none outline-none flex-1 text-sm text-slate-200 placeholder-slate-600"
          />
          <button onClick={handleSend} className="text-brand-blue hover:text-blue-400 transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
