import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, BarChart2, Map, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'REITs Project', path: '/reits', icon: BarChart2 },
    { name: 'CityVibe Project', path: '/cityvibe', icon: Map },
    { name: 'About', path: '/about', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-end">
        <div className="glass-morphism rounded-full px-1.5 py-1 flex items-center gap-0.5 pointer-events-auto shadow-sm border border-white/20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <item.icon size={13} strokeWidth={2.5} />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
