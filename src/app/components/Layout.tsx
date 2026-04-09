import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const { isAuthenticated, logout, profile } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  const publicNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/feedbacks', label: 'Client Feedbacks' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' },
  ];

  const adminNavLinks = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/inquiries', label: 'Inquiries' },
    { path: '/admin/portfolio', label: 'Portfolio' },
    { path: '/admin/resume', label: 'Resume' },
    { path: '/admin/services', label: 'Services' },
    { path: '/admin/profile', label: 'Profile' },
    { path: '/admin/faq', label: 'FAQ' },
    { path: '/admin/agreement', label: 'Agreement' },
    { path: '/admin/transactions', label: 'Transactions' },
    { path: '/admin/contacts', label: 'Contacts' },
    { path: '/admin/rules', label: 'Rules' },
    { path: '/admin/password', label: 'Password' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isAdminRoute && isAuthenticated ? adminNavLinks : publicNavLinks;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#147884' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Name */}
            <Link to="/" className="flex items-center gap-3">
              {!isAdminRoute && (
                <img 
                  src={profile.profilePicture} 
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: '#00FFFF' }}
                />
              )}
              <div>
                <h1 className="font-bold text-xl" style={{ color: '#00FFFF' }}>
                  {profile.name}
                </h1>
                <p className="text-sm" style={{ color: '#FFFFFF' }}>
                  {profile.profession}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    location.pathname === link.path
                      ? 'font-semibold'
                      : 'hover:opacity-80'
                  }`}
                  style={{ 
                    color: location.pathname === link.path ? '#00FFFF' : '#FFFFFF' 
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {!isAdminRoute && !isAuthenticated && (
                <Link to="/login">
                  <Button 
                    variant="outline"
                    style={{ 
                      borderColor: '#00FFFF',
                      color: '#00FFFF'
                    }}
                    className="hover:bg-opacity-10"
                  >
                    Admin Login
                  </Button>
                </Link>
              )}
              
              {isAuthenticated && (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  style={{ 
                    borderColor: '#00FFFF',
                    color: '#00FFFF'
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
              style={{ color: '#00FFFF' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t" style={{ borderColor: '#147884' }}>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 transition-colors ${
                      location.pathname === link.path
                        ? 'font-semibold'
                        : 'hover:opacity-80'
                    }`}
                    style={{ 
                      color: location.pathname === link.path ? '#00FFFF' : '#FFFFFF' 
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {!isAdminRoute && !isAuthenticated && (
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2"
                  >
                    <Button 
                      variant="outline"
                      className="w-full"
                      style={{ 
                        borderColor: '#00FFFF',
                        color: '#00FFFF'
                      }}
                    >
                      Admin Login
                    </Button>
                  </Link>
                )}
                
                {isAuthenticated && (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    style={{ 
                      borderColor: '#00FFFF',
                      color: '#00FFFF'
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t mt-20" style={{ borderColor: '#147884' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center" style={{ color: '#FFFFFF' }}>
            <p>&copy; 2026 {profile.name}. All rights reserved.</p>
            <p className="mt-2 text-sm" style={{ color: '#00FFFF' }}>
              {profile.profession}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
