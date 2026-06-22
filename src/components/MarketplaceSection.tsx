import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  Mail, 
  PlusCircle, 
  Check, 
  Search, 
  CreditCard,
  PlusSquare,
  AlertCircle
} from 'lucide-react';
import { MarketItem, User } from '../types';

interface MarketplaceSectionProps {
  items: MarketItem[];
  currentUser: User | null;
  onAddItem: (title: string, price: number, description: string, category: 'Textbooks' | 'Electronics' | 'Lab Gear' | 'Uniforms' | 'Other', contactEmail: string) => void;
  onOpenAuth: () => void;
}

export default function MarketplaceSection({
  items,
  currentUser,
  onAddItem,
  onOpenAuth
}: MarketplaceSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListingItem, setIsListingItem] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(350);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Textbooks' | 'Electronics' | 'Lab Gear' | 'Uniforms' | 'Other'>('Textbooks');
  const [contactEmail, setContactEmail] = useState('');

  // Simulated contacted sellers state
  const [contactedItemIds, setContactedItemIds] = useState<string[]>([]);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!title.trim() || price <= 0) return;

    onAddItem(
      title, 
      price, 
      description, 
      category, 
      contactEmail.trim() || currentUser.email
    );

    // Reset Form
    setTitle('');
    setPrice(300);
    setDescription('');
    setCategory('Textbooks');
    setContactEmail('');
    setIsListingItem(false);
  };

  const handleContactSeller = (item: MarketItem) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (contactedItemIds.includes(item.id)) return;
    
    setContactedItemIds(prev => [...prev, item.id]);
    alert(`📧 [USTP Mail Bridge] An official campus trade request was routed from your account to "${item.seller.name}" (${item.contactEmail}) regarding "${item.title}". Please check your academic inbox for follow-up details!`);
  };

  const categories = ['ALL', 'Textbooks', 'Electronics', 'Lab Gear', 'Uniforms', 'Other'];

  const filteredItems = items.filter(item => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Showcase banner */}
      <div className="bg-slate-900 border-b-4 border-ustp-gold text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-ustp-gold text-slate-900 font-bold px-2 py-0.5 rounded uppercase font-mono">
            USTP STUDENT-TO-STUDENT MARKETPLACE
          </span>
          <h2 className="text-xl font-bold font-display text-white mt-1">
            USTP Academic Trading Board
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed mt-0.5">
            Trade and reuse textbooks, laboratory rulers, drafting sets, calculators, microcontrollers, and official department polo uniforms with colleagues safely.
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) onOpenAuth();
            else {
              setIsListingItem(!isListingItem);
              setContactEmail(currentUser.email);
            }
          }}
          className="text-xs bg-ustp-gold hover:bg-ustp-gold-dark text-slate-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
        >
          <PlusSquare className="h-4 w-4" />
          List Used Item
        </button>
      </div>

      {/* Listing Form */}
      {isListingItem && (
        <form 
          onSubmit={handleCreateListing}
          className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="border-b pb-2 border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 font-display uppercase tracking-wide">
              List Item for Trade / Sale
            </span>
            <span className="text-[10px] text-slate-400">Seller: {currentUser?.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Item / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CASIO fx-991ES Plus"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Price (PHP / ₱) *
              </label>
              <input
                type="number"
                required
                placeholder="Php Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Textbooks">Textbooks</option>
                <option value="Electronics">Electronics (Calcs / Dev Kits)</option>
                <option value="Lab Gear">Lab/Drafting Gear</option>
                <option value="Uniforms">Official Uniforms</option>
                <option value="Other">Other Category</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Contact Email (Official Student Mail)
              </label>
              <input
                type="email"
                placeholder={currentUser?.email}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Brief Description *
              </label>
              <input
                type="text"
                required
                placeholder="State the wearing conditions, missing accessories, or course requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 text-xs pt-1">
            <button
              type="button"
              onClick={() => setIsListingItem(false)}
              className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-ustp-blue text-white px-4 py-1.5 rounded font-semibold"
            >
              Publish Listing
            </button>
          </div>
        </form>
      )}

      {/* Filters and search layout */}
      <div className="space-y-3">
        
        {/* Category lists */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold cursor-pointer transition ${
                selectedCategory === cat
                  ? 'bg-ustp-blue text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-250'
              }`}
            >
              {cat === 'ALL' ? '👜 All Items' : cat}
            </button>
          ))}
        </div>

        {/* Search input bar */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-slate-400 shrink-0 ml-1" />
          <input
            type="text"
            placeholder="Search textbook author, electronics parts, drawing boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent text-xs text-slate-700 focus:outline-none"
          />
        </div>

      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 py-8 text-center text-slate-400 text-xs bg-slate-50 border border-dashed rounded-xl">
            No active trades match your search filter.
          </div>
        ) : (
          filteredItems.map((item) => {
            const hasContacted = contactedItemIds.includes(item.id);

            return (
              <div 
                key={item.id} 
                className={`bg-white rounded-2xl border overflow-hidden shadow-2xs hover:shadow-xs transition flex flex-col justify-between ${
                  item.sold ? 'border-slate-200 bg-slate-50/70 opacity-75' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Image Placeholder with category overlay */}
                <div className="h-32 bg-slate-100 relative flex items-center justify-center p-4">
                  
                  {/* Category icon indicator */}
                  <ShoppingBag className="h-8 w-8 text-slate-300" />

                  {/* Price Tag */}
                  <div className="absolute top-2 left-2 bg-slate-900 border border-ustp-gold text-ustp-gold text-xs font-mono font-extrabold px-2.5 py-1 rounded">
                    ₱{item.price.toLocaleString()}
                  </div>

                  {/* Sold watermark */}
                  {item.sold && (
                    <div className="absolute inset-0 bg-red-950/40 backdrop-blur-2xs flex items-center justify-center">
                      <span className="text-[10px] font-black tracking-widest uppercase border border-red-300 bg-red-600 text-white px-3 py-1 rounded-sm rotate-12">
                        COMPLETED TRADE
                      </span>
                    </div>
                  )}

                  <span className="absolute bottom-2 right-2 text-[9px] bg-slate-200/90 text-slate-800 px-2 py-0.5 rounded font-semibold font-display">
                    {item.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-950 font-display line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-505 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Seller and actions */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={item.seller.avatar}
                          alt={item.seller.name}
                          className="h-6 w-6 rounded-full object-cover shrink-0"
                        />
                        <span className="font-semibold text-slate-800">{item.seller.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-slate-400 font-mono">{item.timestamp}</span>
                    </div>

                    {!item.sold && (
                      <button
                        onClick={() => handleContactSeller(item)}
                        disabled={hasContacted}
                        className={`w-full text-xs font-bold py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          hasContacted
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>{hasContacted ? 'Message Dispatched' : 'Request Official Contact'}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
