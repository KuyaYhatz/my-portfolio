import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

export function LoginPage() {
  const { login, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      toast.success('Login successful!');
      navigate('/admin');
    } else {
      toast.error('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card
        className="w-full max-w-md p-8 border-2"
        style={{ backgroundColor: '#000000', borderColor: '#147884' }}
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#147884' }}
          >
            <Lock className="w-8 h-8" style={{ color: '#00FFFF' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#00FFFF' }}>
            Admin Login
          </h1>
          <p style={{ color: '#FFFFFF' }}>
            Enter your password to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password" style={{ color: '#FFFFFF' }}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="mt-2 border-2"
              style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: '#00FFFF', color: '#000000' }}
          >
            Login
          </Button>
        </form>

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#147884' }}>
          <p className="text-sm text-center" style={{ color: '#FFFFFF' }}>
            <strong style={{ color: '#00FFFF' }}>Only authorized persons can log in to this page.</strong><br />
            Thank You!
          </p>
        </div>
      </Card>
    </div>
  );
}
