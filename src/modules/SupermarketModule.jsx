import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronLeft,
  Check, Wallet, Target, FileText, ShoppingCart, DollarSign, Brain,
  Info, XCircle, CheckCircle2
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// SKILLS ENGINE
// ═══════════════════════════════════════════════════════════════

const SKILLS = {
  estimating: {
    id: 'estimating',
    name: 'Estimating',
    icon: '🎯',
    description: 'Making a reasonable guess before you have all the facts'
  },
  comparing: {
    id: 'comparing',
    name: 'Comparing',
    icon: '⚖️',
    description: 'Weighing up your options before choosing'
  },
  calculating: {
    id: 'calculating',
    name: 'Calculating',
    icon: '🧮',
    description: 'Working out totals and checking they\'re right'
  },
  forecasting: {
    id: 'forecasting',
    name: 'Forecasting',
    icon: '📈',
    description: 'Thinking ahead about future costs and surprises'
  },
  reflecting: {
    id: 'reflecting',
    name: 'Reflecting',
    icon: '🪞',
    description: 'Looking back at your choices and what you\'d do differently'
  }
};

// ═══════════════════════════════════════════════════════════════
// MODULE SKILL WEIGHTS
// ═══════════════════════════════════════════════════════════════

const moduleSkillWeights = {
  comparing: 3,
  calculating: 2,
  reflecting: 3
};

// ═══════════════════════════════════════════════════════════════
// VIRTUAL SUPERMARKET MODULE
// ═══════════════════════════════════════════════════════════════

export default function SupermarketModule({ onBack, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');
  const [anchorGuess, setAnchorGuess] = useState(10);
  const [cart, setCart] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [reflection, setReflection] = useState('');

  // Items Data - UPDATED PRICES TO BE WINNABLE (<$20)
  const GROCERY_LIST = [
    {
      id: 'cheese', name: 'Tasty Cheese', icon: '🧀',
      options: [
        { id: 'cheese_bulk', name: 'Block (1kg)', weight: '1kg', price: 18.00, unitPrice: '$18.00/kg', type: 'bulk' },
        { id: 'cheese_small', name: 'Slices (250g)', weight: '250g', price: 6.00, unitPrice: '$24.00/kg', type: 'small' }
      ]
    },
    {
      id: 'milk', name: 'Standard Milk', icon: '🥛',
      options: [
        { id: 'milk_bulk', name: 'Mega Jug (3L)', weight: '3L', price: 6.00, unitPrice: '$2.00/L', type: 'bulk' },
        { id: 'milk_small', name: 'Bottle (1L)', weight: '1L', price: 3.00, unitPrice: '$3.00/L', type: 'small' }
      ]
    },
    {
      id: 'bread', name: 'White Toast', icon: '🍞',
      options: [
        { id: 'bread_bulk', name: 'Bakery 3-Pack', weight: '3pk', price: 5.00, unitPrice: '$1.67/loaf', type: 'bulk' },
        { id: 'bread_small', name: 'Budget Loaf', weight: '1pk', price: 2.00, unitPrice: '$2.00/loaf', type: 'small' }
      ]
    },
    {
      id: 'mince', name: 'Beef Mince', icon: '🥩',
      options: [
        { id: 'mince_bulk', name: 'Family Pack (1kg)', weight: '1kg', price: 15.00, unitPrice: '$15.00/kg', type: 'bulk' },
        { id: 'mince_small', name: 'Tray (400g)', weight: '400g', price: 6.00, unitPrice: '$15.00/kg', type: 'small' }
      ]
    },
    {
      id: 'apples', name: 'Royal Gala', icon: '🍎',
      options: [
        { id: 'apples_bulk', name: 'Bag (1.5kg)', weight: '1.5kg', price: 6.00, unitPrice: '$4.00/kg', type: 'bulk' },
        { id: 'apples_small', name: 'Loose (2)', weight: '300g', price: 2.00, unitPrice: '$6.60/kg', type: 'small' }
      ]
    }
  ];

  const BUDGET_LIMIT = 20.00;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Anchor', icon: Target },
    { num: 1, name: 'List', icon: FileText },
    { num: 2, name: 'Shop', icon: ShoppingCart },
    { num: 3, name: 'Receipt', icon: DollarSign },
    { num: 4, name: 'Reflect', icon: Brain }
  ];

  return (
    <div className="relative min-h-screen pb-24" style={{backgroundColor: '#1A2F23'}}>
      {/* Module Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-stone-200/50">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-sky-600" />
              <span className="font-semibold text-stone-800">Supermarket</span>
            </div>
            <div className="w-16" />
          </div>

          {/* Phase Indicator */}
          <div className="flex items-center justify-between mt-4 px-1">
            {phases.map((p, idx) => (
              <React.Fragment key={p.num}>
                <div className={`flex flex-col items-center transition-all duration-300 ${
                  phase >= p.num ? 'opacity-100' : 'opacity-40'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    phase === p.num
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-110'
                      : phase > p.num
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-stone-100 text-stone-400'
                  }`}>
                    {phase > p.num ? <Check className="w-4 h-4" /> : <p.icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] mt-1 font-medium text-stone-600">{p.name}</span>
                </div>
                {idx < phases.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 rounded transition-colors duration-300 ${
                    phase > p.num ? 'bg-emerald-400' : 'bg-stone-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6">
        {phase === 0 && (
          <Phase0Anchor
            guess={anchorGuess}
            setGuess={setAnchorGuess}
            onNext={() => setPhase(1)}
          />
        )}
        {phase === 1 && (
          <Phase1TheList
            items={GROCERY_LIST}
            budget={BUDGET_LIMIT}
            onNext={() => setPhase(2)}
          />
        )}
        {phase === 2 && (
          <Phase2TheAisle
            allItems={GROCERY_LIST}
            cart={cart}
            setCart={setCart}
            totalSpent={totalSpent}
            setTotalSpent={setTotalSpent}
            budget={BUDGET_LIMIT}
            onNext={() => setPhase(3)}
          />
        )}
        {phase === 3 && (
          <Phase3Checkout
            cart={cart}
            totalSpent={totalSpent}
            allItems={GROCERY_LIST}
            onNext={() => setPhase(4)}
          />
        )}
        {phase === 4 && (
          <Phase4Reflection
            anchorGuess={anchorGuess}
            reflection={reflection}
            setReflection={setReflection}
            onComplete={() => onComplete(moduleSkillWeights)}
          />
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-outfit { font-family: 'Outfit', system-ui, sans-serif; }

        :root {
          --midnight-moss: #1A2F23;
          --forest-card-from: #2D4A3E;
          --forest-card-to: #3A5D4D;
          --cream: #F5F1E6;
          --matcha-green: #B7D9B1;
          --rose-500: #F43F5E;
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s var(--ease-out) forwards; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.5s var(--ease-out) forwards; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }

        /* Custom Range Slider */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #243D2E, #2E4A38);
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(145deg, #059669, #10B981);
          cursor: pointer;
          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
          border: 2px solid #fff;
        }

        .soft-card {
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-radius: 24px;
          padding: 20px;
        }

        .forest-card {
          background: linear-gradient(145deg, #2D4A3E, #3A5D4D);
          box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          color: white;
        }

        .skill-check-box {
          background: linear-gradient(145deg, #2D4A3E, #3A5D4D);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .skill-check-box p {
          color: #F5F1E6;
          font-size: 14px;
          margin: 0;
        }
        .skill-check-box strong {
          color: #B7D9B1;
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 0: THE ANCHOR (Price Shock)
// ═══════════════════════════════════════════════════════════════

function Phase0Anchor({ guess, setGuess, onNext }) {
  const [locked, setLocked] = useState(false);
  const REAL_PRICE = 18.50;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 text-2xl shadow-sm">
            🧀
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-800">The Price of Cheese</h2>
            <p className="text-sm text-stone-500">Estimating NZ Food Costs</p>
          </div>
        </div>

        <p className="text-stone-600 mb-6">
          Food prices in NZ have skyrocketed. Before we go shopping, let's test your knowledge.
          <br/><br/>
          <strong>How much is a 1kg block of Tasty Cheese right now?</strong>
        </p>

        {!locked ? (
          <div className="flex flex-col items-center gap-4 mb-4">
            <span className="text-5xl font-bold text-sky-600">${guess.toFixed(2)}</span>
            <input
              type="range"
              min="5"
              max="25"
              step="0.50"
              value={guess}
              onChange={(e) => setGuess(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between w-full text-xs text-stone-400">
              <span>$5 (Cheap)</span>
              <span>$25 (Luxury)</span>
            </div>

            <button
              onClick={() => setLocked(true)}
              className="w-full mt-4 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
            >
              Lock in guess
            </button>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="text-center mb-6 p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="flex justify-between items-center mb-4 border-b border-stone-200 pb-4">
                <div className="text-left">
                  <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">You Guessed</p>
                  <p className="text-2xl font-bold text-stone-600">${guess.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Real Avg Price</p>
                  <p className="text-2xl font-bold text-emerald-600">${REAL_PRICE.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-sm text-stone-500 italic">
                "It's liquid gold!"
              </p>
            </div>
            <button
              onClick={onNext}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Go Shopping <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="skill-check-box animate-fade-in">
        <p>
          <span className="text-lg mr-2">🎯</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Estimating</strong> — updating your mental database of prices.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: THE LIST
// ═══════════════════════════════════════════════════════════════

function Phase1TheList({ items, budget, onNext }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6 bg-stone-50 border-2 border-stone-100 relative overflow-hidden">
        {/* Paper texture effect hint */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-stone-200/50 to-transparent"></div>

        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-stone-800 font-serif tracking-tight">Shopping List</h2>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 text-xl">
            📝
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {items.map((item, i) => (
            <li key={item.id} className="flex items-center gap-4 text-stone-700 font-medium text-lg border-b border-stone-200/50 pb-2 last:border-0">
              <div className="w-6 h-6 rounded-full border-2 border-stone-300"></div>
              <span className="text-2xl">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>

        <div className="bg-emerald-100 p-4 rounded-xl flex items-center gap-3">
          <div className="bg-emerald-200 p-2 rounded-lg text-emerald-800">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Your Cash Limit</p>
            <p className="text-2xl font-bold text-emerald-800">${budget.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="soft-card p-5">
        <p className="text-stone-600 text-sm">
          <strong>The Mission:</strong> Buy everything on the list.
          <br/>
          <strong>The Catch:</strong> You have exactly $20. No credit cards. No overdraft.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Enter Aisle 1 <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE AISLE (Shopping Cart Hero)
// ═══════════════════════════════════════════════════════════════

function Phase2TheAisle({ allItems, cart, setCart, totalSpent, setTotalSpent, budget, onNext }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorShake, setErrorShake] = useState(false);
  const [failItem, setFailItem] = useState(null);

  const handleSelectCategory = (item) => {
    if (!cart.find(c => c.categoryId === item.id)) {
      setSelectedCategory(item);
      setFailItem(null);
    }
  };

  const handleBuyItem = (option, category) => {
    const newTotal = totalSpent + option.price;

    if (newTotal > budget) {
      setFailItem(option);
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      return;
    }

    const cartItem = { ...option, categoryId: category.id, categoryIcon: category.icon };
    setCart([...cart, cartItem]);
    setTotalSpent(newTotal);
    setSelectedCategory(null);
  };

  const isCartFull = cart.length === allItems.length;

  return (
    <div className="space-y-4 animate-fade-in relative">

      {/* Sticky Budget Header */}
      <div className="sticky top-20 z-20 bg-stone-800 text-white p-4 rounded-xl shadow-lg flex justify-between items-center mb-6">
        <div>
          <p className="text-xs opacity-70 uppercase tracking-widest">Total Spent</p>
          <p className="text-2xl font-bold font-mono">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-70 uppercase tracking-widest">Remaining</p>
          <p className={`text-xl font-bold font-mono ${(budget - totalSpent) < 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
            ${(budget - totalSpent).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Main Shelf Display */}
      {!selectedCategory ? (
        <div className="space-y-3">
          {allItems.map((item) => {
            const inCart = cart.find(c => c.categoryId === item.id);
            return (
              <button
                key={item.id}
                onClick={() => !inCart && handleSelectCategory(item)}
                disabled={!!inCart}
                className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all duration-300 border-b-4 ${
                  inCart
                    ? 'bg-emerald-50 border-emerald-200 opacity-60'
                    : 'bg-white border-stone-200 shadow-sm hover:border-emerald-400 hover:shadow-lg hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl filter drop-shadow-sm">{item.icon}</span>
                  <div className="text-left">
                    <span className={`font-semibold text-lg block ${inCart ? 'text-emerald-800 line-through' : 'text-stone-800'}`}>
                      {item.name}
                    </span>
                    {inCart && <span className="text-xs text-emerald-600 font-medium">Added to cart</span>}
                  </div>
                </div>
                {inCart ? (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-full">
                    <CheckCircle2 size={20} />
                    <span>${inCart.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="bg-stone-100 p-2 rounded-full text-stone-400 group-hover:bg-emerald-100 group-hover:text-emerald-600">
                    <ChevronRight size={24} />
                  </div>
                )}
              </button>
            );
          })}

          {isCartFull && (
            <button
              onClick={onNext}
              className="w-full mt-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 animate-slide-up"
            >
              Checkout <ShoppingCart size={20} />
            </button>
          )}
        </div>
      ) : (
        /* PRODUCT SELECTION VIEW (The Trap) */
        <div className="animate-slide-up">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-4 flex items-center gap-2 text-stone-500 text-sm font-medium hover:text-stone-800"
          >
            <ChevronLeft size={16} /> Back to Shelf
          </button>

          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block filter drop-shadow-md animate-float">{selectedCategory.icon}</span>
            <h2 className="text-2xl font-bold text-stone-800">{selectedCategory.name}</h2>
            <p className="text-stone-500 text-sm">Select a product option</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {selectedCategory.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleBuyItem(option, selectedCategory)}
                className="group relative bg-white p-6 rounded-2xl shadow-sm border-2 border-stone-100 hover:border-sky-400 hover:shadow-lg transition-all text-left flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-xl text-stone-800">{option.name}</h3>
                    {option.type === 'bulk' && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-amber-200">
                        Best Value
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 text-base font-medium bg-stone-100 inline-block px-2 py-1 rounded-md">{option.weight}</p>
                  <p className="text-xs text-stone-400 mt-2 font-mono">Unit Price: {option.unitPrice}</p>
                </div>
                <div className="text-2xl font-bold text-stone-800 group-hover:text-sky-600 bg-stone-50 px-4 py-2 rounded-xl group-hover:bg-sky-50 transition-colors">
                  ${option.price.toFixed(2)}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl flex gap-3 text-sm text-blue-800 border border-blue-100">
            <Info className="shrink-0 w-5 h-5" />
            <p>Compare the <strong>Unit Price</strong> to see which one gives you more for your money.</p>
          </div>
        </div>
      )}

      {/* FAIL OVERLAY (Transaction Declined) */}
      {failItem && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm ${errorShake ? 'animate-shake' : ''}`}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4 text-rose-500">
              <XCircle size={48} />
            </div>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">Transaction Declined</h3>
            <p className="text-stone-600 mb-6">
              You cannot afford the <strong>{failItem.name}</strong>.
              <br/>
              Current Balance: <span className="font-bold text-stone-800">${(budget - totalSpent).toFixed(2)}</span>
              <br/>
              Item Cost: <span className="font-bold text-rose-500">${failItem.price.toFixed(2)}</span>
            </p>
            <button
              onClick={() => setFailItem(null)}
              className="w-full py-3 rounded-xl bg-stone-800 text-white font-semibold hover:bg-stone-900"
            >
              Try Another Option
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE CHECKOUT
// ═══════════════════════════════════════════════════════════════

function Phase3Checkout({ cart, totalSpent, allItems, onNext }) {
  const badValueCount = cart.filter(c => c.type === 'small').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Receipt Card */}
      <div className="soft-card p-0 overflow-hidden relative">
        <div className="bg-stone-800 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check size={32} />
          </div>
          <h2 className="text-xl font-bold">Payment Accepted</h2>
          <p className="opacity-80 text-sm">Thank you for shopping</p>
        </div>

        {/* Receipt Paper Edge */}
        <div className="h-4 bg-stone-800 relative">
           <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{clipPath: 'polygon(0 100%, 5% 0, 10% 100%, 15% 0, 20% 100%, 25% 0, 30% 100%, 35% 0, 40% 100%, 45% 0, 50% 100%, 55% 0, 60% 100%, 65% 0, 70% 100%, 75% 0, 80% 100%, 85% 0, 90% 100%, 95% 0, 100% 100%)'}}></div>
        </div>

        <div className="p-6 bg-white font-mono text-sm space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between border-b border-dashed border-stone-200 pb-2">
              <div>
                <span className="font-bold">{item.name}</span>
                {item.type === 'small' && <span className="ml-2 text-[10px] text-rose-500 uppercase font-bold">(Poor Value)</span>}
              </div>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}

          <div className="pt-2 flex justify-between text-lg font-bold border-t-2 border-stone-800 mt-4">
            <span>TOTAL</span>
            <span>${totalSpent.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="forest-card p-6">
        <h3 className="text-xl font-semibold mb-2">The Cost of Cash Flow</h3>
        <p className="text-white/80 text-sm mb-4">
          You spent <strong>${totalSpent.toFixed(2)}</strong>.
          To stay under budget, you had to buy {badValueCount} "Small" items.
        </p>
        <div className="bg-white/10 p-4 rounded-xl text-sm">
          <p>
            If you had bought the Bulk versions, you would have saved money per kg, but you would have needed <strong>$49.00</strong> upfront.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Reflect on this <Brain size={20} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 4: REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase4Reflection({ anchorGuess, reflection, setReflection, onComplete }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-5">
        <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-600" />
          Why is it expensive to be poor?
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          You just experienced the "Poverty Premium". When you don't have enough cash flow ($20 note), you can't access the "Best Value" deals.
          <br/><br/>
          You are forced to buy smaller amounts at higher unit prices, meaning you spend more money in the long run for the same amount of food.
        </p>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-900 text-sm italic">
          "I can't afford to save money."
        </div>
      </div>

      <div className="soft-card p-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          How did it feel being forced to choose the "worse value" option just to afford the total bill?
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="It felt..."
          className="w-full p-3 border-2 border-stone-200 rounded-xl text-stone-700 resize-none focus:border-emerald-500 focus:outline-none focus:ring-0 transition-colors"
          rows={3}
        />
      </div>

      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">⚖️</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Comparing</strong> — understanding Unit Price vs. Total Price.
        </p>
      </div>

      <div className="forest-card p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-4xl mx-auto mb-4">
          🧺
        </div>
        <h4 className="text-xl font-semibold text-white mb-2">
          Add skills to Kete Pūtea
        </h4>
        <p className="text-white/70 mb-6 text-sm">
          You've earned points in Comparing, Calculating, and Reflecting.
        </p>

        <button
          onClick={onComplete}
          disabled={reflection.length < 5}
          className={`w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
            reflection.length < 5
              ? 'bg-white/20 text-white/50 cursor-not-allowed'
              : 'bg-white text-emerald-700 hover:bg-white/90'
          }`}
        >
          <span className="text-xl">🌿</span>
          Add to Kete
        </button>
      </div>
    </div>
  );
}
