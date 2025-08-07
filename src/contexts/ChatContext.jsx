import React, { createContext, useContext, useState } from 'react';
import { useSyncedLocalStorage } from '@/hooks/useSyncedLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { moderateMessage } from '@/lib/chat-moderation';
import { toast } from '@/components/ui/use-toast';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useSyncedLocalStorage('chat-messages', []);

  const getMessagesForQuote = (quoteId) => {
    return messages.filter(msg => msg.quoteId === quoteId).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const sendMessage = ({ quoteId, senderId, text }) => {
    const moderationResult = moderateMessage(text);

    if (!moderationResult.isAllowed) {
      toast({
        variant: "destructive",
        title: "Mensagem Bloqueada",
        description: `Sua mensagem não foi enviada. ${moderationResult.reason}`,
      });
      return false;
    }

    const newMessage = {
      id: uuidv4(),
      quoteId,
      senderId,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return true;
  };

  const value = {
    getMessagesForQuote,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};