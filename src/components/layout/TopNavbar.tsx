import { useState, useRef, useEffect } from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { Button } from '../../components/button';

import codebiteLogoUrl from '../../assets/logo/Codebite logo.svg';
import expBarIconUrl from '../../assets/icon/navbar-exp-bar.svg';
import notificationIconUrl from '../../assets/icon/navbar-notification.svg';
import profileIconUrl from '../../assets/icon/navbar-profile.svg';
import themeIconUrl from '../../assets/icon/navbar-theme.svg';
import profileModeIconUrl from '../../assets/icon/navbar-profileMode.svg';
import logoutIconUrl from '../../assets/icon/navbar-logout.svg';

type NavbarItem = 'home' | 'practice-lab' | 'challenge' | 'coderush';

interface TopNavbarProps {
  activeItem?: NavbarItem;
  isLoggedIn?: boolean;
  username?: string;
}

const navItems = [
  { id: 'home', label: 'Home', href: '/home' },
  { id: 'practice-lab', label: 'Practice Lab', href: '#', disabled: true },
  { id: 'challenge', label: 'Challenge', href: '#', disabled: true },
  { id: 'coderush', label: 'CodeRush', href: '/coderush' },
] as const;

/* NAV LINKS */
const NavLinks = ({ activeItem, isLoggedIn }: TopNavbarProps) => (
  <nav className="flex items-center gap-1" aria-label="Main navigation">
    {navItems.map((item) => {
      const isActive = item.id === activeItem;
      const targetHref = isLoggedIn ? item.href : '/login';

      return (
        <a
          key={item.id}
          href={targetHref}
          className={`rounded-lg px-4 py-2 text-base transition ${
            isActive
              ? 'bg-primary-700/20 font-medium text-primary-900'
              : 'text-neutral-700 hover:bg-primary-700/10'
          } ${isLoggedIn && item.disabled ? 'opacity-70 cursor-default' : ''}`}
          onClick={(e) => {
            if (isLoggedIn && item.disabled) e.preventDefault();
          }}
        >
          {item.label}
        </a>
      );
    })}
  </nav>
);

/* USER MENU */
const UserProfileMenu = ({ username }: { username?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();

    setIsOpen(false);

    if (window.location.pathname === '/') {
      window.location.reload();
    } else {
      await router.invalidate();
      void navigate({ to: '/' });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen((v) => !v);
        }}
        className="flex items-center gap-3 rounded-xl px-3 py-1.5 hover:bg-primary-700/5"
      >
        <div className="flex flex-col items-center">
          <span className="font-bold text-neutral-900">
            {username ?? 'Username'}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-primary-900">
              LVL 15
            </span>
            <img src={expBarIconUrl} alt="EXP" className="h-1.5 w-16" />
          </div>
        </div>

        <div className="h-10 w-10 rounded-full overflow-hidden border bg-primary-900/20">
          <img src={profileIconUrl} alt="Profile" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 w-48 bg-white shadow-lg border rounded-md overflow-hidden">
          <Button
            variant="menu"
            onClick={() => {
              setIsOpen(false);
              void navigate({ to: '/profile' });
            }}
          >
            <img src={profileModeIconUrl} className="h-5 w-5" />
            Profile
          </Button>

          <Button variant="menu-danger" onClick={() => void handleLogout()}>
            <img src={logoutIconUrl} className="h-5 w-5" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

/* AUTH */
const AuthButtons = () => (
  <div className="flex gap-3">
    <Button href="/login" variant="white">
      Log In
    </Button>
    <Button href="/signup" variant="primary">
      Sign Up
    </Button>
  </div>
);

/* MAIN */
export function TopNavbar({
  activeItem,
  isLoggedIn = false,
  username,
}: TopNavbarProps) {
  return (
    <header className="flex justify-between items-center h-14 px-6 bg-primary-100">
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center gap-2">
          <img src={codebiteLogoUrl} className="h-10 w-10" />
          <span className="font-bold text-primary-700 text-2xl">CodeBite</span>
        </a>

        <NavLinks activeItem={activeItem} isLoggedIn={isLoggedIn} />
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="theme">
          <img src={themeIconUrl} className="h-6 w-6" />
        </button>

        <button aria-label="notifications">
          <img src={notificationIconUrl} className="h-5 w-5" />
        </button>

        {isLoggedIn ? <UserProfileMenu username={username} /> : <AuthButtons />}
      </div>
    </header>
  );
}
