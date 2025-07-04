import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { changePassword, deleteAccount } from '@/services/api';
import { User, UserCircle, Settings, LogOut } from 'lucide-react';

// Profile Modal Component
export const ProfileModal = ({ user, onClose }: { user: any; onClose: () => void }) => {
  const formatJoinDate = () => {
    if (!user?.joinedAt) return "Unknown join date";
    const date = new Date(user.joinedAt);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-full max-w-md">
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
        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
};

// Settings Modal Component
export const SettingsModal = ({ 
  onClose, 
  onChangePassword, 
  onDeleteAccount 
}: { 
  onClose: () => void; 
  onChangePassword: () => void; 
  onDeleteAccount: () => void; 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start text-left"
            onClick={onChangePassword}
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
            onClick={onDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
        <div className="mt-4">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Change Password Modal Component
export const ChangePasswordModal = ({ 
  userId, 
  onClose, 
  onSuccess 
}: { 
  userId: string; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-full max-w-md">
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
                id: userId,
                currentPassword,
                newPassword,
              });
              toast.success('Password changed successfully');
              onSuccess();
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

          <div className="flex gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Account Confirmation Modal
export const DeleteConfirmModal = ({ 
  userId, 
  onClose, 
  onSuccess 
}: { 
  userId: string; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-deepseek-sidebar rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Account</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          This action is irreversible. Type <strong>delete</strong> below to confirm.
        </p>
        <input
          type="text"
          value={confirmDeleteText}
          onChange={(e) => setConfirmDeleteText(e.target.value)}
          placeholder="Type 'delete' to confirm"
          className="w-full p-2 border rounded dark:bg-deepseek-sidebar mb-4"
        />
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="w-full"
            disabled={confirmDeleteText !== 'delete' || loading}
            onClick={async () => {
              setLoading(true);
              try {
                await deleteAccount(userId);
                toast.success('Account deleted');
                onSuccess();
              } catch (error) {
                toast.error('Failed to delete account');
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

// User Dropdown Menu Component (for reuse)
export const UserDropdownMenu = ({
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  onClose
}: {
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
  onClose: () => void;
}) => {
  return (
    <div className="absolute bottom-14 left-2 bg-white dark:bg-deepseek-sidebar border border-deepseek-border shadow-lg rounded-md w-56 py-1 z-50">
      <button 
        onClick={() => {
          onProfileClick();
          onClose();
        }}
        className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-deepseek-hover text-sm"
      >
        <UserCircle size={16} />
        My Profile
      </button>
      <button 
        onClick={() => {
          onSettingsClick();
          onClose();
        }}
        className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-deepseek-hover text-sm"
      >
        <Settings size={16} />
        Settings
      </button>
      <div className="border-t border-deepseek-border my-1"></div>
      <button 
        onClick={() => {
          onLogoutClick();
          onClose();
        }}
        className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-deepseek-hover text-red-500 text-sm"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};