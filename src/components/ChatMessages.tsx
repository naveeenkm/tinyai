import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/contexts/ChatContext';
import { Message as MessageType } from '@/types';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import DOMPurify from 'dompurify';

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

const ChatMessages = () => {
  const { currentChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userInitial, setUserInitial] = useState('U');

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';
      setUserInitial(initial);
    } catch {
      setUserInitial('U');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  
  if (!currentChat || currentChat.messages.length === 0) {
    return (
      <ScrollArea className="h-full">
        <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Logo/Brand Section */}
          <div className="text-center mb-12">
            {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
  <img src="../public/assets/img/logo1.jpg" alt="Techmiya Logo" className="w-full h-full object-contain" />
</div> */}

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-blue-600">TinyAI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your intelligent AI assistant ready to help with programming, science, mathematics, and knowledge exploration.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Programming</h3>
              <p className="text-gray-600 text-sm">
                Code assistance, debugging, architecture guidance, and best practices across multiple languages.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Science & Math</h3>
              <p className="text-gray-600 text-sm">
                Complex problem solving, research assistance, and detailed explanations of scientific concepts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">General Knowledge</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive answers on diverse topics, creative writing, and analytical thinking support.
              </p>
            </div>
          </div>

          {/* Quick Start Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get Started</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-3">💡 Example Questions:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    "Help me debug this React component"
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    "Explain quantum computing concepts"
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    "Design a database schema for my project"
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-3">🚀 Pro Tips:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Be specific with your questions for better results
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Include context and relevant details
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Ask follow-up questions to dive deeper
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Start a conversation by typing your question in the message box below
            </p>
          </div>
          </div>
        </div>
      </ScrollArea>
    );
  }

  // 🟩 NORMAL CHAT VIEW (NO IMAGE BACKGROUND)
  return (
    <ScrollArea className="h-full">
      <div className="pb-10 pt-4 px-4 h-full bg-white">
        {currentChat.messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isLastMessage={index === currentChat.messages.length - 1}
            userInitial={userInitial}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

interface MessageProps {
  message: MessageType;
  isLastMessage: boolean;
  userInitial: string;
}

const Message = ({ message, isLastMessage, userInitial }: MessageProps) => {
  const isUser = message.role === 'user';
  const htmlContent = DOMPurify.sanitize(marked.parse(message.content || ''));

  return (
    <div
      className={`py-6 ${!isLastMessage ? 'border-b border-deepseek-border' : ''} ${
        isUser ? 'bg-deepseek-message-user' : 'bg-deepseek-message-assistant'
      } bg-opacity-90`}
    >
      <div
        className={`max-w-3xl mx-auto flex gap-4 ${
          isUser ? 'flex-row-reverse text-right' : 'flex-row'
        }`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-deepseek-blue flex items-center justify-center text-white text-sm font-medium">
          {isUser ? userInitial : 'AI'}
        </div>
        <div className="flex-1">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
};


export default ChatMessages;

