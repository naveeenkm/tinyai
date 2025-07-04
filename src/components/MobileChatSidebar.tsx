
import { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const MobileChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-1 left-2 z-10 w-12 h-12"
      >
        <Menu size={24} />
      </Button>
      
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 z-30 transform transition-transform lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ChatSidebar />
      </div>
    </>
  );
};

export default MobileChatSidebar;
