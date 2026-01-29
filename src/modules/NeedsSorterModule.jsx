import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronLeft,
  Heart, AlertTriangle, Shield,
  Sparkles, Check, Wallet, Target,
  Scale, Brain, XCircle, CheckCircle2, Zap, Coffee,
  Smartphone, Wifi, Utensils, Home
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// SKILLS ENGINE
// ═══════════════════════════════════════════════════════════════

const SKILLS = {
  estimating: {
    id: 'estimating',
    name: 'Estimating',
    icon: '🎯',
    description: 'Making reasonable guesses before having all the facts.'
  },
  researching: {
    id: 'researching',
    name: 'Researching',
    icon: '🔍',
    description: 'Finding reliable info to help you decide.'
  },
  comparing: {
    id: 'comparing',
    name: 'Comparing',
    icon: '⚖️',
    description: 'Weighing up options and trade-offs.'
  },
  calculating: {
    id: 'calculating',
    name: 'Calculating',
    icon: '🧮',
    description: 'Working out totals and checking accuracy.'
  },
  prioritising: {
    id: 'prioritising',
    name: 'Prioritising',
    icon: '⭐',
    description: 'Ranking what matters most when resources are limited.'
  },
  reflecting: {
    id: 'reflecting',
    name: 'Reflecting',
    icon: '🪞',
    description: 'Thinking about choices and what you learned.'
  }
};

// ═══════════════════════════════════════════════════════════════
// MODULE SKILL WEIGHTS
// ═══════════════════════════════════════════════════════════════

const moduleSkillWeights = {
  prioritising: 5,
  estimating: 2,
  reflecting: 3
};

// ═══════════════════════════════════════════════════════════════
// MAIN MODULE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function NeedsSorterModule({ onBack, onComplete }) {
  // Internal state
  const [phase, setPhase] = useState(0);
  const [anchorGuess, setAnchorGuess] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);
  const [cutItems, setCutItems] = useState([]);
  const [reflection, setReflection] = useState('');

  // Data for sorting (Phase 1)
  const initialItems = [
    { id: 'netflix', name: 'Netflix', cost: 20, icon: <Zap size={20} />, type: 'ambiguous' },
    { id: 'rent', name: 'Rent', cost: 1000, icon: <Home size={20} />, type: 'need' },
    { id: 'gym', name: 'Gym Membership', cost: 60, icon: <Heart size={20} />, type: 'want' },
    { id: 'power', name: 'Power Bill', cost: 150, icon: <Zap size={20} />, type: 'need' },
    { id: 'takeaways', name: 'Takeaways', cost: 200, icon: <Utensils size={20} />, type: 'want' },
    { id: 'phone', name: 'Phone Data', cost: 60, icon: <Smartphone size={20} />, type: 'ambiguous' },
    { id: 'coffee', name: 'Daily Coffee', cost: 100, icon: <Coffee size={20} />, type: 'want' },
    { id: 'internet', name: 'High-Speed Internet', cost: 90, icon: <Wifi size={20} />, type: 'ambiguous' },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Anchor', icon: Target },
    { num: 1, name: 'Sort', icon: Scale },
    { num: 2, name: 'Trap', icon: AlertTriangle },
    { num: 3, name: 'Cuts', icon: Shield },
    { num: 4, name: 'Review', icon: Brain }
  ];

  return (
    <div className="relative min-h-screen pb-24">
      {/* Module Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-stone-200/50">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Hub</span>
            </button>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Needs vs Wants</span>
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
            onNext={(val) => {
              setAnchorGuess(val);
              setPhase(1);
            }}
          />
        )}
        {phase === 1 && (
          <Phase1Sorter
            items={initialItems}
            onComplete={(items) => {
              setSortedItems(items);
              setPhase(2);
            }}
          />
        )}
        {phase === 2 && (
          <Phase2TheTrap
            sortedItems={sortedItems}
            setSortedItems={setSortedItems}
            onNext={() => setPhase(3)}
          />
        )}
        {phase === 3 && (
          <Phase3TheCuts
            sortedItems={sortedItems}
            setSortedItems={setSortedItems}
            cutItems={cutItems}
            setCutItems={setCutItems}
            onNext={() => setPhase(4)}
          />
        )}
        {phase === 4 && (
          <Phase4Reflection
            anchorGuess={anchorGuess}
            finalNeedCount={sortedItems.filter(i => i.status === 'need' && !cutItems.includes(i.id)).length}
            totalItems={initialItems.length}
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
          --matcha-green: #B7D9B1;
          --cream: #F5F1E6;
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

        @keyframes pulse-soft {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .animate-pulse-soft { animation: pulse-soft 2s infinite; }

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
          background: linear-gradient(145deg, #059669, #10b981);
          cursor: pointer;
          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform 0.1s;
        }
        input[type="range"]::-webkit-slider-thumb:active {
            transform: scale(1.2);
        }

        /* Standard Inputs */
        input[type="text"], input[type="number"] {
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 18px;
          font-family: 'Outfit', system-ui, sans-serif;
          width: 100%;
          outline: none;
          transition: all 0.2s ease;
          color: #1f2937;
        }
        input[type="text"]:focus, input[type="number"]:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
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
// PHASE 0: THE ANCHOR
// ═══════════════════════════════════════════════════════════════

function Phase0Anchor({ onNext }) {
  const [guess, setGuess] = useState(50);
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          The Anchor
        </h3>

        <p className="text-stone-600 mb-6">
          Every month, money comes in and money goes out.
          <br/><br/>
          <strong>How much of your future income do you think needs to go to "Survival" (Needs) vs "Fun" (Wants)?</strong>
        </p>

        <div className="flex flex-col items-center gap-6 mb-4">
          <div className="w-full flex justify-between px-2 text-sm font-bold">
            <span className="text-emerald-600">NEEDS {guess}%</span>
            <span className="text-rose-500">WANTS {100 - guess}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={guess}
            onChange={(e) => setGuess(Number(e.target.value))}
            className="w-full"
            disabled={isLocked}
          />

          <div className="w-full bg-stone-100 h-16 rounded-xl overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full flex items-center justify-center text-white/90 font-medium transition-all duration-300"
              style={{ width: `${guess}%` }}
            >
              {guess > 15 && 'Survival'}
            </div>
            <div
              className="bg-rose-400 h-full flex items-center justify-center text-white/90 font-medium transition-all duration-300"
              style={{ width: `${100 - guess}%` }}
            >
              {100 - guess > 15 && 'Fun'}
            </div>
          </div>
        </div>

        {!isLocked ? (
          <button
            onClick={() => setIsLocked(true)}
            className="w-full mt-2 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Lock in Estimate
            <Check className="w-5 h-5" />
          </button>
        ) : (
          <div className="animate-slide-up">
             <div className="skill-check-box mb-4">
              <p>
                <span className="text-lg mr-2">🎯</span>
                <span className="opacity-80">Skill check:</span> You're practicing <strong>Estimating</strong> — setting a baseline before you see the real costs.
              </p>
            </div>
            <button
              onClick={() => onNext(guess)}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Start Sorting
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: THE SORT (RAPID FIRE)
// ═══════════════════════════════════════════════════════════════

function Phase1Sorter({ items, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const handleSort = (status) => {
    const newItem = { ...items[currentIndex], status };
    const newHistory = [...history, newItem];
    setHistory(newHistory);

    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimeout(() => onComplete(newHistory), 500);
    }
  };

  const currentItem = items[currentIndex];

  return (
    <div className="h-full flex flex-col justify-between animate-fade-in">

      {/* Progress */}
      <div className="flex justify-between items-center mb-6 px-2">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Sorting Expenses</span>
        <span className="text-xs font-bold text-stone-400">{currentIndex + 1} / {items.length}</span>
      </div>

      {/* The Card */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
        <div key={currentItem.id} className="w-full aspect-[3/4] max-h-[400px] soft-card flex flex-col items-center justify-center gap-6 animate-slide-up relative z-10">
          <div className="w-24 h-24 rounded-full bg-stone-50 flex items-center justify-center text-stone-600">
            {React.cloneElement(currentItem.icon, { size: 40 })}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800 mb-1">{currentItem.name}</h2>
            <p className="text-stone-500 font-medium">${currentItem.cost} / month</p>
          </div>
        </div>

        {/* Background stack effect */}
        <div className="absolute top-2 w-[95%] h-full bg-stone-200 rounded-3xl -z-10" />
        <div className="absolute top-4 w-[90%] h-full bg-stone-100 rounded-3xl -z-20" />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSort('need')}
          className="py-6 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform flex flex-col items-center"
        >
          <CheckCircle2 className="mb-2" />
          NEED
          <span className="text-xs font-normal opacity-80">Survival</span>
        </button>
        <button
          onClick={() => handleSort('want')}
          className="py-6 rounded-2xl bg-rose-500 text-white font-bold text-lg shadow-lg shadow-rose-500/30 active:scale-95 transition-transform flex flex-col items-center"
        >
          <Heart className="mb-2" />
          WANT
          <span className="text-xs font-normal opacity-80">Nice to have</span>
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE TRAP (GRAY AREA)
// ═══════════════════════════════════════════════════════════════

function Phase2TheTrap({ sortedItems, setSortedItems, onNext }) {
  const [showPersona, setShowPersona] = useState(true);

  // Calculate totals
  const totalNeedsCost = sortedItems
    .filter(i => i.status === 'need')
    .reduce((sum, i) => sum + i.cost, 0);

  const budgetLimit = 1400;
  const isOverBudget = totalNeedsCost > budgetLimit;
  const percentUsed = Math.min((totalNeedsCost / budgetLimit) * 100, 100);

  const toggleItem = (id) => {
    setSortedItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'need' ? 'want' : 'need' };
      }
      return item;
    }));
  };

  if (showPersona) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="forest-card p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl mb-6">
            🎓
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Persona: Uni Student</h2>
          <p className="text-white/80 mb-6 leading-relaxed">
            You are now sorting for a student living in Auckland.
            <br/><br/>
            Your income is fixed.
            Some things you called "Wants" might be "Needs" for study.
            Some "Needs" might be too expensive.
          </p>
          <button
            onClick={() => setShowPersona(false)}
            className="w-full py-4 rounded-xl bg-white text-emerald-800 font-bold hover:bg-stone-100 transition-colors"
          >
            Check the Budget
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Budget Bar */}
      <div className="sticky top-[80px] z-20 bg-white/95 backdrop-blur shadow-sm p-4 rounded-xl border border-stone-200">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2">
          <span>Monthly Budget</span>
          <span className={isOverBudget ? 'text-rose-500' : 'text-stone-500'}>
            ${totalNeedsCost} / ${budgetLimit}
          </span>
        </div>
        <div className="h-4 bg-stone-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'}`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
        {isOverBudget && (
          <p className="text-xs text-rose-500 font-bold mt-2 flex items-center gap-1 animate-pulse">
            <AlertTriangle size={12} /> OVER BUDGET! Move items to "WANT" to fix.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {sortedItems.map(item => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              item.status === 'need'
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-white border-stone-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.status === 'need' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-stone-800">{item.name}</h4>
                <p className="text-xs text-stone-500">${item.cost}/mo</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              item.status === 'need' ? 'bg-emerald-200 text-emerald-800' : 'bg-stone-200 text-stone-500'
            }`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={isOverBudget}
        className={`w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
          isOverBudget
            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700'
        }`}
      >
        {isOverBudget ? 'Fix Budget First' : 'Confirm Budget'}
        {!isOverBudget && <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE CUTS (CRISIS)
// ═══════════════════════════════════════════════════════════════

function Phase3TheCuts({ sortedItems, setSortedItems, cutItems, setCutItems, onNext }) {
  const [showCrisis, setShowCrisis] = useState(true);

  // Only items currently marked as NEED can be cut
  const needs = sortedItems.filter(i => i.status === 'need');
  const requiredCuts = 2;
  const cutsMade = cutItems.length;

  const toggleCut = (id) => {
    if (cutItems.includes(id)) {
      setCutItems(cutItems.filter(i => i !== id));
    } else {
      if (cutsMade < requiredCuts) {
        setCutItems([...cutItems, id]);
      }
    }
  };

  if (showCrisis) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="p-8 rounded-24 bg-rose-500 text-white text-center flex flex-col items-center shadow-xl rounded-3xl">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl mb-6 animate-pulse">
            🚨
          </div>
          <h2 className="text-2xl font-bold mb-2">Crisis!</h2>
          <p className="text-white/90 mb-6 leading-relaxed">
            Your landlord just increased the rent by $50/week.
            <br/><br/>
            You are now underwater. You <strong>MUST</strong> cut 2 items from your "Needs" list to survive.
          </p>
          <button
            onClick={() => setShowCrisis(false)}
            className="w-full py-4 rounded-xl bg-white text-rose-600 font-bold hover:bg-rose-50 transition-colors"
          >
            Make the Cuts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-4 flex items-center justify-between bg-rose-50 border-rose-100 border">
        <span className="font-bold text-rose-700">Cuts Required</span>
        <div className="flex gap-2">
          {[1, 2].map(num => (
            <div key={num} className={`w-3 h-3 rounded-full ${cutsMade >= num ? 'bg-rose-500' : 'bg-rose-200'}`} />
          ))}
        </div>
      </div>

      <p className="text-sm text-stone-500 px-2">
        Select {requiredCuts} "Needs" to downgrade to "Wants".
      </p>

      <div className="space-y-3">
        {needs.map(item => {
           const isCut = cutItems.includes(item.id);
           return (
            <div
              key={item.id}
              onClick={() => toggleCut(item.id)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                isCut
                  ? 'bg-rose-50 border-rose-500'
                  : 'bg-white border-stone-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isCut ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800">{item.name}</h4>
                  <p className="text-xs text-stone-500">${item.cost}/mo</p>
                </div>
              </div>
              {isCut && <XCircle className="text-rose-500" size={20} />}
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={cutsMade < requiredCuts}
        className={`w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
          cutsMade < requiredCuts
            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
            : 'bg-rose-500 text-white hover:bg-rose-600'
        }`}
      >
        Confirm Cuts
        {cutsMade >= requiredCuts && <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 4: REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase4Reflection({ anchorGuess, finalNeedCount, totalItems, reflection, setReflection, onComplete }) {
  const finalPercent = Math.round((finalNeedCount / totalItems) * 100);
  const diff = Math.abs(anchorGuess - finalPercent);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-5">
        <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-600" />
          The Breakdown
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-stone-50 rounded-xl">
            <p className="text-sm text-stone-500 mb-1">You thought</p>
            <p className="text-2xl font-bold text-stone-600">{anchorGuess}%</p>
            <p className="text-xs text-stone-400">Needs</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <p className="text-sm text-emerald-600 mb-1">Reality</p>
            <p className="text-2xl font-bold text-emerald-700">{finalPercent}%</p>
            <p className="text-xs text-emerald-500">Needs</p>
          </div>
        </div>

        <p className="text-sm text-stone-600">
          When resources got tight, you had to cut things you thought were essential.
          <br/><br/>
          A "Need" isn't fixed. It changes based on your situation.
        </p>
      </div>

      <div className="soft-card p-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          How does your definition of a "Need" change when money runs out?
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I realized that..."
          className="w-full p-3 border-2 border-stone-200 rounded-xl text-stone-700 resize-none focus:border-emerald-500 focus:outline-none"
          rows={3}
        />
      </div>

      {/* Skill check */}
      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">⭐</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Prioritising</strong> — making hard choices to survive.
        </p>
      </div>

      {/* Add to Kete CTA */}
      <div className="forest-card p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-4xl mx-auto mb-4">
          🧺
        </div>
        <h4 className="text-xl font-semibold text-white mb-2">
          Add skills to Kete Pūtea
        </h4>
        <p className="text-white/70 mb-6">
          You've earned new skills in Prioritising, Estimating, and Reflecting.
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
