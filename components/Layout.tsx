

import React from 'react';
import { AppView, UserRole } from '../types';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  ArrowLeft,
  PackageCheck
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  userRole: UserRole;
  onLogout: () => void;
  lang: 'en' | 'ur';
  cartCount: number;
  onBack?: () => void; // Optional back handler
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onChangeView, 
  userRole, 
  onLogout,
  lang,
  cartCount,
  onBack
}) => {
  
  const NavItem = ({ view, icon: Icon, label, badge }: { view: AppView, icon: any, label: string, badge?: number }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => onChangeView(view)}
        className={`relative flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
          isActive ? 'text-brand-primary scale-110' : 'text-brand-muted hover:text-brand-dark'
        }`}
      >
        <div className="relative">
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            {badge ? (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {badge}
                </span>
            ) : null}
        </div>
        <span className="text-[10px] mt-1 font-medium">{label}</span>
      </button>
    );
  };

  const isDetailView = !!onBack;
  const isAdminView = currentView === AppView.ADMIN_DASHBOARD;

  return (
    <div className={`min-h-screen bg-brand-bg flex flex-col font-sans ${lang === 'ur' ? 'font-urdu' : ''}`}>
      {/* Top Header */}
      <header className={`sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm ${isDetailView ? 'bg-transparent border-none absolute w-full top-0' : ''}`}>
        <div className="flex items-center gap-3">
            {isDetailView ? (
                <button onClick={onBack} className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-gray-700">
                    <ArrowLeft size={22} />
                </button>
            ) : (
                <div className="flex items-center gap-2" onClick={() => onChangeView(AppView.HOME)}>
                    <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-primary/30">
                        H
                    </div>
                    <h1 className="text-xl font-serif font-bold brand-gradient-text tracking-wide">
                        Halal Rozi
                    </h1>
                </div>
            )}
        </div>
        
        {!isDetailView && (
            <div className="flex gap-2">
                {userRole === UserRole.ADMIN && !isAdminView && (
                    <button 
                    onClick={() => onChangeView(AppView.ADMIN_DASHBOARD)}
                    className={`p-2 rounded-full border border-gray-200 text-gray-400 hover:text-brand-primary hover:border-brand-primary`}
                    >
                        <Settings size={20} />
                    </button>
                )}
                {/* If in Admin View, show a "Close Admin" button essentially */}
                {isAdminView && (
                     <button 
                     onClick={() => onChangeView(AppView.HOME)}
                     className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 mr-1"
                     >
                         Exit Admin
                     </button>
                )}
                <button onClick={onLogout} className="p-2 text-red-500/80 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                    <LogOut size={20} />
                </button>
            </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto ${isDetailView || isAdminView ? 'pb-0' : 'pb-24 px-4 py-6'} ${isAdminView ? '' : 'max-w-2xl mx-auto w-full'} scrollbar-hide`}>
        {children}
      </main>

      {/* Bottom Navigation - Hide if in Product Detail View OR Admin View */}
      {!isDetailView && !isAdminView && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-1 px-2 z-50 rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center max-w-2xl mx-auto">
            <NavItem view={AppView.HOME} icon={Home} label={lang === 'ur' ? 'ہوم' : 'Home'} />
            <NavItem view={AppView.SHOP} icon={ShoppingBag} label={lang === 'ur' ? 'دکان' : 'Shop'} />
            
            {/* Center Action Button - Cart */}
            <div className="relative -top-6">
                <button 
                onClick={() => onChangeView(AppView.CART)}
                className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/40 border-4 border-white transform hover:scale-105 transition-transform"
                >
                <div className="relative">
                    <ShoppingCart size={24} fill="currentColor" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-brand-accent text-brand-dark text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-white">
                            {cartCount}
                        </span>
                    )}
                </div>
                </button>
            </div>

            <NavItem view={AppView.ORDERS} icon={PackageCheck} label={lang === 'ur' ? 'آرڈرز' : 'Orders'} />
            <NavItem view={AppView.PROFILE} icon={UserIcon} label={lang === 'ur' ? 'پروفائل' : 'Profile'} />
            </div>
        </nav>
      )}
    </div>
  );
};
