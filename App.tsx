

import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AppView, UserRole, Product, CartItem, Order } from './types';
import { TEXTS, MOCK_PRODUCTS } from './constants';
import { generateProductDescription } from './services/geminiService';
import { 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  Wand2, 
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle,
  Package,
  Share2,
  ShoppingCart,
  Zap,
  ArrowRight,
  User,
  Store,
  MapPin,
  X,
  Star,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Info,
  Wallet,
  PackageCheck,
  Clock,
  Check,
  CalendarCheck,
  Lock,
  Code,
  Bell,
  LayoutDashboard,
  BarChart3,
  ListOrdered
} from 'lucide-react';

// --- Sub-components for Views ---

// 1. LOGIN VIEW
const LoginView: React.FC<{ onLogin: (role: UserRole) => void, lang: 'en'|'ur', setLang: any }> = ({ onLogin, lang, setLang }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // Auto OTP Simulation
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText(TEXTS.sendingOtp[lang]);
    
    // Simulate Network Delay for Sending SMS
    setTimeout(() => {
        setStep(2);
        setLoadingText(TEXTS.detectingOtp[lang]);
        
        // Simulate Auto-Read OTP (Automatic Logic)
        setTimeout(() => {
            setOtp('7860'); // Auto filled
            setLoading(false);
            
            // Auto Submit after filling
            setTimeout(() => {
                handleVerify(); 
            }, 800);
        }, 1500);
    }, 1500);
  };

  const handleVerify = (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(UserRole.USER);
    }, 500);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // INVITE ONLY SYSTEM: Hardcoded check for the "Owner's Invite Code"
    setTimeout(() => {
        setLoading(false);
        if (inviteCode === '786111') { // Secret Access Key Updated
            onLogin(UserRole.ADMIN);
        } else {
            alert(lang === 'ur' ? 'غلط انوائٹ کوڈ' : 'Invalid Invite Code');
        }
    }, 1000);
  };

  const handleGoogleLoginClick = () => {
    // Show account chooser instead of instant login
    setShowGoogleModal(true);
  };

  const handleGoogleAccountSelect = (email: string) => {
    setShowGoogleModal(false);
    setLoading(true);
    setLoadingText('Signing in as ' + email + '...');
    setTimeout(() => {
      setLoading(false);
      onLogin(UserRole.USER);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md bg-white border border-gray-100 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto bg-brand-light rounded-2xl flex items-center justify-center mb-4 transform rotate-3">
             <ShoppingBag size={40} className="text-brand-primary -rotate-3" />
          </div>
          <h1 className="text-3xl font-serif text-brand-dark mb-2">{TEXTS.welcome[lang]}</h1>
          <p className="text-brand-muted text-sm">{TEXTS.subtitle[lang]}</p>
        </div>

        {isAdminMode ? (
            // --- ADMIN LOGIN (Invite Only) ---
            <div className="animate-in fade-in slide-in-from-right">
                <div className="text-center mb-6">
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full border border-red-100 uppercase tracking-wide">
                        {TEXTS.adminLogin[lang]}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">Restricted Access. Invite Required.</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                        <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1">{TEXTS.phone[lang]}</label>
                        <input 
                            type="tel" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-brand-dark outline-none"
                            placeholder="0300 1234567"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 flex items-center gap-1">
                            <Lock size={12}/> {TEXTS.accessKey[lang]}
                        </label>
                        <input 
                            type="password" 
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                            placeholder={TEXTS.accessKeyPlaceholder[lang]}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 rounded-xl px-4 py-3 text-brand-dark outline-none transition-all"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-600/20 transition-all"
                    >
                        {loading ? 'Verifying Invite...' : 'Login as Admin'}
                    </button>
                    <button 
                        type="button"
                        onClick={() => setIsAdminMode(false)}
                        className="w-full text-gray-500 text-xs hover:text-gray-800 py-2"
                    >
                        &larr; Back to User Login
                    </button>
                </form>
            </div>
        ) : (
            // --- USER LOGIN (Google + Auto OTP) ---
            <div className="animate-in fade-in slide-in-from-left">
                {step === 1 ? (
                <div className="space-y-6">
                    {/* Google Login Button - Primary Option */}
                    <button 
                        onClick={handleGoogleLoginClick}
                        className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm group"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.2 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        {TEXTS.googleLogin[lang]}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">→</span>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-500">OR</span></div>
                    </div>

                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                        <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1">{TEXTS.phone[lang]}</label>
                        <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="0300 1234567"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3 text-brand-dark placeholder-gray-400 outline-none transition-all"
                            required
                        />
                        </div>
                        <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-primary/30 transition-all transform hover:-translate-y-1"
                        >
                        {loading ? loadingText : (lang === 'en' ? 'Continue with Phone' : 'فون کے ساتھ جاری رکھیں')}
                        </button>
                    </form>

                    <button 
                        onClick={() => setIsAdminMode(true)}
                        className="w-full text-center text-xs text-gray-400 hover:text-brand-primary mt-4"
                    >
                        Are you an Admin?
                    </button>
                </div>
                ) : (
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">{loading ? loadingText : 'Verifying...'}</p>
                    </div>
                    <div>
                    <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1">{TEXTS.otp[lang]}</label>
                    <input 
                        type="text" 
                        value={otp}
                        readOnly // Auto filled
                        className="w-full bg-gray-50 border border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3 text-brand-dark text-center tracking-[1em] font-bold text-xl outline-none transition-all"
                    />
                    </div>
                </div>
                )}
            </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-100 pt-6">
            <div className="flex gap-4">
                <button onClick={() => setLang('en')} className={`text-xs font-medium px-3 py-1 rounded-full ${lang === 'en' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>English</button>
                <button onClick={() => setLang('ur')} className={`text-xs font-medium px-3 py-1 rounded-full ${lang === 'ur' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>اردو</button>
            </div>
            
            {/* DEVELOPER BRANDING */}
            <div className="flex flex-col items-center mt-2 opacity-70">
                <div className="flex items-center gap-1.5 text-brand-dark">
                    <Code size={14} className="text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{TEXTS.developer[lang]}</span>
                </div>
            </div>
        </div>

        {/* GOOGLE LOGIN MODAL SIMULATION */}
        {showGoogleModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden scale-100 transition-all">
                    <div className="p-6 text-center border-b border-gray-100">
                        <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 mx-auto flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.2 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        </div>
                        <h3 className="text-gray-800 font-medium text-lg">Choose an account</h3>
                        <p className="text-gray-500 text-sm">to continue to Halal Rozi</p>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <button onClick={() => handleGoogleAccountSelect('aneeq@gmail.com')} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left group">
                            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">A</div>
                            <div>
                                <p className="text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors">M Aneeq Imtiaz</p>
                                <p className="text-xs text-gray-500">aneeq@gmail.com</p>
                            </div>
                        </button>
                        <button onClick={() => handleGoogleAccountSelect('user@example.com')} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left group">
                            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">U</div>
                            <div>
                                <p className="text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors">User</p>
                                <p className="text-xs text-gray-500">user@example.com</p>
                            </div>
                        </button>
                        <button onClick={() => handleGoogleAccountSelect('guest@gmail.com')} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left group">
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 bg-white">
                                <User size={20} />
                            </div>
                            <p className="text-sm font-medium text-gray-700 group-hover:text-brand-primary transition-colors">Use another account</p>
                        </button>
                    </div>
                    <div className="p-4 border-t border-gray-100 text-center">
                        <button onClick={() => setShowGoogleModal(false)} className="text-xs text-gray-500 hover:text-gray-800 font-medium">Cancel</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

// --- Product Card Grid Item (Clickable) ---
const ProductCard: React.FC<{ 
    product: Product, 
    lang: 'en'|'ur', 
    onClick: (p: Product) => void
}> = ({ product, lang, onClick }) => {
    return (
        <div 
            onClick={() => onClick(product)}
            className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer active:scale-[0.98]"
        >
            <div className="aspect-[3/4] relative bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-3 flex-1 flex flex-col">
                <h4 className="font-normal text-gray-800 line-clamp-2 text-xs mb-1 leading-4">{product.name}</h4>
                <div className="mt-auto">
                    <p className="text-brand-primary font-bold text-sm">Rs {product.price}</p>
                    <div className="flex items-center gap-1 mt-1">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[10px] text-gray-500">{product.rating} ({product.reviews})</span>
                        <span className="text-[10px] text-gray-400 ml-auto">{product.sold} Sold</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NEW PRODUCT DETAIL VIEW ---
const ProductDetailView: React.FC<{
    product: Product;
    lang: 'en' | 'ur';
    onAddToCart: (p: Product, profit: number) => void;
}> = ({ product, lang, onAddToCart }) => {
    const [modalState, setModalState] = useState<'none' | 'selection' | 'profit'>('none');
    const [profit, setProfit] = useState('');
    const [actionType, setActionType] = useState<'cart'|'share'|null>(null);

    const handleShare = () => {
        setActionType('share');
        setModalState('profit');
    };

    const handleAdd = () => {
        setActionType('cart');
        setModalState('selection');
    };

    const handleSelection = (mode: 'self' | 'customer') => {
        if (mode === 'self') {
            onAddToCart(product, 0);
            setModalState('none');
        } else {
            setModalState('profit');
        }
    };

    const confirmProfit = () => {
        const profitNum = parseInt(profit) || 0;
        
        if (actionType === 'share') {
            const finalPrice = product.price + profitNum;
            const text = `*${product.name}*\n\n${product.description}\n\n*Price: Rs ${finalPrice}*\n(Delivery: Rs 90)`;
            navigator.clipboard.writeText(text);
            alert(lang === 'ur' ? 'تفصیلات کاپی ہو گئیں!' : 'Details copied!');
        } else {
            onAddToCart(product, profitNum);
        }
        
        setModalState('none');
        setProfit('');
        setActionType(null);
    };

    return (
        <div className="pb-24 bg-gray-50 min-h-screen relative animate-in slide-in-from-right duration-300">
            {/* Image */}
            <div className="bg-white">
                <div className="aspect-square relative w-full bg-gray-200">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Main Info */}
            <div className="bg-white p-4 mb-2 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-xl font-bold text-brand-primary">Rs {product.price}</h1>
                    <button onClick={handleShare} className="text-gray-500 p-2 hover:bg-gray-50 rounded-full">
                        <Share2 size={20} />
                    </button>
                </div>
                <h2 className="text-gray-800 text-sm font-medium leading-5 mb-2">{product.name}</h2>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <div className="flex">
                            {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-current" />)}
                        </div>
                        <span className="text-gray-400">({product.reviews})</span>
                    </div>
                    <span>{product.sold} {TEXTS.sold[lang]}</span>
                </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white p-4 mb-2 shadow-sm space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Truck size={18} />
                        <div>
                            <p className="font-medium text-gray-800">{TEXTS.delivery[lang]}</p>
                            <p className="text-xs text-gray-400">3-5 Days</p>
                        </div>
                    </div>
                    <span className="font-bold text-gray-800">{TEXTS.deliveryPrice[lang]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheck size={18} />
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">{TEXTS.returnPolicy[lang]}</p>
                        <p className="text-xs text-gray-400">{TEXTS.warranty[lang]}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 mb-2 shadow-sm">
                <h3 className="font-bold text-gray-800 text-sm mb-2">{TEXTS.overview[lang]}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Reviews Placeholder */}
            <div className="bg-white p-4 mb-2 shadow-sm">
                 <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-800 text-sm">{TEXTS.reviews[lang]} ({product.reviews})</h3>
                    <button className="text-brand-primary text-xs font-bold">{lang === 'en' ? 'View All' : 'سب دیکھیں'}</button>
                 </div>
                 <div className="space-y-3">
                     {[1,2].map(i => (
                         <div key={i} className="border-b border-gray-50 last:border-0 pb-2">
                             <div className="flex items-center gap-1 mb-1">
                                 <div className="flex text-yellow-400"><Star size={10} className="fill-current"/> <Star size={10} className="fill-current"/><Star size={10} className="fill-current"/><Star size={10} className="fill-current"/><Star size={10} className="fill-current"/></div>
                                 <span className="text-[10px] text-gray-400">User {i}</span>
                             </div>
                             <p className="text-xs text-gray-600">Amazing product! Quality is great.</p>
                         </div>
                     ))}
                 </div>
            </div>
            
            {/* Bottom Spacer */}
            <div className="h-16"></div>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 z-50">
                <div className="flex flex-col items-center justify-center text-gray-500 px-2">
                    <MessageCircle size={20} />
                    <span className="text-[10px]">{TEXTS.chat[lang]}</span>
                </div>
                <div className="w-[1px] h-8 bg-gray-200"></div>
                <div className="flex-1 flex gap-2">
                     <button 
                        onClick={handleAdd}
                        className="flex-1 bg-brand-light text-brand-dark border border-brand-primary/20 font-bold py-2.5 rounded-lg text-sm"
                     >
                         {TEXTS.addToCart[lang]}
                     </button>
                     <button 
                        onClick={handleAdd}
                        className="flex-1 bg-brand-primary text-white font-bold py-2.5 rounded-lg text-sm shadow-lg shadow-brand-primary/20"
                     >
                         {TEXTS.buyNow[lang]}
                     </button>
                </div>
            </div>

            {/* MODALS */}
            {modalState === 'selection' && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl">
                        <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">{TEXTS.buyOptionTitle[lang]}</h3>
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => handleSelection('self')}
                                className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-brand-light transition-colors"
                            >
                                <div className="bg-gray-100 p-3 rounded-full mr-4">
                                    <User size={24} className="text-gray-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-800">{TEXTS.buyForSelf[lang]}</p>
                                    <p className="text-xs text-gray-500">Original Price (No Profit)</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => handleSelection('customer')}
                                className="flex items-center p-4 border-2 border-brand-primary/20 bg-brand-light/20 rounded-xl active:bg-brand-light transition-colors"
                            >
                                <div className="bg-brand-light p-3 rounded-full mr-4">
                                    <Store size={24} className="text-brand-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-brand-dark">{TEXTS.buyForCustomer[lang]}</p>
                                    <p className="text-xs text-gray-500">Set your profit margin</p>
                                </div>
                            </button>
                        </div>
                        <button onClick={() => setModalState('none')} className="mt-4 w-full py-3 text-gray-500 font-medium">Cancel</button>
                    </div>
                </div>
            )}

            {modalState === 'profit' && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-xl p-5 shadow-2xl">
                        <h3 className="font-bold text-gray-800 mb-2">{TEXTS.enterProfit[lang]}</h3>
                        <p className="text-xs text-gray-500 mb-4">Add your margin before {actionType === 'share' ? 'sharing' : 'adding to cart'}.</p>
                        
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Rs</span>
                            <input 
                                type="number" 
                                autoFocus
                                value={profit} 
                                onChange={e => setProfit(e.target.value)}
                                placeholder="0" 
                                className="w-full border border-gray-300 rounded-lg py-2 pl-8 pr-4 outline-none focus:border-brand-primary"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => setModalState('none')}
                                className="px-4 py-2 text-sm text-gray-500 font-medium"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmProfit}
                                className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// 6. REVAMPED ADMIN DASHBOARD (VIP/PREMIUM)
const AdminDashboard: React.FC<{ 
    lang: 'en'|'ur', 
    products: Product[], 
    setProducts: any,
    allOrders: Order[],
    onMarkDelivered: (id: string) => void
}> = ({ lang, products, setProducts, allOrders, onMarkDelivered }) => {
    // Admin Tabs: 'home' (inventory/post), 'orders', 'sales', 'profile'
    const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'sales' | 'profile'>('home');
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Form State
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Food');
    const [description, setDescription] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    // Helpers
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            id: Date.now().toString(),
            name,
            price: Number(price),
            category,
            description,
            image: `https://picsum.photos/400?random=${Date.now()}`,
            rating: 5.0,
            reviews: 0,
            sold: 0
        };
        setProducts([newProduct, ...products]);
        setName('');
        setPrice('');
        setDescription('');
        setShowAddModal(false);
        alert('Product Added Successfully!');
    };

    const generateDesc = async () => {
        if (!name) return alert('Enter Name first');
        setAiLoading(true);
        const desc = await generateProductDescription(name, lang);
        setDescription(desc);
        setAiLoading(false);
    };

    // --- Stats Calculations ---
    const deliveredOrders = allOrders.filter(o => o.status === 'Delivered');
    const pendingOrders = allOrders.filter(o => o.status === 'Pending');
    const totalSalesAmount = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
    // Assuming "Pending Payment" means potential profit/money incoming
    const pendingPayment = pendingOrders.reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="flex flex-col h-screen bg-gray-50 pb-0">
            {/* 1. Header is handled by Layout, but we add a sub-header here if needed. 
                Since Layout uses children, we are inside 'main'. We need to fill the screen.
                We added 'pb-0' and 'h-screen' to override standard layout for Admin */}

            <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
                
                {/* --- TAB 1: HOME (INVENTORY + POST) --- */}
                {activeTab === 'home' && (
                    <div className="space-y-6 fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">My Store</h2>
                            <button 
                                onClick={() => setShowAddModal(true)}
                                className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-brand-primary/30 flex items-center gap-2"
                            >
                                <Plus size={16} /> Add Product
                            </button>
                        </div>

                        {/* Inventory Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {products.map(p => (
                                <div key={p.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center">
                                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{p.name}</h4>
                                        <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                                        <p className="text-brand-primary font-bold text-sm">Rs {p.price}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-brand-primary">
                                            <Wand2 size={16} /> {/* Edit/Detail simulation */}
                                        </button>
                                        <button 
                                            onClick={() => setProducts(products.filter((pr:Product) => pr.id !== p.id))}
                                            className="p-2 bg-red-50 rounded-lg text-red-500 hover:bg-red-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- TAB 2: ORDERS --- */}
                {activeTab === 'orders' && (
                    <div className="space-y-4 fade-in">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            Incoming Orders <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingOrders.length}</span>
                        </h2>

                        {allOrders.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <PackageCheck size={48} className="mx-auto mb-2 opacity-30" />
                                <p>No orders yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {allOrders.map(order => (
                                    <div key={order.id} className={`bg-white p-4 rounded-xl border ${order.status === 'Pending' ? 'border-brand-primary/30 shadow-md' : 'border-gray-100'} relative`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-sm">{order.customerName}</h4>
                                                <p className="text-xs text-gray-500">{order.customerCity} • {order.customerPhone}</p>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${order.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        
                                        <div className="bg-gray-50 p-2 rounded-lg mb-3 space-y-1">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-xs text-gray-600">
                                                    <span>{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                                                    <span>Rs {item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                            <div className="border-t border-gray-200 pt-1 mt-1 flex justify-between font-bold text-xs text-gray-800">
                                                <span>Total Bill</span>
                                                <span>Rs {order.total}</span>
                                            </div>
                                        </div>

                                        {order.status === 'Pending' && (
                                            <button 
                                                onClick={() => onMarkDelivered(order.id)}
                                                className="w-full bg-brand-primary text-white font-bold py-2 rounded-lg text-xs shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                                            >
                                                Mark as Delivered <CheckCircle size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB 3: SALES (ANALYTICS) --- */}
                {activeTab === 'sales' && (
                    <div className="space-y-6 fade-in">
                        <h2 className="text-xl font-bold text-gray-800">Sales Analytics</h2>
                        
                        {/* Graphs Simulation */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-700 text-sm">Revenue Overview</h3>
                                <select className="bg-gray-50 border-none text-xs text-gray-500 rounded-lg p-1 outline-none">
                                    <option>This Week</option>
                                    <option>This Month</option>
                                </select>
                            </div>
                            
                            <div className="flex items-end justify-between h-32 gap-2 px-2">
                                {[40, 70, 35, 90, 60, 80, 50].map((h, i) => (
                                    <div key={i} className="w-full bg-brand-light rounded-t-lg relative group">
                                        <div 
                                            className="absolute bottom-0 left-0 right-0 bg-brand-primary rounded-t-lg transition-all duration-500" 
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>

                        {/* Top Selling Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <p className="text-xs text-purple-600 mb-1 font-bold">Total Sold Items</p>
                                <p className="text-2xl font-bold text-purple-800">{deliveredOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 mb-1 font-bold">Avg. Order Value</p>
                                <p className="text-2xl font-bold text-blue-800">
                                    Rs {deliveredOrders.length > 0 ? Math.round(totalSalesAmount / deliveredOrders.length) : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB 4: PROFILE --- */}
                {activeTab === 'profile' && (
                    <div className="space-y-6 fade-in">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl shadow-gray-900/20">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-white/10 rounded-full border-2 border-brand-accent flex items-center justify-center text-2xl font-bold">
                                    A
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">Admin Portal</h2>
                                    <p className="text-xs text-gray-400">Owner Access • Halal Rozi</p>
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center backdrop-blur-sm">
                                <span className="text-xs text-gray-300">Wallet Balance</span>
                                <span className="font-bold text-brand-accent text-lg">Rs {totalSalesAmount}</span>
                            </div>
                        </div>

                        {/* Detailed Stats Grid */}
                        <h3 className="font-bold text-gray-800 text-sm">Business Status</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Total Sales */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle size={20} />
                                </div>
                                <p className="text-lg font-bold text-gray-800">Rs {totalSalesAmount}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Total Sales</p>
                            </div>

                            {/* Pending Payments */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2">
                                    <Clock size={20} />
                                </div>
                                <p className="text-lg font-bold text-gray-800">Rs {pendingPayment}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Pending Payment</p>
                            </div>

                            {/* Pending Orders */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                                    <Package size={20} />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{pendingOrders.length}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Pending Orders</p>
                            </div>

                            {/* Delivered Orders */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
                                    <Truck size={20} />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{deliveredOrders.length}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Delivered Orders</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Admin Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40 max-w-2xl mx-auto rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <button 
                        onClick={() => setActiveTab('home')}
                        className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-brand-primary' : 'text-gray-400'}`}
                    >
                        <LayoutDashboard size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
                        <span className="text-[10px] font-bold">Home</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={`flex flex-col items-center gap-1 ${activeTab === 'orders' ? 'text-brand-primary' : 'text-gray-400'} relative`}
                    >
                        <div className="relative">
                            <ListOrdered size={22} strokeWidth={activeTab === 'orders' ? 2.5 : 2} />
                            {pendingOrders.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>}
                        </div>
                        <span className="text-[10px] font-bold">Orders</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('sales')}
                        className={`flex flex-col items-center gap-1 ${activeTab === 'sales' ? 'text-brand-primary' : 'text-gray-400'}`}
                    >
                        <BarChart3 size={22} strokeWidth={activeTab === 'sales' ? 2.5 : 2} />
                        <span className="text-[10px] font-bold">Sales</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-brand-primary' : 'text-gray-400'}`}
                    >
                        <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
                        <span className="text-[10px] font-bold">Profile</span>
                    </button>
                </div>
            </div>

            {/* Add Product Modal (Reused) */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">New Product</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">{TEXTS.name[lang]}</label>
                                <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-brand-primary" placeholder="e.g. Honey" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">{TEXTS.price[lang]}</label>
                                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-brand-primary" required />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">{TEXTS.category[lang]}</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-brand-primary">
                                        <option>Food</option>
                                        <option>Clothing</option>
                                        <option>Fragrance</option>
                                        <option>Lifestyle</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs text-gray-500">{TEXTS.description[lang]}</label>
                                    <button type="button" onClick={generateDesc} disabled={aiLoading} className="text-[10px] text-brand-primary flex items-center gap-1 hover:underline">
                                        <Wand2 size={10} /> {aiLoading ? 'Thinking...' : TEXTS.aiHelp[lang]}
                                    </button>
                                </div>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-brand-primary h-20" required />
                            </div>
                            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-brand-dark transition-colors">{TEXTS.submit[lang]}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// 7. PROFILE VIEW
const ProfileView: React.FC<{ userRole: UserRole, lang: 'en'|'ur', orders: Order[] }> = ({ userRole, lang, orders }) => {
    const [bankName, setBankName] = useState('');
    const [accNumber, setAccNumber] = useState('');
    const [isEditingPayment, setIsEditingPayment] = useState(false);

    // Calculate Profit
    // Available Profit: From Delivered Reseller Orders
    const availableProfit = orders
        .filter(o => o.type === 'resell' && o.status === 'Delivered')
        .reduce((sum, o) => sum + o.profit, 0);

    // Pending Profit: From Pending Reseller Orders
    const pendingProfit = orders
        .filter(o => o.type === 'resell' && o.status === 'Pending')
        .reduce((sum, o) => sum + o.profit, 0);

    const handleSavePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditingPayment(false);
        alert(lang === 'ur' ? 'تفصیلات محفوظ ہو گئیں' : 'Details Saved');
    };

    return (
        <div className="space-y-6 fade-in">
            {/* Profit Dashboard Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>
                 
                 <div className="flex items-center gap-3 mb-6">
                     <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover" />
                     </div>
                     <div>
                         <h2 className="text-lg font-bold text-gray-800">Ahmed Ali</h2>
                         <p className="text-xs text-gray-500">+92 300 1234567</p>
                     </div>
                 </div>

                 {/* Profit Stats Grid */}
                 <div className="grid grid-cols-2 gap-4 mb-4">
                     <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                         <p className="text-xs text-green-700 font-medium mb-1">{TEXTS.availableProfit[lang]}</p>
                         <p className="text-xl font-bold text-green-700">Rs {availableProfit}</p>
                     </div>
                     <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                         <p className="text-xs text-orange-700 font-medium mb-1">{TEXTS.pendingProfit[lang]}</p>
                         <p className="text-xl font-bold text-orange-700">Rs {pendingProfit}</p>
                     </div>
                 </div>

                 {/* Payout Notice */}
                 <div className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg text-[11px] text-gray-500">
                     <CalendarCheck size={14} className="mt-0.5 text-brand-primary" />
                     <p>{TEXTS.payoutInfo[lang]}</p>
                 </div>
            </div>

            {/* Payment / Profit Account Section */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-100 p-2 rounded-lg text-green-700">
                            <Wallet size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{TEXTS.paymentDetails[lang]}</h3>
                            <p className="text-[10px] text-gray-500">{TEXTS.profitAccountDesc[lang]}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsEditingPayment(!isEditingPayment)} 
                        className="text-xs text-brand-primary font-medium hover:underline"
                    >
                        {isEditingPayment ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                
                {isEditingPayment ? (
                    <form onSubmit={handleSavePayment} className="space-y-3 mt-2 animate-in fade-in">
                        <div>
                            <label className="text-xs text-gray-500 ml-1">{TEXTS.bankName[lang]}</label>
                            <input 
                                value={bankName}
                                onChange={e => setBankName(e.target.value)}
                                placeholder="e.g. JazzCash / EasyPaisa"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 ml-1">{TEXTS.accountNumber[lang]}</label>
                            <input 
                                value={accNumber}
                                onChange={e => setAccNumber(e.target.value)}
                                placeholder="0300 1234567"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-brand-primary text-white text-xs font-bold py-2 rounded-lg">
                            {TEXTS.saveDetails[lang]}
                        </button>
                    </form>
                ) : (
                    <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-700">{bankName || 'No Account Added'}</p>
                            <p className="text-xs text-gray-500">{accNumber || 'Tap edit to add details'}</p>
                        </div>
                        {bankName && <CheckCircle size={16} className="text-brand-primary" />}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {[TEXTS.businessName[lang], 'Support', 'Terms & Conditions'].map((item, i) => (
                    <button key={i} className="w-full text-left p-4 text-sm text-gray-600 hover:bg-gray-50 border-b border-gray-50 last:border-0 flex justify-between">
                        {item}
                        <span className="text-gray-400">›</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// 2. HOME VIEW
const HomeView: React.FC<{ products: Product[], lang: 'en'|'ur', onProductClick: (p: Product) => void }> = ({ products, lang, onProductClick }) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden bg-brand-dark h-48 flex items-center shadow-lg shadow-brand-primary/20">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 to-brand-accent/80"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 p-6 text-white w-2/3">
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                        New Arrival
                    </span>
                    <h2 className="text-2xl font-serif font-bold leading-tight mb-2">
                        {lang === 'ur' ? 'بہترین پروڈکٹس، بہترین قیمت' : 'Premium Quality Products'}
                    </h2>
                    <button onClick={() => {}} className="bg-white text-brand-primary px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-gray-100 transition-colors">
                        {TEXTS.shop[lang]}
                    </button>
                </div>
                <img 
                    src={products[0]?.image} 
                    alt="Hero" 
                    className="absolute right-[-20px] bottom-[-20px] w-40 h-40 object-cover rounded-full border-4 border-white/20 shadow-2xl transform rotate-12"
                />
            </div>

            {/* Featured Section */}
            <div>
                <div className="flex justify-between items-end mb-4 px-1">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                        <Zap size={18} className="text-brand-accent fill-brand-accent" />
                        {TEXTS.featured[lang]}
                    </h3>
                    <button className="text-brand-primary text-xs font-bold">See All</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {products.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} lang={lang} onClick={onProductClick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3. SHOP VIEW
const ShopView: React.FC<{ products: Product[], lang: 'en'|'ur', onProductClick: (p: Product) => void }> = ({ products, lang, onProductClick }) => {
    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState('All');
    
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const filtered = products.filter(p => 
        (selectedCat === 'All' || p.category === selectedCat) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4 animate-in fade-in">
            {/* Search Bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md py-2 -mx-4 px-4 border-b border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder={TEXTS.search[lang]} 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-primary/50 outline-none transition-all"
                    />
                </div>
                
                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto mt-3 pb-1 scrollbar-hide">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCat(cat)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                                selectedCat === cat 
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4 pb-20">
                {filtered.map(product => (
                    <ProductCard key={product.id} product={product} lang={lang} onClick={onProductClick} />
                ))}
            </div>
        </div>
    );
};

// 4. CART VIEW
const CartView: React.FC<{ cart: CartItem[], lang: 'en'|'ur', onUpdateQty: (id: string, delta: number) => void, onCheckout: () => void }> = ({ cart, lang, onUpdateQty, onCheckout }) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalProfit = cart.reduce((sum, item) => sum + (item.userProfit * item.quantity), 0);
    const total = subtotal + 90; // Delivery fixed

    if (cart.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400 animate-in fade-in">
                <ShoppingBag size={64} className="mb-4 text-gray-200" />
                <p className="text-lg font-medium">{TEXTS.emptyCart[lang]}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom pb-24">
            <h2 className="text-xl font-bold text-gray-800">{TEXTS.cart[lang]} <span className="text-sm font-normal text-gray-500">({cart.length} items)</span></h2>

            <div className="space-y-4">
                {cart.map(item => (
                    <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 relative overflow-hidden">
                        {item.userProfit > 0 && (
                            <div className="absolute top-0 right-0 bg-brand-accent text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                                Resell
                            </div>
                        )}
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                                <p className="text-xs text-brand-primary font-bold">Rs {item.price}</p>
                                {item.userProfit > 0 && (
                                    <p className="text-[10px] text-green-600 font-medium">
                                        Profit: Rs {item.userProfit} x {item.quantity} = {item.userProfit * item.quantity}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">
                                    {item.quantity === 1 ? <Trash2 size={14} className="text-red-500"/> : <Minus size={14} />}
                                </button>
                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 rounded-md bg-brand-primary text-white hover:bg-brand-dark">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span>Rs 90</span>
                </div>
                {totalProfit > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>{TEXTS.yourProfit[lang]}</span>
                        <span>Rs {totalProfit}</span>
                    </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-800">
                    <span>{TEXTS.total[lang]}</span>
                    <span>Rs {total}</span>
                </div>
                <button 
                    onClick={onCheckout}
                    className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-primary/20 flex justify-center items-center gap-2 mt-2"
                >
                    {TEXTS.checkout[lang]} <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

// 5. ORDERS VIEW
const OrdersView: React.FC<{ orders: Order[], lang: 'en'|'ur', onMarkDelivered: (id: string) => void }> = ({ orders, lang, onMarkDelivered }) => {
    const [tab, setTab] = useState<'personal'|'resell'>('personal');
    
    const filtered = orders.filter(o => o.type === tab);

    return (
        <div className="space-y-6 fade-in">
            <h2 className="text-xl font-bold text-gray-800">{TEXTS.myOrders[lang]}</h2>
            
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                    onClick={() => setTab('personal')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'personal' ? 'bg-white shadow-sm text-brand-primary' : 'text-gray-500'}`}
                >
                    {TEXTS.tabPersonal[lang]}
                </button>
                <button 
                    onClick={() => setTab('resell')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'resell' ? 'bg-white shadow-sm text-brand-primary' : 'text-gray-500'}`}
                >
                    {TEXTS.tabResell[lang]}
                </button>
            </div>

            <div className="space-y-4">
                {filtered.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        <Package size={48} className="mx-auto mb-2 opacity-30" />
                        <p>{TEXTS.noOrders[lang]}</p>
                    </div>
                ) : (
                    filtered.map(order => (
                        <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2">
                                <div>
                                    <p className="text-xs text-gray-500">Order #{order.id.slice(-6)}</p>
                                    <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {order.status === 'Delivered' ? TEXTS.statusDelivered[lang] : TEXTS.statusPending[lang]}
                                </span>
                            </div>

                            <div className="space-y-2 mb-3">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <img src={item.image} className="w-10 h-10 rounded bg-gray-100 object-cover" alt="" />
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</p>
                                            <p className="text-[10px] text-gray-500">{item.quantity} x Rs {item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center text-sm font-bold text-gray-800">
                                <span>{TEXTS.total[lang]}</span>
                                <span>Rs {order.total}</span>
                            </div>
                            
                            {order.profit > 0 && (
                                <div className="flex justify-between items-center text-xs font-medium text-green-600 mt-1">
                                    <span>{TEXTS.yourProfit[lang]}</span>
                                    <span>Rs {order.profit}</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// CHECKOUT MODAL
const CheckoutModal: React.FC<{ isOpen: boolean, onClose: () => void, cart: CartItem[], lang: 'en'|'ur', onConfirm: (data: any) => void }> = ({ isOpen, onClose, cart, lang, onConfirm }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', address: '', city: '' });
    
    if (!isOpen) return null;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalProfit = cart.reduce((sum, item) => sum + (item.userProfit * item.quantity), 0);
    const total = subtotal + 90;
    
    // Check if any item is a resell item
    const isResell = cart.some(item => item.userProfit > 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({
            customerName: formData.name,
            customerPhone: formData.phone,
            customerCity: formData.city,
            total: total + totalProfit, // Total customer pays if resell
            profit: totalProfit,
            type: isResell ? 'resell' : 'personal'
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">{isResell ? TEXTS.customerDetails[lang] : TEXTS.myDetails[lang]}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">{TEXTS.fullName[lang]}</label>
                        <input 
                            required 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary transition-colors"
                            placeholder="e.g. Ali Khan"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">{TEXTS.phone[lang]}</label>
                        <input 
                            required 
                            type="tel"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary transition-colors"
                            placeholder="0300 1234567"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">{TEXTS.city[lang]}</label>
                            <input 
                                required 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary transition-colors"
                                placeholder="Lahore"
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                            />
                        </div>
                        <div>
                             <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Province</label>
                             <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary transition-colors">
                                 <option>Punjab</option>
                                 <option>Sindh</option>
                                 <option>KPK</option>
                                 <option>Balochistan</option>
                             </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">{TEXTS.address[lang]}</label>
                        <textarea 
                            required 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary transition-colors h-24 resize-none"
                            placeholder="House #, Street, Area..."
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                        />
                    </div>

                    <div className="bg-brand-light/30 p-4 rounded-xl border border-brand-primary/10 mt-2">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Total to Pay (COD)</span>
                            <span className="font-bold text-brand-dark">Rs {total + totalProfit}</span>
                        </div>
                        {isResell && (
                            <div className="flex justify-between text-xs text-green-600">
                                <span>Your Profit (Included)</span>
                                <span>Rs {totalProfit}</span>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-dark transition-all">
                        {TEXTS.confirmOrder[lang]}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // New: Selected Product State for Detail View
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === UserRole.ADMIN) {
        setCurrentView(AppView.ADMIN_DASHBOARD);
    } else {
        setCurrentView(AppView.HOME);
    }
  };

  const handleLogout = () => {
    setCurrentView(AppView.LOGIN);
    setUserRole(UserRole.USER);
    setCart([]);
    setSelectedProduct(null);
  };

  const addToCart = (product: Product, profit: number) => {
    setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1, userProfit: profit } : item);
        }
        return [...prev, { ...product, quantity: 1, userProfit: profit }];
    });
    
    // If added from detail view, maybe go to cart or just show alert? 
    // Let's close detail view and go to cart to confirm order
    setSelectedProduct(null);
    setCurrentView(AppView.CART);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }).filter(item => item.quantity > 0)); 
    
    if (delta < 0) {
        setCart(prev => prev.filter(item => !(item.id === id && item.quantity + delta <= 0)).map(item => item.id === id ? {...item, quantity: item.quantity + delta} : item));
    }
  };

  const handleCheckoutConfirm = (orderData: Partial<Order>) => {
    const newOrder: Order = {
        id: Date.now().toString(),
        items: [...cart],
        type: 'personal', // Default, overridden by orderData
        status: 'Pending',
        total: 0,
        profit: 0,
        date: new Date().toISOString(),
        ...orderData
    } as Order;

    setOrders([newOrder, ...orders]);
    alert(`Order Placed Successfully! \nDelivery initiated.`);
    setCart([]);
    setIsCheckoutOpen(false);
    setCurrentView(AppView.ORDERS); // Go to Orders view to see it
  };

  const handleProductClick = (product: Product) => {
      setSelectedProduct(product);
  };

  const handleBack = () => {
      setSelectedProduct(null);
  };

  const markDelivered = (orderId: string) => {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Delivered' } : o));
  };

  const renderView = () => {
    if (selectedProduct) {
        return <ProductDetailView product={selectedProduct} lang={lang} onAddToCart={addToCart} />;
    }

    switch(currentView) {
      case AppView.HOME:
        return <HomeView products={products} lang={lang} onProductClick={handleProductClick} />;
      case AppView.SHOP:
        return <ShopView products={products} lang={lang} onProductClick={handleProductClick} />;
      case AppView.CART:
        return <CartView cart={cart} lang={lang} onUpdateQty={updateQty} onCheckout={() => setIsCheckoutOpen(true)} />;
      case AppView.ORDERS:
        return <OrdersView orders={orders} lang={lang} onMarkDelivered={markDelivered} />;
      case AppView.ADMIN_DASHBOARD:
        // AdminDashboard now manages its own tabs internally, but we pass data
        return <AdminDashboard 
            lang={lang} 
            products={products} 
            setProducts={setProducts} 
            allOrders={orders} 
            onMarkDelivered={markDelivered}
        />;
      case AppView.PROFILE:
        return <ProfileView userRole={userRole} lang={lang} orders={orders} />;
      default:
        return <HomeView products={products} lang={lang} onProductClick={handleProductClick} />;
    }
  };

  if (currentView === AppView.LOGIN) {
    return <LoginView onLogin={handleLogin} lang={lang} setLang={setLang} />;
  }

  return (
    <>
        <Layout 
            currentView={currentView} 
            onChangeView={setCurrentView} 
            userRole={userRole}
            onLogout={handleLogout}
            lang={lang}
            cartCount={cart.reduce((a,b) => a + b.quantity, 0)}
            onBack={selectedProduct ? handleBack : undefined}
        >
            {renderView()}
        </Layout>
        
        <CheckoutModal 
            isOpen={isCheckoutOpen} 
            onClose={() => setIsCheckoutOpen(false)}
            cart={cart}
            lang={lang}
            onConfirm={handleCheckoutConfirm}
        />
    </>
  );
};

export default App;
