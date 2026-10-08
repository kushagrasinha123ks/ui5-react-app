import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, MapPinned, Plus, Menu, X, Wrench, CircleHelp } from 'lucide-react';

const navigation = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/requests', label: 'All requests', icon: ClipboardList },
  { to: '/locations', label: 'Locations', icon: MapPinned },
];

export default function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever navigation changes the route.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f5f7f4] text-slate-900 lg:flex">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight"><span className="brand-mark"><Wrench size={18} strokeWidth={2.4} /></span> SiteDesk</Link>
        <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)} className="rounded-xl border border-slate-200 p-2">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && <button type="button" aria-label="Close menu" className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <aside className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#112522] px-5 py-7 text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}>
        <Link to="/" className="flex items-center gap-3 px-2 text-xl font-extrabold tracking-tight"><span className="brand-mark"><Wrench size={19} strokeWidth={2.4} /></span> SiteDesk</Link>
        <div className="mx-2 mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace</div>
        <nav className="mt-3 space-y-1" aria-label="Main navigation">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? 'bg-[#d9f36a] text-[#112522]' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-7 border-t border-white/10 pt-6">
          <Link to="/requests/new" className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-bold text-[#112522] hover:bg-[#eaf7bd]"><Plus size={17} /> New request</Link>
        </div>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d9f36a]"><CircleHelp size={15} /> Demo workspace</div>
          <p className="mt-2 text-xs leading-5 text-slate-300">Requests are sample data. Your changes stay in this browser.</p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 xl:px-12">{children}</main>
      </div>
    </div>
  );
}
