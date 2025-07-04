
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-full pt-10">
      <div className="flex-1 overflow-hidden">
        
        <ChatMessages />
        
      </div>
      <div className="pt-2 pb-6 px-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatContainer;
