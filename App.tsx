
import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
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
  ListOrdered,
  Eye,
  EyeOff,
  Trophy,
  Medal,
  Crown,
  Send,
  ArrowLeft,
  Camera,
  Upload
} from 'lucide-react';

// --- Sub-components for Views ---

// 1. LOGIN VIEW
const LoginView = memo(({ 
    onLogin, 
    lang, 
    setLang 
}: { 
    onLogin: (role: UserRole, profile?: {name: string, phone: string}) => void, 
    lang: 'en'|'ur', 
    setLang: any 
}) => {
  const [authView, setAuthView] = useState<'login' | 'signup' | 'admin'>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isValidPakistaniNumber = (num: string) => {
      const regex = /^((\+92)|(0092))-{0,1}3\d{2}-{0,1}\d{7}$|^03\d{9}$/;
      return regex.test(num.replace(/\s/g, ''));
  };

  const handleUserAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!isValidPakistaniNumber(phone)) {
        setErrorMsg(TEXTS.invalidPhone[lang]);
        return;
    }

    if (password.length < 6) {
        setErrorMsg(lang === 'ur' ? 'پاس ورڈ کم از کم 6 ہندسوں کا ہونا چاہیے' : 'Password must be at least 6 characters');
        return;
    }

    setLoading(true);

    setTimeout(() => {
        setLoading(false);
        if (authView === 'signup') {
             alert(lang === 'ur' ? 'اکاؤنٹ کامیابی سے بن گیا!' : 'Account Created Successfully!');
             onLogin(UserRole.USER, { name: name, phone: phone });
        } else {
             onLogin(UserRole.USER, { name: 'Halal Rozi User', phone: phone });
        }
    }, 1000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!adminName.trim() || !adminPhone.trim() || !adminUsername.trim()) {
        setErrorMsg(lang === 'ur' ? 'برائے مہربانی تمام تفصیلات پر کریں' : 'Please fill all details');
        return;
    }

    setLoading(true);
    
    setTimeout(() => {
        setLoading(false);
        if (inviteCode === '786111') { 
            onLogin(UserRole.ADMIN, { name: adminName, phone: adminPhone });
        } else {
            alert(lang === 'ur' ? 'غلط انوائٹ کوڈ' : 'Invalid Invite Code');
        }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-glass animate-in zoom-in">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-primary to-brand-dark rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-brand-primary/30 transform rotate-3 hover:rotate-6 transition-transform duration-500">
             <ShoppingBag size={48} className="text-white -rotate-3" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-dark mb-2 tracking-tight">{TEXTS.welcome[lang]}</h1>
          <p className="text-brand-muted text-sm font-medium">{TEXTS.subtitle[lang]}</p>
        </div>

        {authView === 'admin' ? (
            <div className="animate-in slide-in-right">
                <div className="text-center mb-6">
                    <span className="bg-red-50 text-red-600 text-[10px] font-extrabold px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest">
                        {TEXTS.adminLogin[lang]}
                    </span>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                         <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 font-bold">
                             {TEXTS.adminName[lang]}
                         </label>
                         <input 
                             type="text" 
                             value={adminName}
                             onChange={(e) => setAdminName(e.target.value)}
                             placeholder="Full Name"
                             className="w-full bg-white border border-gray-200 focus:border-red-400 rounded-2xl px-5 py-3.5 text-brand-dark outline-none transition-all shadow-sm focus:shadow-md"
                             required
                         />
                    </div>
                    <div>
                         <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 font-bold">
                             {TEXTS.adminUsername[lang]}
                         </label>
                         <input 
                             type="text" 
                             value={adminUsername}
                             onChange={(e) => setAdminUsername(e.target.value)}
                             placeholder="username"
                             className="w-full bg-white border border-gray-200 focus:border-red-400 rounded-2xl px-5 py-3.5 text-brand-dark outline-none transition-all shadow-sm focus:shadow-md"
                             required
                         />
                    </div>
                     <div>
                         <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 font-bold">
                             {TEXTS.adminPhone[lang]}
                         </label>
                         <input 
                             type="tel" 
                             value={adminPhone}
                             onChange={(e) => setAdminPhone(e.target.value)}
                             placeholder="0300 1234567"
                             className="w-full bg-white border border-gray-200 focus:border-red-400 rounded-2xl px-5 py-3.5 text-brand-dark outline-none transition-all shadow-sm focus:shadow-md"
                             required
                         />
                    </div>
                    <div>
                        <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 flex items-center gap-1 font-bold">
                            <Lock size={12}/> {TEXTS.accessKey[lang]}
                        </label>
                        <div className="relative">
                            <input 
                                type={showAdminPassword ? "text" : "password"}
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                placeholder={TEXTS.accessKeyPlaceholder[lang]}
                                className="w-full bg-white border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 rounded-2xl px-5 py-3.5 text-brand-dark outline-none transition-all shadow-sm focus:shadow-md"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowAdminPassword(!showAdminPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showAdminPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>
                    </div>

                    {errorMsg && (
                        <p className="text-xs text-red-500 text-center font-medium bg-red-50 py-2 rounded-xl border border-red-100">{errorMsg}</p>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-600/20 transition-all transform active:scale-95"
                    >
                        {loading ? TEXTS.verifying[lang] : TEXTS.accessDashboard[lang]}
                    </button>
                    <button 
                        type="button"
                        onClick={() => setAuthView('login')}
                        className="w-full text-gray-500 text-xs hover:text-gray-800 py-3 font-medium"
                    >
                        &larr; Back to User Login
                    </button>
                </form>
            </div>
        ) : (
            <div className="animate-in slide-in-right">
                <div className="flex bg-gray-100/80 p-1.5 rounded-2xl mb-8 border border-gray-200">
                    <button 
                        onClick={() => setAuthView('login')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm ${authView === 'login' ? 'bg-white text-brand-primary shadow' : 'text-gray-500 shadow-none bg-transparent'}`}
                    >
                        {TEXTS.login[lang]}
                    </button>
                    <button 
                        onClick={() => setAuthView('signup')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm ${authView === 'signup' ? 'bg-white text-brand-primary shadow' : 'text-gray-500 shadow-none bg-transparent'}`}
                    >
                        {TEXTS.signup[lang]}
                    </button>
                </div>

                <form onSubmit={handleUserAuth} className="space-y-4">
                    {authView === 'signup' && (
                        <div>
                            <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 font-bold">{TEXTS.fullName[lang]}</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-2xl pl-12 pr-4 py-3.5 text-brand-dark outline-none transition-all shadow-sm focus:shadow-md"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 font-bold">{TEXTS.phone[lang]}</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-4 bg-gray-200 rounded-sm overflow-hidden border border-gray-300 flex items-center justify-center">
                                <div className="w-full h-full bg-white relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-[25%] bg-white"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-[75%] bg-green-700 flex items-center justify-center">
                                         <div className="w-1 h-1 bg-white rounded-full -ml-1 -mt-1 transform rotate-12 text-[4px] text-white">*</div>
                                    </div>
                                </div>
                            </div>
                            <span className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 text-sm border-r border-gray-300 pr-2 h-5 flex items-center">+92</span>
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="300 1234567"
                                className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-2xl pl-28 pr-4 py-3.5 text-brand-dark outline-none transition-all shadow-sm focus:shadow-md"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 ml-1 font-bold">{TEXTS.password[lang]}</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••"
                                className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-2xl pl-12 pr-12 py-3.5 text-brand-dark outline-none transition-all shadow-sm focus:shadow-md"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>
                    </div>

                    {errorMsg && (
                        <p className="text-xs text-red-500 text-center font-medium bg-red-50 py-2 rounded-xl border border-red-100">{errorMsg}</p>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-dark hover:from-brand-dark hover:to-brand-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/30 transition-all transform active:scale-95"
                    >
                        {loading ? TEXTS.pleaseWait[lang] : (authView === 'login' ? TEXTS.login[lang] : TEXTS.createAccount[lang])}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs">
                        {authView === 'login' ? TEXTS.noAccount[lang] : TEXTS.haveAccount[lang]}
                        <button 
                            onClick={() => setAuthView(authView === 'login' ? 'signup' : 'login')}
                            className="text-brand-primary font-bold ml-1 hover:underline"
                        >
                            {authView === 'login' ? TEXTS.signup[lang] : TEXTS.login[lang]}
                        </button>
                    </p>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4">
                     <button 
                        onClick={() => setAuthView('admin')}
                        className="w-full text-center text-xs text-gray-400 hover:text-brand-primary transition-colors"
                    >
                        Are you an Admin?
                    </button>
                </div>
            </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-100 pt-6">
            <div className="flex bg-gray-50 p-1 rounded-full border border-gray-200">
                <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-4 py-1.5 rounded-full transition-all ${lang === 'en' ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>English</button>
                <button onClick={() => setLang('ur')} className={`text-[10px] font-bold px-4 py-1.5 rounded-full transition-all ${lang === 'ur' ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>اردو</button>
            </div>
            
            <div className="flex flex-col items-center mt-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1.5 text-brand-dark">
                    <Code size={14} className="text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{TEXTS.developer[lang]}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
});

// --- Product Card Grid Item ---
const ProductCard = memo(({ product, lang, onClick }: { product: Product, lang: 'en'|'ur', onClick: (p: Product) => void }) => {
    return (
        <div 
            onClick={() => onClick(product)}
            className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer active:scale-[0.98]"
        >
            <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                    <div className="flex items-center gap-1">
                        <Star size={10} className="text-brand-accent fill-brand-accent" />
                        <span className="text-[10px] font-bold text-gray-800">{product.rating}</span>
                    </div>
                </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-medium text-gray-800 line-clamp-2 text-xs mb-2 leading-relaxed h-9">{product.name}</h4>
                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">{TEXTS.price[lang]}</p>
                        <p className="text-brand-primary font-bold text-base">Rs {product.price}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-brand-light text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors">
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
});

// --- Chat View ---
const ChatView = memo(({ orderId, lang, onBack }: { orderId: string, lang: 'en'|'ur', onBack: () => void }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you with your order?", sender: 'admin', time: '10:00 AM' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const newMsg = { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        setMessages([...messages, newMsg]);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Thanks for your message. We are checking your order details.",
                sender: 'admin',
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-60px)] bg-brand-bg">
             <div className="glass-effect p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
                 <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100">
                     <ArrowLeft size={20} className="text-gray-700"/>
                 </button>
                 <div className="flex-1">
                     <h3 className="font-bold text-gray-800">Admin Support</h3>
                     <p className="text-xs text-brand-primary font-medium">Order #{orderId.slice(-6)}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center border-2 border-white shadow-sm">
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                 {messages.map(msg => (
                     <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-up`}>
                         <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                             <p>{msg.text}</p>
                             <p className={`text-[10px] mt-1 text-right font-medium opacity-70 ${msg.sender === 'user' ? 'text-white' : 'text-gray-400'}`}>{msg.time}</p>
                         </div>
                     </div>
                 ))}
                 <div ref={messagesEndRef} />
             </div>

             <div className="bg-white p-4 border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
                 <form onSubmit={handleSend} className="flex gap-2">
                     <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                     />
                     <button type="submit" className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-dark text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                         <Send size={20} className="ml-0.5" />
                     </button>
                 </form>
             </div>
        </div>
    );
});

// --- Orders View ---
const OrdersView = memo(({ orders, lang, onMarkDelivered, onChat }: { orders: Order[], lang: 'en'|'ur', onMarkDelivered: (id: string) => void, onChat: (id: string) => void }) => {
    const [tab, setTab] = useState<'all'|'pending'|'delivered'>('all');

    const filtered = orders.filter(o => {
        if (tab === 'all') return true;
        if (tab === 'pending') return o.status === 'Pending';
        if (tab === 'delivered') return o.status === 'Delivered';
        return true;
    });

    const getTabLabel = (t: string) => {
        if (t === 'all') return TEXTS.tabAll[lang];
        if (t === 'pending') return TEXTS.statusPending[lang];
        if (t === 'delivered') return TEXTS.statusDelivered[lang];
        return t;
    };

    return (
        <div className="pb-24 animate-in slide-up">
             <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide p-1">
                 {['all', 'pending', 'delivered'].map(t => (
                     <button 
                        key={t}
                        onClick={() => setTab(t as any)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold capitalize transition-all shadow-sm whitespace-nowrap ${tab === t ? 'bg-brand-dark text-white shadow-md transform scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                     >
                         {getTabLabel(t)}
                     </button>
                 ))}
             </div>

             {filtered.length === 0 ? (
                 <div className="text-center py-20 text-gray-400">
                     <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <PackageCheck size={48} className="opacity-30" />
                     </div>
                     <p className="font-medium">{TEXTS.noOrders[lang]}</p>
                 </div>
             ) : (
                 <div className="space-y-4">
                     {filtered.map(order => (
                         <div key={order.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                             <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${order.status === 'Pending' ? 'bg-brand-accent' : 'bg-brand-primary'}`}></div>
                             
                             <div className="flex justify-between items-start mb-4 pl-3">
                                 <div>
                                     <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Order #{order.id.slice(-6)}</p>
                                     <h4 className="font-bold text-gray-800 text-sm">
                                         {order.type === 'personal' ? TEXTS.personalBuy[lang] : `${TEXTS.customerDetails[lang]}: ${order.customerName}`}
                                     </h4>
                                     <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Clock size={10}/> {new Date(order.date).toLocaleDateString()}</p>
                                 </div>
                                 <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${order.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                                     {order.status === 'Pending' ? TEXTS.statusPending[lang] : TEXTS.statusDelivered[lang]}
                                 </span>
                             </div>

                             <div className="pl-3 space-y-3 border-t border-dashed border-gray-200 pt-4">
                                 {order.items.slice(0, 2).map((item, i) => (
                                     <div key={i} className="flex justify-between items-center text-xs">
                                         <div className="flex items-center gap-3">
                                             <span className="bg-gray-100 w-6 h-6 flex items-center justify-center rounded-md text-gray-700 font-bold">{item.quantity}x</span>
                                             <span className="text-gray-700 font-medium truncate max-w-[150px]">{item.name}</span>
                                         </div>
                                         <span className="text-gray-900 font-bold">Rs {item.price * item.quantity}</span>
                                     </div>
                                 ))}
                                 {order.items.length > 2 && <p className="text-[10px] text-gray-400 italic pl-9">+ {order.items.length - 2} more items</p>}
                             </div>
                             
                             <div className="pl-3 mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                 <div className="flex flex-col">
                                     <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{TEXTS.total[lang]}</span>
                                     <span className="text-base font-bold text-brand-dark">Rs {order.total}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <button 
                                        onClick={() => onChat(order.id)}
                                        className="bg-brand-light text-brand-primary p-2.5 rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                                        title="Chat with Seller"
                                     >
                                         <MessageCircle size={18} />
                                     </button>
                                     {order.profit > 0 && (
                                         <div className="flex flex-col items-end bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                                             <span className="text-[10px] text-green-600 font-bold uppercase">{TEXTS.profitEarned[lang]}</span>
                                             <span className="text-sm font-bold text-green-700">+Rs {order.profit}</span>
                                         </div>
                                     )}
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             )}
        </div>
    );
});

// --- Unified Buy Modal ---
const BuyNowModal = memo(({ isOpen, onClose, product, lang, onConfirm }: { isOpen: boolean, onClose: () => void, product: Product | null, lang: 'en'|'ur', onConfirm: (data: any) => void }) => {
    const [step, setStep] = useState(1);
    const [mode, setMode] = useState<'personal' | 'resell'>('personal');
    const [quantity, setQuantity] = useState(1);
    const [profit, setProfit] = useState('');
    
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [address, setAddress] = useState('');
    const [senderName, setSenderName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setMode('personal');
            setQuantity(1);
            setProfit('');
            setCustomerName('');
            setCustomerPhone('');
            setCustomerCity('');
            setAddress('');
            setSenderName('');
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const basePrice = product.price;
    const profitAmount = mode === 'resell' ? (parseInt(profit) || 0) : 0;
    const itemTotal = (basePrice + profitAmount) * quantity;
    const delivery = 90;
    const total = itemTotal + delivery;

    const handleNext = () => {
        if (mode === 'resell' && profitAmount <= 0) {
            alert("Please enter a valid profit amount");
            return;
        }
        setStep(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({
            items: [{...product, quantity, userProfit: profitAmount}],
            total,
            profit: profitAmount * quantity,
            type: mode,
            customerName: mode === 'resell' ? customerName : 'Self',
            customerPhone,
            customerCity,
            address,
            senderName: mode === 'resell' ? senderName : undefined, 
            date: new Date().toISOString(),
            status: 'Pending'
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-up h-[85vh] sm:h-auto flex flex-col border border-white/20">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 font-serif">
                        {step === 1 ? TEXTS.createProduct[lang].replace('Add Product', 'Setup Order') : TEXTS.checkout[lang]}
                    </h3>
                    <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500"><X size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
                    {step === 1 ? (
                        <div className="space-y-6">
                            {/* Product Mini Summary */}
                            <div className="flex gap-4 p-4 bg-brand-light/50 rounded-2xl border border-brand-primary/10">
                                <img src={product.image} className="w-20 h-20 rounded-xl object-cover bg-white shadow-sm" alt={product.name} />
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight mb-1">{product.name}</h4>
                                    <p className="text-brand-primary font-bold text-lg">Rs {product.price}</p>
                                </div>
                            </div>

                            {/* Mode Selection */}
                            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                                <button 
                                    type="button"
                                    onClick={() => setMode('personal')}
                                    className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all ${mode === 'personal' ? 'bg-white text-brand-primary shadow-md' : 'text-gray-500'}`}
                                >
                                    {TEXTS.buyForSelf[lang]}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setMode('resell')}
                                    className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all ${mode === 'resell' ? 'bg-white text-green-600 shadow-md' : 'text-gray-500'}`}
                                >
                                    {TEXTS.buyForCustomer[lang]}
                                </button>
                            </div>

                            {/* Quantity */}
                            <div className="flex justify-between items-center bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                                <span className="text-sm font-bold text-gray-600 pl-2">Quantity</span>
                                <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1.5">
                                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 transition-colors"><Minus size={16}/></button>
                                    <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-green-500 transition-colors"><Plus size={16}/></button>
                                </div>
                            </div>

                            {/* Reseller Specifics */}
                            {mode === 'resell' && (
                                <div className="space-y-3 animate-in slide-up">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">{TEXTS.yourProfit[lang]}</label>
                                        <div className="relative">
                                            <input 
                                                type="number" 
                                                value={profit}
                                                onChange={(e) => setProfit(e.target.value)}
                                                placeholder="0"
                                                className="w-full bg-white border border-green-200 rounded-2xl px-5 py-4 text-xl font-bold text-green-700 outline-none focus:ring-2 focus:ring-green-500/20 shadow-sm"
                                            />
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">PKR</span>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-xl flex justify-between items-center text-sm border border-green-100">
                                        <span className="text-green-700 font-medium">Customer Price (Per Unit)</span>
                                        <span className="font-bold text-green-800">Rs {basePrice + profitAmount}</span>
                                    </div>
                                </div>
                            )}

                            {/* Totals */}
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Item Total</span>
                                    <span>Rs {itemTotal}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>{TEXTS.deliveryCharges[lang]}</span>
                                    <span>Rs {delivery}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-800 text-base">
                                    <span>{TEXTS.totalCollect[lang]}</span>
                                    <span>Rs {total}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5 animate-in slide-in-right">
                             <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-blue-800 text-xs font-medium mb-4 flex gap-3 items-center">
                                 <div className="p-2 bg-blue-100 rounded-full">
                                    <Info size={16} className="text-blue-600" />
                                 </div>
                                 <span className="leading-relaxed">
                                 {mode === 'resell' 
                                    ? "Enter your customer's details. We will ship directly to them." 
                                    : "Enter your delivery details."}
                                 </span>
                             </div>

                             {mode === 'resell' && (
                                <div className="space-y-4">
                                     <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1.5 ml-1">{TEXTS.senderName[lang]}</label>
                                        <input 
                                            value={senderName}
                                            onChange={e => setSenderName(e.target.value)}
                                            className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:border-brand-primary outline-none shadow-sm transition-all focus:shadow-md"
                                            placeholder="Your Business Name (Optional)"
                                        />
                                    </div>
                                     <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1.5 ml-1">{TEXTS.receiverName[lang]}</label>
                                        <input 
                                            required
                                            value={customerName}
                                            onChange={e => setCustomerName(e.target.value)}
                                            className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:border-brand-primary outline-none shadow-sm transition-all focus:shadow-md"
                                            placeholder="Customer Full Name"
                                        />
                                    </div>
                                </div>
                             )}

                             <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1.5 ml-1">{TEXTS.phone[lang]}</label>
                                <input 
                                    required
                                    type="tel"
                                    value={customerPhone}
                                    onChange={e => setCustomerPhone(e.target.value)}
                                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:border-brand-primary outline-none shadow-sm transition-all focus:shadow-md"
                                    placeholder="0300 1234567"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1.5 ml-1">{TEXTS.city[lang]}</label>
                                <input 
                                    required
                                    value={customerCity}
                                    onChange={e => setCustomerCity(e.target.value)}
                                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:border-brand-primary outline-none shadow-sm transition-all focus:shadow-md"
                                    placeholder="City"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1.5 ml-1">{TEXTS.address[lang]}</label>
                                <textarea 
                                    required
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:border-brand-primary outline-none h-24 resize-none shadow-sm transition-all focus:shadow-md"
                                    placeholder="House #, Street, Area..."
                                />
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
                         {step === 2 && (
                             <button type="button" onClick={() => setStep(1)} className="px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                                 Back
                             </button>
                         )}
                         <button 
                            type={step === 1 ? "button" : "submit"} 
                            onClick={step === 1 ? handleNext : undefined}
                            className="flex-1 bg-gradient-to-r from-brand-primary to-brand-dark text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/30 hover:scale-[1.02] transition-all text-lg"
                         >
                             {step === 1 ? "Next Details" : TEXTS.confirmOrder[lang]}
                         </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

// --- Product Detail View (Optimized) ---
const ProductDetailView = memo(({ product, lang, onOpenBuyModal }: { product: Product, lang: 'en'|'ur', onOpenBuyModal: () => void }) => {
    
    return (
        <div className="pb-24 animate-in slide-in-right">
            <div className="relative aspect-square bg-white group overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="p-6 bg-white rounded-t-[2.5rem] -mt-8 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] min-h-[50vh]">
                <div className="w-16 h-1.5 bg-gray-200/80 rounded-full mx-auto mb-8"></div>
                
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-serif font-bold text-gray-800 flex-1 leading-tight">{product.name}</h1>
                    <div className="flex flex-col items-end ml-4">
                        <span className="text-2xl font-bold text-brand-primary">Rs {product.price}</span>
                        <div className="flex items-center gap-1.5 mt-1 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100">
                             <Star size={12} className="text-brand-accent fill-brand-accent" />
                             <span className="text-xs text-gray-700 font-bold">{product.rating}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 text-xs text-gray-500 mb-8 pb-6 border-b border-gray-100">
                    <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full font-medium"><Package size={14} className="text-brand-primary"/> {TEXTS.sold[lang]} {product.sold}</span>
                    <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full font-medium"><MessageCircle size={14} className="text-brand-primary"/> {product.reviews} {TEXTS.reviews[lang]}</span>
                </div>

                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">{TEXTS.overview[lang]}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">{product.description}</p>
                
                {/* Feature Tags */}
                <div className="flex gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                        <CheckCircle size={14} /> Authentic
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
                        <Truck size={14} /> Fast Delivery
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 px-3 py-2 rounded-xl border border-purple-100">
                        <ShieldCheck size={14} /> Quality Check
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 pb-safe z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                 <div className="max-w-2xl mx-auto">
                    <button 
                        onClick={onOpenBuyModal}
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-dark text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/30 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all text-lg group"
                    >
                        {TEXTS.placeOrder[lang]} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
            </div>
        </div>
    );
});

// --- Cart View ---
const CartView = memo(({ cart, lang, onUpdateQty, onCheckout }: { cart: CartItem[], lang: 'en'|'ur', onUpdateQty: (id: string, delta: number) => void, onCheckout: () => void }) => {
    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 animate-in fade-in">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <ShoppingBag size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{TEXTS.emptyCart[lang]}</h3>
                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{TEXTS.emptyCartDesc[lang]}</p>
            </div>
        );
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="pb-28 animate-in slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1 font-serif flex items-center gap-2">
                {TEXTS.cart[lang]} <span className="bg-brand-primary text-white text-xs rounded-full px-2 py-0.5 align-middle">{cart.length}</span>
            </h2>
            <div className="space-y-4">
                {cart.map(item => (
                    <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center group">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-50 shadow-sm" />
                        <div className="flex-1 flex flex-col justify-between h-20 py-1">
                            <div>
                                <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                                <p className="text-brand-primary font-bold text-sm">Rs {item.price}</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1 border border-gray-100">
                                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 transition-colors"><Minus size={14}/></button>
                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-green-500 transition-colors"><Plus size={14}/></button>
                                </div>
                                <span className="font-bold text-gray-800 text-sm">Rs {item.price * item.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 p-5 pb-8 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-3xl">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">{TEXTS.total[lang]}</span>
                        <span className="text-2xl font-bold text-brand-dark">Rs {total}</span>
                    </div>
                    <button 
                        onClick={onCheckout}
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-dark text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all"
                    >
                        {TEXTS.checkout[lang]}
                    </button>
                </div>
            </div>
        </div>
    );
});

// --- Added Components to Resolve Reference Errors ---

const HomeView = memo(({ products, lang, onProductClick }: { products: Product[], lang: 'en'|'ur', onProductClick: (p: Product) => void }) => {
    return (
        <div className="space-y-6 animate-in fade-in">
            {/* Search & Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-brand-dark text-white p-6 shadow-xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-serif font-bold mb-2">{TEXTS.welcome[lang]}</h2>
                    <p className="text-brand-light text-sm mb-6 opacity-90">{TEXTS.subtitle[lang]}</p>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder={TEXTS.search[lang]} 
                            className="w-full bg-white text-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none shadow-sm focus:shadow-md transition-shadow"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            <div>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="font-bold text-gray-800 text-lg">{TEXTS.featured[lang]}</h3>
                    <button className="text-brand-primary text-xs font-bold">{TEXTS.seeAll[lang]}</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {products.slice(0, 4).map(p => (
                        <ProductCard key={p.id} product={p} lang={lang} onClick={onProductClick} />
                    ))}
                </div>
            </div>
        </div>
    );
});

const ShopView = memo(({ products, lang, onProductClick }: { products: Product[], lang: 'en'|'ur', onProductClick: (p: Product) => void }) => {
    return (
        <div className="animate-in fade-in pb-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif px-1">{TEXTS.shop[lang]}</h2>
            <div className="grid grid-cols-2 gap-4">
                {products.map(p => (
                    <ProductCard key={p.id} product={p} lang={lang} onClick={onProductClick} />
                ))}
            </div>
        </div>
    );
});

const ProfileView = memo(({ userRole, lang, orders, userProfile }: { userRole: UserRole, lang: 'en'|'ur', orders: Order[], userProfile: any }) => {
    const totalProfit = orders.reduce((sum, order) => sum + order.profit, 0);
    const pendingProfit = orders.filter(o => o.status === 'Pending').reduce((sum, o) => sum + o.profit, 0);
    
    // Payment Profile State
    const [bankName, setBankName] = useState('');
    const [accountTitle, setAccountTitle] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    return (
        <div className="animate-in slide-up pb-24">
            <div className="flex flex-col items-center mb-8 pt-4">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-dark rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4 border-4 border-white">
                    {userProfile?.name?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{userProfile?.name || 'User'}</h2>
                <p className="text-gray-500 text-sm">{userProfile?.phone}</p>
                {userRole === UserRole.ADMIN && <span className="mt-2 bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Admin</span>}
            </div>

            <div className="space-y-4">
                {/* Stats Card */}
                <div className="bg-brand-dark text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="text-brand-light text-xs font-medium uppercase tracking-wider mb-1">{TEXTS.availableProfit[lang]}</p>
                            <h3 className="text-3xl font-bold">Rs {Math.max(0, totalProfit - pendingProfit)}</h3>
                        </div>
                        <div className="w-px bg-white/20"></div>
                        <div className="flex-1">
                            <p className="text-brand-light text-xs font-medium uppercase tracking-wider mb-1">{TEXTS.pendingProfit[lang]}</p>
                            <h3 className="text-3xl font-bold">Rs {pendingProfit}</h3>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2">
                        <Info size={14} className="text-brand-light mt-0.5 shrink-0"/>
                        <p className="text-[10px] text-brand-light/80 leading-relaxed">{TEXTS.payoutInfo[lang]}</p>
                    </div>
                </div>

                {/* Account Details - Updated with Real Fields */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Wallet size={18} className="text-brand-primary"/> {TEXTS.paymentDetails[lang]}</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">{TEXTS.bankName[lang]}</label>
                            <select 
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary"
                            >
                                <option value="">Select Bank / Wallet</option>
                                <option value="easypaisa">EasyPaisa</option>
                                <option value="jazzcash">JazzCash</option>
                                <option value="meezan">Meezan Bank</option>
                                <option value="hbl">HBL</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">{TEXTS.accountTitle[lang]}</label>
                            <input 
                                type="text" 
                                value={accountTitle}
                                onChange={(e) => setAccountTitle(e.target.value)}
                                placeholder="e.g. Ali Khan" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary" 
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">{TEXTS.accountNumber[lang]}</label>
                            <input 
                                type="tel" 
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="0300xxxxxxx or IBAN" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary" 
                            />
                        </div>
                        <button className="w-full bg-brand-light text-brand-primary font-bold py-3 rounded-xl text-sm hover:bg-brand-primary hover:text-white transition-colors mt-2">
                            {TEXTS.saveDetails[lang]}
                        </button>
                    </div>
                </div>
                
                 <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3 text-blue-800 text-xs border border-blue-100">
                    <ShieldCheck size={20} className="shrink-0"/>
                    <p>Your data is secure. We never share your personal information.</p>
                </div>
            </div>
        </div>
    );
});

const AddProductModal = memo(({ isOpen, onClose, onSave, lang }: { isOpen: boolean, onClose: () => void, onSave: (p: any) => void, lang: 'en'|'ur' }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleGenerateAI = async () => {
        if (!name) return alert("Please enter product name first");
        setLoadingAI(true);
        const desc = await generateProductDescription(name, lang);
        setDescription(desc);
        setLoadingAI(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: Date.now().toString(),
            name,
            price: Number(price),
            category,
            image: image || 'https://via.placeholder.com/150',
            description,
            rating: 5.0,
            reviews: 0,
            sold: 0
        });
        onClose();
        setName(''); setPrice(''); setCategory(''); setImage(''); setDescription('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in zoom-in max-h-[90vh] overflow-y-auto scrollbar-hide">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold font-serif">{TEXTS.createProduct[lang]}</h3>
                    <button onClick={onClose}><X size={24} className="text-gray-400 hover:text-red-500"/></button>
                 </div>
                 <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">{TEXTS.name[lang]}</label>
                         <input required value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" placeholder="Product Name" />
                     </div>
                     <div className="flex gap-4">
                         <div className="flex-1">
                             <label className="text-xs font-bold text-gray-500 uppercase ml-1">{TEXTS.price[lang]}</label>
                             <input required type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" placeholder="0" />
                         </div>
                         <div className="flex-1">
                             <label className="text-xs font-bold text-gray-500 uppercase ml-1">{TEXTS.category[lang]}</label>
                             <input required value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" placeholder="Category" />
                         </div>
                     </div>
                     
                     {/* Real Image Uploader */}
                     <div>
                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">{TEXTS.uploadImage[lang]}</label>
                         <div 
                            className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-brand-primary hover:bg-brand-light/50 transition-colors relative h-32"
                            onClick={() => fileInputRef.current?.click()}
                         >
                             {image ? (
                                 <img src={image} className="w-full h-full object-contain absolute inset-0 rounded-xl" alt="Preview" />
                             ) : (
                                 <div className="flex flex-col items-center text-gray-400">
                                     <Camera size={24} className="mb-2"/>
                                     <span className="text-xs font-bold">Click to Upload</span>
                                 </div>
                             )}
                             <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageUpload}
                             />
                         </div>
                     </div>

                     <div>
                         <div className="flex justify-between items-center mb-1">
                             <label className="text-xs font-bold text-gray-500 uppercase ml-1">{TEXTS.description[lang]}</label>
                             <button type="button" onClick={handleGenerateAI} disabled={loadingAI} className="text-[10px] bg-brand-light text-brand-primary px-2 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-brand-primary hover:text-white transition-colors">
                                 <Wand2 size={12}/> {loadingAI ? 'Generating...' : TEXTS.aiHelp[lang]}
                             </button>
                         </div>
                         <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary h-24 resize-none" placeholder="Product details..." />
                     </div>
                     <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-dark transition-colors">{TEXTS.submit[lang]}</button>
                 </form>
             </div>
        </div>
    );
});

// --- End Added Components ---

const AdminDashboard = memo(({ lang, products, setProducts, allOrders, onMarkDelivered }: any) => {
    const [activeTab, setActiveTab] = useState('home');
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Stats
    const deliveredOrders = allOrders.filter((o:any) => o.status === 'Delivered');
    const pendingOrders = allOrders.filter((o:any) => o.status === 'Pending');
    const totalSalesAmount = deliveredOrders.reduce((sum:number, o:any) => sum + o.total, 0);
    const totalItemsSold = deliveredOrders.reduce((sum:number, o:any) => sum + o.items.reduce((s:any, i:any) => s + i.quantity, 0), 0);

    const handleAddProduct = (newProduct: any) => {
        setProducts([newProduct, ...products]);
    };
    
    return (
        <div className="flex flex-col h-screen bg-gray-50 pb-0">
            <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 scrollbar-hide">
                {activeTab === 'home' && (
                    <div className="space-y-6 animate-in slide-up">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800 font-serif">{TEXTS.myStore[lang]}</h2>
                            <button onClick={() => setShowAddModal(true)} className="bg-brand-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-brand-dark transition-colors">
                                <Plus size={18} /> {TEXTS.createProduct[lang]}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {products.map((p:any) => (
                                <div key={p.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center group hover:shadow-md transition-all">
                                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100 shadow-sm" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{p.name}</h4>
                                        <p className="text-xs text-gray-500 mb-1 bg-gray-100 inline-block px-2 py-0.5 rounded-md mt-1">{p.category}</p>
                                        <p className="text-brand-primary font-bold text-sm">Rs {p.price}</p>
                                    </div>
                                    <button onClick={() => setProducts(products.filter((pr:any) => pr.id !== p.id))} className="p-2.5 bg-red-50 rounded-xl text-red-500 hover:bg-red-100 transition-colors"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                 {activeTab === 'orders' && (
                    <div className="space-y-4 animate-in slide-up">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            {TEXTS.incomingOrders[lang]} <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingOrders.length}</span>
                        </h2>
                        {allOrders.map((order:any) => (
                            <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold text-sm">{order.customerName}</h4>
                                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{order.status}</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-2">{order.items.length} Items • Rs {order.total}</div>
                                {order.status === 'Pending' && (
                                    <button onClick={() => onMarkDelivered(order.id)} className="w-full bg-brand-primary text-white text-xs font-bold py-2 rounded-lg">
                                        {TEXTS.markDelivered[lang]}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                 {activeTab === 'sales' && (
                    <div className="space-y-6 animate-in slide-up">
                        <h2 className="text-xl font-bold text-gray-800">{TEXTS.revenueOverview[lang]}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <p className="text-xs text-purple-600 mb-1 font-bold">{TEXTS.totalSoldItems[lang]}</p>
                                <p className="text-2xl font-bold text-purple-800">{totalItemsSold}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 mb-1 font-bold">{TEXTS.avgOrderValue[lang]}</p>
                                <p className="text-2xl font-bold text-blue-800">Rs {deliveredOrders.length > 0 ? Math.round(totalSalesAmount / deliveredOrders.length) : 0}</p>
                            </div>
                        </div>
                    </div>
                )}
                 {activeTab === 'league' && (
                    <div className="space-y-6 animate-in slide-up">
                         {/* Replaced Fake League with Real Performance Stats */}
                         <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2"><Trophy size={28}/> {TEXTS.league[lang]}</h2>
                            <p className="text-yellow-100 text-sm">{TEXTS.topResellers[lang]}</p>
                         </div>
                         
                         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                             <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                                    Me
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Your Performance</h4>
                                    <p className="text-xs text-green-600 font-bold">Verified Reseller</p>
                                </div>
                             </div>
                             <div className="grid grid-cols-2 gap-3">
                                 <div className="bg-gray-50 p-3 rounded-xl text-center">
                                     <p className="text-xs text-gray-500">Total Orders</p>
                                     <p className="text-lg font-bold text-gray-800">{deliveredOrders.length}</p>
                                 </div>
                                 <div className="bg-gray-50 p-3 rounded-xl text-center">
                                     <p className="text-xs text-gray-500">Total Sales</p>
                                     <p className="text-lg font-bold text-gray-800">Rs {totalSalesAmount}</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg z-40 max-w-2xl mx-auto">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-brand-primary' : ''}`}><LayoutDashboard size={20}/> Home</button>
                    <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center gap-1 ${activeTab === 'orders' ? 'text-brand-primary' : ''}`}><ListOrdered size={20}/> Orders</button>
                    <button onClick={() => setActiveTab('sales')} className={`flex flex-col items-center gap-1 ${activeTab === 'sales' ? 'text-brand-primary' : ''}`}><BarChart3 size={20}/> Sales</button>
                    <button onClick={() => setActiveTab('league')} className={`flex flex-col items-center gap-1 ${activeTab === 'league' ? 'text-brand-primary' : ''}`}><Trophy size={20}/> League</button>
                </div>
            </div>
            
             <AddProductModal 
                isOpen={showAddModal} 
                onClose={() => setShowAddModal(false)} 
                onSave={handleAddProduct}
                lang={lang}
            />
        </div>
    );
});

// --- Main App with Persistence ---
const App: React.FC = () => {
  // Storage Helper
  const useStickyState = (defaultValue: any, key: string) => {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  };

  // State with persistence
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [userRole, setUserRole] = useStickyState(UserRole.USER, 'userRole');
  const [lang, setLang] = useStickyState('en', 'lang');
  const [userProfile, setUserProfile] = useStickyState(null, 'userProfile');
  const [cart, setCart] = useStickyState([], 'cart');
  const [orders, setOrders] = useStickyState([], 'orders');
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [activeChatOrderId, setActiveChatOrderId] = useState<string | null>(null);

  // Check login state on mount
  useEffect(() => {
      if (userProfile && currentView === AppView.LOGIN) {
          setCurrentView(userRole === UserRole.ADMIN ? AppView.ADMIN_DASHBOARD : AppView.HOME);
      }
  }, []);

  const handleLogin = useCallback((role: UserRole, profile?: {name: string, phone: string}) => {
    setUserRole(role);
    if (profile) setUserProfile(profile);
    setCurrentView(role === UserRole.ADMIN ? AppView.ADMIN_DASHBOARD : AppView.HOME);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentView(AppView.LOGIN);
    setUserRole(UserRole.USER);
    setCart([]);
    setSelectedProduct(null);
    setUserProfile(null); 
    // Clear sensitive data
    localStorage.removeItem('userProfile');
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');
  }, []);

  // Update Qty Logic
  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev: CartItem[]) => prev.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }).filter(item => item.quantity > 0)); 
  }, []);

  const handleOrderConfirm = (orderData: Partial<Order>) => {
    const newOrder: Order = {
        id: Date.now().toString(),
        items: [],
        type: 'personal', 
        status: 'Pending',
        total: 0,
        profit: 0,
        date: new Date().toISOString(),
        ...orderData
    } as Order;
    setOrders((prev: Order[]) => [newOrder, ...prev]);
    alert(lang === 'ur' ? "آرڈر کامیابی سے ہو گیا!" : `Order Placed Successfully!`);
    setCart([]);
    setSelectedProduct(null);
    setCurrentView(AppView.ORDERS);
  };

  const markDelivered = useCallback((orderId: string) => {
      setOrders((prev: Order[]) => prev.map(o => o.id === orderId ? { ...o, status: 'Delivered' } : o));
  }, []);
  
  const openChat = (orderId: string) => {
      setActiveChatOrderId(orderId);
      setCurrentView(AppView.CHAT);
  };

  const renderView = () => {
    if (selectedProduct) return <ProductDetailView product={selectedProduct} lang={lang} onOpenBuyModal={() => setBuyModalOpen(true)} />;
    
    switch(currentView) {
      case AppView.HOME: return <HomeView products={products} lang={lang} onProductClick={setSelectedProduct} />;
      case AppView.SHOP: return <ShopView products={products} lang={lang} onProductClick={setSelectedProduct} />;
      case AppView.CART: return <CartView cart={cart} lang={lang} onUpdateQty={updateQty} onCheckout={() => {}} />;
      case AppView.ORDERS: return <OrdersView orders={orders} lang={lang} onMarkDelivered={markDelivered} onChat={openChat} />;
      case AppView.ADMIN_DASHBOARD: return <AdminDashboard lang={lang} products={products} setProducts={setProducts} allOrders={orders} onMarkDelivered={markDelivered} />;
      case AppView.PROFILE: return <ProfileView userRole={userRole} lang={lang} orders={orders} userProfile={userProfile} />;
      case AppView.CHAT: return activeChatOrderId ? <ChatView orderId={activeChatOrderId} lang={lang} onBack={() => setCurrentView(AppView.ORDERS)} /> : <HomeView products={products} lang={lang} onProductClick={setSelectedProduct}/>;
      default: return <HomeView products={products} lang={lang} onProductClick={setSelectedProduct} />;
    }
  };

  if (currentView === AppView.LOGIN) return <LoginView onLogin={handleLogin} lang={lang} setLang={setLang} />;

  return (
    <>
        <Layout 
            currentView={currentView} 
            onChangeView={setCurrentView} 
            userRole={userRole}
            onLogout={handleLogout}
            lang={lang}
            cartCount={cart.reduce((a: number, b: CartItem) => a + b.quantity, 0)}
            onBack={selectedProduct ? () => setSelectedProduct(null) : undefined}
        >
            {renderView()}
        </Layout>
        <BuyNowModal 
            isOpen={buyModalOpen} 
            onClose={() => setBuyModalOpen(false)} 
            product={selectedProduct} 
            lang={lang} 
            onConfirm={handleOrderConfirm} 
        />
    </>
  );
};

export default App;
