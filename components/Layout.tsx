
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
        className={`relative flex flex-col items-center justify-center w-full py-3 transition-all duration-300 group ${
          isActive ? 'text-brand-primary -translate-y-1' : 'text-gray-400 hover:text-brand-dark'
        }`}
      >
        <div className={`relative p-1.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-brand-light' : ''}`}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="transition-transform duration-300 group-hover:scale-110"/>
            {badge ? (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm border border-white">
                    {badge}
                </span>
            ) : null}
        </div>
        <span className={`text-[10px] mt-1 font-medium transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-0 h-0 overflow-hidden'}`}>{label}</span>
      </button>
    );
  };

  const isDetailView = !!onBack;
  const isAdminView = currentView === AppView.ADMIN_DASHBOARD;

  return (
    <div className={`min-h-screen bg-brand-bg flex flex-col font-sans selection:bg-brand-primary selection:text-white ${lang === 'ur' ? 'font-urdu' : ''}`}>
      {/* Top Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isDetailView ? 'bg-transparent pt-4 px-4' : 'glass-effect border-b border-gray-100/50 px-5 py-4 shadow-sm'}`}>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                {isDetailView ? (
                    <button onClick={onBack} className="p-2.5 bg-white/90 backdrop-blur-xl rounded-full shadow-lg hover:scale-105 transition-transform text-gray-800 border border-white/50">
                        <ArrowLeft size={22} />
                    </button>
                ) : (
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onChangeView(AppView.HOME)}>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-brand-primary/20">
                            H
                        </div>
                        <h1 className="text-xl font-serif font-bold text-brand-dark tracking-wide">
                            Halal Rozi
                        </h1>
                    </div>
                )}
            </div>
            
            {!isDetailView && (
                <div className="flex gap-2.5">
                    {userRole === UserRole.ADMIN && !isAdminView && (
                        <button 
                        onClick={() => onChangeView(AppView.ADMIN_DASHBOARD)}
                        className={`p-2 rounded-full bg-gray-100 text-gray-500 hover:text-brand-primary hover:bg-brand-light transition-colors`}
                        >
                            <Settings size={20} />
                        </button>
                    )}
                    {isAdminView && (
                         <button 
                         onClick={() => onChangeView(AppView.HOME)}
                         className="px-3 py-1.5 bg-gray-800 rounded-full text-xs font-bold text-white shadow-lg hover:bg-gray-900 transition-transform hover:scale-105"
                         >
                             Exit Admin
                         </button>
                    )}
                    <button onClick={onLogout} className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-full transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto ${isDetailView || isAdminView ? 'pb-0' : 'pb-28 px-4 py-6'} ${isAdminView ? '' : 'max-w-2xl mx-auto w-full'} scrollbar-hide`}>
        {children}
      </main>

      {/* Bottom Navigation - Floating Dock Style */}
      {!isDetailView && !isAdminView && (
        <nav className="fixed bottom-6 left-4 right-4 z-50 max-w-lg mx-auto">
            <div className="glass-effect rounded-3xl shadow-glass border border-white/40 flex justify-between items-center px-4 py-1.5 relative">
                <NavItem view={AppView.HOME} icon={Home} label={lang === 'ur' ? 'ہوم' : 'Home'} />
                <NavItem view={AppView.SHOP} icon={ShoppingBag} label={lang === 'ur' ? 'دکان' : 'Shop'} />
                
                {/* Center Action Button - Cart (Elevated) */}
                <div className="relative -top-8 mx-2">
                    <button 
                    onClick={() => onChangeView(AppView.CART)}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-white shadow-xl shadow-brand-primary/40 border-4 border-[#F3F4F6] transform active:scale-95 transition-all duration-300 group"
                    >
                    <div className="relative">
                        <ShoppingCart size={26} fill="currentColor" className="group-hover:animate-bounce" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-brand-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-brand-primary shadow-sm">
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
