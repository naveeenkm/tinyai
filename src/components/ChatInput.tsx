
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/contexts/ChatContext';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addMessage } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSendMessage = () => {
    if (!input.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    addMessage(input.trim());
    setInput('');
    
    // Reset after a brief delay to show loading state
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border border-deepseek-border rounded-lg p-2 bg-white shadow-sm max-w-3xl mx-auto mb-4">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="resize-none pr-12 min-h-[56px] max-h-[200px] border-none focus:ring-0 focus-visible:ring-0 focus:outline-none"
          disabled={isSubmitting}
        />
        
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || isSubmitting}
          className="absolute bottom-1 right-1 h-8 w-8 p-0 deepseek-gradient rounded-md"
          aria-label="Send message"
        >
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
