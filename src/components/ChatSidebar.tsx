import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { Chat } from '@/types';
import { Plus, MessageSquare, User, LogOut, Settings, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import api, { changePassword, deleteAccount } from '@/services/api';
import { Link } from 'react-router-dom';

const ChatSidebar = () => {
  const { chats, currentChat, createChat, selectChat } = useChat();
  const { user, logout } = useAuth();
  const bottomRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const dropdownRef = useRef(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
const [loading, setLoading] = useState(false);
const [confirmDeleteText, setConfirmDeleteText] = useState('');



  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll to bottom when new chat is created
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats.length]);

  // Format the date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Group chats by date
  const groupChatsByDate = () => {
    const groups = {};
    
    chats.forEach(chat => {
      const dateKey = formatDate(chat.createdAt);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(chat);
    });
    
    return Object.entries(groups);
  };

  const chatGroups = groupChatsByDate();
  
  // Format join date for profile
  const formatJoinDate = () => {
    if (!user?.joinedAt) return "Unknown join date";
    const date = new Date(user.joinedAt);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    setShowProfileModal(true);
  };

  const handleSettingsClick = () => {
    setShowDropdown(false);
    setShowSettingsModal(true);
  };

  return (
    <div className="h-full flex flex-col bg-deepseek-sidebar border-r border-deepseek-border pt-3">
      
      <div className="p-4">
        
       

         <div className="text-center text-lg font-semibold mb-4">
         
  {/* <img
    src="../public/assets/img/logo1.jpg" // Replace this with the actual path to your logo
    alt="Techmiya "
    className="mx-auto h-12" // Adjust height as needed
  /> */}

          
    TinyAI
  </div>
        
     
        <Button
          onClick={createChat}
          className="w-full deepseek-gradient flex items-center gap-2"
        >
          <Plus size={18} />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {chatGroups.map(([date, groupChats]) => (
            <div key={date} className="mb-4">
              <h3 className="text-xs text-deepseek-gray font-medium px-2 mb-1">
                {date}
              </h3>
              <div className="space-y-0.5">
                {groupChats.map(chat => (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    onClick={() => selectChat(chat.id)}
                    className={`w-full justify-start text-left px-2 py-2 h-auto text-sm ${
                      currentChat?.id === chat.id
                        ? 'bg-deepseek-hover text-deepseek-blue'
                        : 'text-deepseek-gray hover:bg-deepseek-hover'
                    }`}
                  >
                    <MessageSquare size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t border-deepseek-border p-2 mt-auto relative">
        <div 
          className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-deepseek-hover rounded-md"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || user.email}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <User size={16} className="text-gray-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        {showChangePasswordModal && (
  <>
    {/* Desktop Modal - hidden on mobile */}
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden lg:flex items-center justify-center">
      <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-96 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const currentPassword = form.currentPassword.value;
            const newPassword = form.newPassword.value;

            if (currentPassword === newPassword) {
              toast.error('New password cannot be the same as the old password');
              return;
            }

            setLoading(true);

            try {
              await changePassword({
                id: user.id,
                currentPassword,
                newPassword,
              });
              toast.success('Password changed successfully');
              setShowChangePasswordModal(false);
              setShowSettingsModal(true);
            } catch (error) {
              toast.error(error.response?.data?.message || 'Failed to change password');
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-4"
        >
          <input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            className="w-full p-2 border rounded dark:bg-deepseek-sidebar"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            className="w-full p-2 border rounded dark:bg-deepseek-sidebar"
            required
            minLength={6}
          />
          <div className="text-center">
                    <Link to="/forgot-password" className="text-deepseek-lightblue font-semibold hover:underline">
                      Dont Know Current Password?
                    </Link>
                  </div>

          <div className="flex gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowChangePasswordModal(false);
                setShowSettingsModal(true);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>

    {/* Mobile Modal - hidden on desktop */}
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center lg:hidden">
    <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-[120%] absolute ml-[130px] max-w-md lg:max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const currentPassword = form.currentPassword.value;
            const newPassword = form.newPassword.value;

            if (currentPassword === newPassword) {
              toast.error('New password cannot be the same as the old password');
              return;
            }

            setLoading(true);

            try {
              await changePassword({
                id: user.id,
                currentPassword,
                newPassword,
              });
              toast.success('Password changed successfully');
              setShowChangePasswordModal(false);
              setShowSettingsModal(true);
            } catch (error) {
              toast.error(error.response?.data?.message || 'Failed to change password');
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-4"
        >
          <input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            className="w-full p-2 border rounded dark:bg-deepseek-sidebar"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            className="w-full p-2 border rounded dark:bg-deepseek-sidebar"
            required
            minLength={6}
          />
           <div className="text-center">
                    <Link to="/forgot-password" className="text-deepseek-lightblue font-semibold hover:underline">
                      Dont Know Current Password?
                    </Link>
                  </div>

          <div className="flex gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowChangePasswordModal(false);
                setShowSettingsModal(true);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  </>
)}

{showDeleteConfirmModal && (
  <>
   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden lg:flex items-center justify-center">
      <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-96 max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Account</h2>
      <p className="text-sm text-gray-700 mb-2">
        This action is irreversible. Type <strong>delete</strong> below to confirm.
      </p>
      <input
        type="text"
        value={confirmDeleteText}
        onChange={(e) => setConfirmDeleteText(e.target.value)}
        placeholder="Type 'delete' to confirm"
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex gap-2">
        <Button
          variant="destructive"
          className="w-full"
          disabled={confirmDeleteText !== 'delete' || loading}
          onClick={async () => {
            setLoading(true);  // Start loading

            try {
              await deleteAccount(user.id);  // Call delete account function
              logout();
              toast.success('Account deleted');
              setShowDeleteConfirmModal(false);
            } catch (error) {
              toast.error('Failed to delete account');
            } finally {
              setLoading(false);  // Stop loading after operation completes
            }
          }}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setShowDeleteConfirmModal(false);
            setConfirmDeleteText('');
            setShowSettingsModal(true);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  </div>
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center lg:hidden">
    <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-[120%] absolute ml-[130px] max-w-md lg:max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Account</h2>
      <p className="text-sm text-gray-700 mb-2">
        This action is irreversible. Type <strong>delete</strong> below to confirm.
      </p>
      <input
        type="text"
        value={confirmDeleteText}
        onChange={(e) => setConfirmDeleteText(e.target.value)}
        placeholder="Type 'delete' to confirm"
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex gap-2">
        <Button
          variant="destructive"
          className="w-full"
          disabled={confirmDeleteText !== 'delete' || loading}
          onClick={async () => {
            setLoading(true);  // Start loading

            try {
              await deleteAccount(user.id);  // Call delete account function
              logout();
              toast.success('Account deleted');
              setShowDeleteConfirmModal(false);
            } catch (error) {
              toast.error('Failed to delete account');
            } finally {
              setLoading(false);  // Stop loading after operation completes
            }
          }}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setShowDeleteConfirmModal(false);
            setConfirmDeleteText('');
            setShowSettingsModal(true);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  </div>
  </>
)}


        
        {/* Dropdown Menu */}
        {showDropdown && (
          <div 
            ref={dropdownRef}
            className="absolute bottom-14 left-2 bg-white dark:bg-deepseek-sidebar border border-deepseek-border shadow-lg rounded-md w-56 py-1 z-50"
          >
            <button 
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-deepseek-hover text-sm"
            >
              <UserCircle size={16} />
              My Profile
            </button>
            <button 
              onClick={handleSettingsClick}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-deepseek-hover text-sm"
            >
              <Settings size={16} />
              Settings
            </button>
            <div className="border-t border-deepseek-border my-1"></div>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-deepseek-hover text-red-500 text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}

        {/* Profile Modal */}
       {showProfileModal && (
  <>
    {/* Web Modal */}
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden lg:flex items-center justify-center">
  <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-80 max-w-md">
    <h2 className="text-lg font-semibold mb-4">My Profile</h2>
    <div className="flex items-center gap-4 mb-4">
      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || user.email}
            className="h-16 w-16 rounded-full"
          />
        ) : (
          <User size={24} className="text-gray-500" />
        )}
      </div>
      <div>
        <p className="font-medium">{user?.name || 'User'}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
    </div>
    <div className="mb-4">
      <p className="text-sm text-gray-500">Joined</p>
      <p>{formatJoinDate()}</p>
    </div>
    <Button
      onClick={() => setShowProfileModal(false)}
      className="w-full"
    >
      Close
    </Button>
  </div>
</div>

{/* Mobile Modal */}
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center lg:hidden">
    <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 ml-[130px] w-80 mr-0 max-w-md">
      <h2 className="text-lg font-semibold mb-4">My Profile</h2>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || user.email}
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <User size={24} className="text-gray-500" />
          )}
        </div>
        <div>
          <p className="font-medium">{user?.name || 'User'}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Joined</p>
        <p>{formatJoinDate()}</p>
      </div>
      <Button
        onClick={() => setShowProfileModal(false)}
        className="w-full"
      >
        Close
      </Button>
    </div>
  </div>

  </>
)}


        {/* Settings Modal */}
        {showSettingsModal && (
          <>
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden lg:flex items-center justify-center">
  <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-80 max-w-md">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-3">
              <Button
  variant="outline"
  className="w-full justify-start text-left"
  onClick={() => {
    setShowSettingsModal(false);
    setShowChangePasswordModal(true);
  }}
>
  Change Password
</Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  Clear Chat History
                </Button>
                <Button
  variant="outline"
  className="w-full justify-start text-left text-red-500 hover:text-red-600"
  onClick={() => {
    setShowSettingsModal(false);
    setShowDeleteConfirmModal(true);
  }}
>
  Delete Account
</Button>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center lg:hidden">
    <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-[120%] absolute ml-[130px] max-w-md lg:max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start text-left"
          onClick={() => {
            setShowSettingsModal(false);
            setShowChangePasswordModal(true);
          }}
        >
          Change Password
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start text-left"
        >
          Clear Chat History
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start text-left text-red-500 hover:text-red-600"
          onClick={() => {
            setShowSettingsModal(false);
            setShowDeleteConfirmModal(true);
          }}
        >
          Delete Account
        </Button>
      </div>
      <div className="mt-4">
        <Button 
          onClick={() => setShowSettingsModal(false)}
          className="w-full"
        >
          Close
        </Button>
      </div>
    </div>
  </div>
          </>
        )}

        
      </div>
    </div>
  );
};

export default ChatSidebar;