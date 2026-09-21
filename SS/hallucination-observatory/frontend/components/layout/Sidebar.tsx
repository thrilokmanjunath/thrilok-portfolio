'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Beaker, Network, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Experiments', href: '/experiments', icon: Beaker },
    { name: 'Knowledge Graph', href: '/graph', icon: Network },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-full glass-panel border-r border-card-border flex flex-col pt-8 z-10">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold text-gradient tracking-tight">Observatory</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-accent/10 text-accent font-medium shadow-[0_0_15px_rgba(0,229,255,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
