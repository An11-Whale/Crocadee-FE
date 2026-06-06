import codebiteLogoUrl from '../../assets/logo/Codebite logo.svg';
import expBarIconUrl from '../../assets/icons/navbar-exp-bar.svg';
import notificationIconUrl from '../../assets/icons/navbar-notification.svg';
import profileIconUrl from '../../assets/icons/navbar-profile.svg';
import themeIconUrl from '../../assets/icons/navbar-theme.svg';

type NavbarItem = 'home' | 'practice-lab' | 'challenge' | 'coderush';

interface TopNavbarProps {
  activeItem?: NavbarItem;
}

const navItems: {
  id: NavbarItem;
  label: string;
  href: string;
  disabled?: boolean;
}[] = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'practice-lab',
    label: 'Practice Lab',
    href: '#',
    disabled: true,
  },
  { id: 'challenge', label: 'Challenge', href: '#', disabled: true },
  { id: 'coderush', label: 'CodeRush', href: '/coderush' },
];

export function TopNavbar({ activeItem = 'home' }: TopNavbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#CCC3D74D] bg-primary-100 px-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center justify-center">
          <img
            src={codebiteLogoUrl}
            alt="CodeBite logo"
            className="h-12.5 w-12.5 object-contain"
          />
          <span className="font-sans text-2xl font-bold leading-7 tracking-[-0.02em] text-primary-700">
            CodeBite
          </span>
        </div>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = item.id === activeItem;

            return (
              <a
                key={item.id}
                href={item.href}
                aria-disabled={item.disabled ? 'true' : undefined}
                className={`rounded-lg px-4 py-2 text-base leading-[1.6] transition ${
                  isActive
                    ? 'bg-primary-700/20 font-medium text-primary-900'
                    : 'font-normal text-[#4A4454] hover:bg-primary-700/10'
                } ${item.disabled ? 'cursor-default opacity-70' : ''}`}
                onClick={(event) => {
                  if (item.disabled) {
                    event.preventDefault();
                  }
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Light mode"
          className="flex h-10 w-10 items-center justify-center rounded-full p-2 text-[#4A4454] transition hover:bg-primary-700/10"
        >
          <img src={themeIconUrl} alt="" className="h-6 w-6" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full p-2 text-[#4A4454] transition hover:bg-primary-700/10"
        >
          <img src={notificationIconUrl} alt="" className="h-5 w-4" />
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-transparent bg-shade-white px-3 py-1.5"
        >
          <div className="flex flex-col items-end">
            <span className="text-base font-bold leading-3.5 tracking-[0.0088em] text-[#1C1B1B]">
              Username
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase leading-4 tracking-[0.05em] text-[#380080]">
                LVL 15
              </span>
              <img src={expBarIconUrl} alt="" className="h-1.5 w-16" />
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-900/30 bg-primary-900/20">
            <img src={profileIconUrl} alt="" className="h-6 w-6" />
          </div>
        </button>
      </div>
    </header>
  );
}
