import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Lock, Save } from 'lucide-react';
import { toast } from 'sonner';

export function AdminPassword() {
  const { isAuthenticated, password, updatePassword } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.currentPassword !== password) {
      toast.error('Current password is incorrect');
      return;
    }

    if (!formData.newPassword || formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    updatePassword(formData.newPassword);
    toast.success('Password updated successfully');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#00FFFF' }}>
          Change Password
        </h1>

        <Card className="p-8 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#147884' }}
            >
              <Lock className="w-6 h-6" style={{ color: '#00FFFF' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#00FFFF' }}>
                Update Your Password
              </h2>
              <p className="text-sm" style={{ color: '#FFFFFF' }}>
                Keep your account secure with a strong password
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword" style={{ color: '#FFFFFF' }}>
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="Enter current password"
                className="mt-2 border-2"
                style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                required
              />
            </div>

            <div className="h-px" style={{ backgroundColor: '#147884' }} />

            <div>
              <Label htmlFor="newPassword" style={{ color: '#FFFFFF' }}>
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Enter new password (min. 6 characters)"
                className="mt-2 border-2"
                style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                required
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" style={{ color: '#FFFFFF' }}>
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter new password"
                className="mt-2 border-2"
                style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: '#00FFFF', color: '#000000' }}
            >
              <Save className="mr-2 w-4 h-4" />
              Update Password
            </Button>
          </form>
        </Card>

        {/* Password Tips */}
        <Card className="mt-6 p-6 border-2" style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}>
          <h3 className="font-bold mb-3" style={{ color: '#00FFFF' }}>
            Password Security Tips
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: '#FFFFFF' }}>
            <li>• Use at least 8 characters</li>
            <li>• Include uppercase and lowercase letters</li>
            <li>• Add numbers and special characters</li>
            <li>• Avoid common words or personal information</li>
            <li>• Don't reuse passwords from other accounts</li>
            <li>• Change your password regularly</li>
          </ul>
        </Card>

        {/* Current Password Info */}
        <Card className="mt-6 p-6 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#00FFFF' }}>
                Current Password
              </h3>
              <p className="text-sm" style={{ color: '#FFFFFF' }}>
                For demo purposes, your current password is: <strong>admin123</strong>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
