import React, { createContext, useState, useContext, useEffect } from 'react';
import { ChatContextType, Chat, Message } from '@/types';
import { console } from 'inspector';
import { sendMessageToAI } from '@/services/api';
import { marked } from 'marked';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const STORAGE_KEY = 'deepseek-chats';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  useEffect(() => {
    const storedChats = localStorage.getItem(STORAGE_KEY);
    if (storedChats) {
      const parsedChats = JSON.parse(storedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setCurrentChat(parsedChats[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    }
  }, [chats]);

  const createChat = () => {
    const now = Date.now();
    const newChat: Chat = {
      id: `chat-${now}`,
      title: 'New Chat',
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    setChats(prevChats => [newChat, ...prevChats]);
    setCurrentChat(newChat);
  };

  const selectChat = (chatId: string) => {
    const selectedChat = chats.find(chat => chat.id === chatId) || null;
    setCurrentChat(selectedChat);
  };

  const addMessage = async (content: string) => {
  if (!currentChat) return;

  const userMessage: Message = {
    id: `msg-${Date.now()}`,
    role: 'user',
    content,
    timestamp: Date.now(),
  };

  const updatedChat = {
    ...currentChat,
    messages: [...currentChat.messages, userMessage],
    updatedAt: Date.now(),
    title: currentChat.messages.length === 0 ? content.slice(0, 30) : currentChat.title,
  };

  setChats(prevChats =>
    prevChats.map(chat => (chat.id === currentChat.id ? updatedChat : chat))
  );
  setCurrentChat(updatedChat);

 try {
    const data = await sendMessageToAI(content);
    // console.log(data.reply);
  

   

    const assistantMessage: Message = {
  id: `msg-${Date.now()}`,
  role: 'assistant',
  content: marked.parse(data || 'Error: No response. Please try again later.'), // 👈 Format as HTML
  timestamp: Date.now(),
};

    const finalChat = {
      ...updatedChat,
      messages: [...updatedChat.messages, assistantMessage],
      updatedAt: Date.now(),
    };

    setChats(prevChats =>
      prevChats.map(chat => (chat.id === currentChat.id ? finalChat : chat))
    );
    setCurrentChat(finalChat);
  } catch (error) {
    const errorMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: 'Error: Unable to fetch response. Please try again later.',
      timestamp: Date.now(),
    };

    const errorChat = {
      ...updatedChat,
      messages: [...updatedChat.messages, errorMessage],
      updatedAt: Date.now(),
    };

    setChats(prevChats =>
      prevChats.map(chat => (chat.id === currentChat.id ? errorChat : chat))
    );
    setCurrentChat(errorChat);
  }
};

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        createChat,
        selectChat,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
