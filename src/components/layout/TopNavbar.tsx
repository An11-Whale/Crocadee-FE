import codebiteLogoUrl from '../../assets/logo/Codebite logo.svg';
import expBarIconUrl from '../../assets/icon/navbar-exp-bar.svg';
import notificationIconUrl from '../../assets/icon/navbar-notification.svg';
import profileIconUrl from '../../assets/icon/navbar-profile.svg';
import themeIconUrl from '../../assets/icon/navbar-theme.svg';
import { Button } from '../../components/button';

type NavbarItem = 'home' | 'practice-lab' | 'challenge' | 'coderush';

interface TopNavbarProps {
  activeItem?: NavbarItem;
  isLoggedIn?: boolean;
  username?: string;
}

const navItems: {
  id: NavbarItem;
  label: string;
  href: string;
  disabled?: boolean;
}[] = [
  { id: 'home', label: 'Home', href: '/home' },
  { id: 'practice-lab', label: 'Practice Lab', href: '#', disabled: true },
  { id: 'challenge', label: 'Challenge', href: '#', disabled: true },
  { id: 'coderush', label: 'CodeRush', href: '/coderush' },
];

/* 1. SUB-COMPONENT: NAV LINKS */
const NavLinks = ({ activeItem, isLoggedIn }: TopNavbarProps) => (
  <nav className="flex items-center gap-1" aria-label="Main navigation">
    {navItems.map((item) => {
      const isActive = item.id === activeItem;
      const targetHref = isLoggedIn ? item.href : '/login';

      return (
        <a
          key={item.id}
          href={targetHref}
          aria-disabled={isLoggedIn && item.disabled ? 'true' : undefined}
          className={`rounded-lg px-4 py-2 text-base leading-[1.6] transition ${
            isActive
              ? 'bg-primary-700/20 font-medium text-primary-900'
              : 'font-normal text-neutral-700 hover:bg-primary-700/10'
          } ${isLoggedIn && item.disabled ? 'cursor-default opacity-70' : ''}`}
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

/* SUB-COMPONENT: USER PROFILE MENU (AUTHENTICATED) */
const UserProfileMenu = ({ username }: { username?: string }) => (
  <button
    type="button"
    className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-1.5 cursor-pointer hover:bg-primary-700/5 transition"
  >
    <div className="flex flex-col items-center">
      <span className="text-base font-bold leading-3.5 tracking-[0.0088em] text-neutral-900">
        {username ?? 'Username'}
      </span>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase leading-4 tracking-[0.05em] text-primary-900">
          LVL 15
        </span>
        <img src={expBarIconUrl} alt="EXP" className="h-1.5 w-16" />
      </div>
    </div>
    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-900/30 bg-primary-900/20 overflow-hidden">
      <img
        src={profileIconUrl}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    </div>
  </button>
);

/* SUB-COMPONENT: AUTH BUTTONS (UNAUTHENTICATED) */
const AuthButtons = () => (
  <div className="flex items-center gap-3 pl-2">
    <Button href="/login" variant="white" className="py-2.5 h-11">
      Log In
    </Button>
    <Button href="/signup" variant="primary" className="py-2.5 h-11">
      Sign Up
    </Button>
  </div>
);

/* MAIN COMPONENT: TOP NAVBAR */
export function TopNavbar({
  activeItem,
  isLoggedIn = false,
  username,
}: TopNavbarProps) {
  return (
    <header className="flex h-14 items-center justify-between bg-primary-100 px-6">
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center justify-center">
          <img
            src={codebiteLogoUrl}
            alt="CodeBite logo"
            className="h-12.5 w-12.5 object-contain"
          />
          <span className="font-sans text-2xl font-bold leading-7 tracking-[-0.02em] text-primary-700">
            CodeBite
          </span>
        </a>
        <NavLinks activeItem={activeItem} isLoggedIn={isLoggedIn} />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Light mode"
          className="flex h-10 w-10 items-center justify-center rounded-full p-2 text-neutral-700 transition hover:bg-primary-700/10 cursor-pointer"
        >
          <img src={themeIconUrl} alt="Theme" className="h-6 w-6" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full p-2 text-neutral-700 transition hover:bg-primary-700/10 cursor-pointer"
        >
          <img
            src={notificationIconUrl}
            alt="Notifications"
            className="h-5 w-4"
          />
        </button>

        {isLoggedIn ? <UserProfileMenu username={username} /> : <AuthButtons />}
      </div>
    </header>
  );
}
