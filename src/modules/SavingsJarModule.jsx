import React, { useState, useEffect, useRef } from 'react';
import {
  Leaf, ChevronRight, ChevronLeft,
  Check,
  Target, Sprout, Clock, Brain,
  Coffee, Gamepad2, ShoppingBag, Music, Utensils, TreeDeciduous,
  Wallet, AlertTriangle, Coins, XCircle, PiggyBank
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - Financial Literacy Prototype (NZ Context)
// "Quiet Interface" Design System | The Savings Jar (Loss Aversion)
// ═══════════════════════════════════════════════════════════════

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
  forecasting: 3,
  estimating: 2
};

// ═══════════════════════════════════════════════════════════════
// SAVINGS JAR MODULE (Main Component)
// ═══════════════════════════════════════════════════════════════

export default function SavingsJarModule({ onBack, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [prediction, setPrediction] = useState(60);
  const [finalReflection, setFinalReflection] = useState('');

  // Game State
  const [gameState, setGameState] = useState({
    treeHealth: 50,
    treeScale: 1.0,
    cash: 0,
    inventory: [],
    timeLeft: 60,
    totalSaved: 0,
    totalSpent: 0
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Predict', icon: Target },
    { num: 1, name: 'Setup', icon: Sprout },
    { num: 2, name: 'Grow', icon: Clock },
    { num: 3, name: 'Harvest', icon: Leaf },
    { num: 4, name: 'Reflect', icon: Brain }
  ];

  return (
    <div className="relative min-h-screen pb-24 font-outfit" style={{backgroundColor: '#1A2F23'}}>
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
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">The Savings Jar</span>
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
            prediction={prediction}
            setPrediction={setPrediction}
            onNext={() => setPhase(1)}
          />
        )}
        {phase === 1 && (
          <Phase1Setup
            onNext={() => setPhase(2)}
          />
        )}
        {phase === 2 && (
          <Phase2GameLoop
            gameState={gameState}
            setGameState={setGameState}
            onGameOver={(success) => setPhase(3)}
          />
        )}
        {phase === 3 && (
          <Phase3Harvest
            gameState={gameState}
            onNext={() => setPhase(4)}
          />
        )}
        {phase === 4 && (
          <Phase4Reflection
            reflection={finalReflection}
            setReflection={setFinalReflection}
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

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-soft { animation: pulse-soft 2s infinite ease-in-out; }

        @keyframes wither {
          0% { transform: scale(1); filter: grayscale(0); }
          50% { transform: scale(0.9); filter: grayscale(0.5); }
          100% { transform: scale(0.95); filter: grayscale(0.2); }
        }
        .animate-wither { animation: wither 0.5s ease-out forwards; }

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
// PHASE 0: THE ANCHOR (Prediction)
// ═══════════════════════════════════════════════════════════════

function Phase0Anchor({ prediction, setPrediction, onNext }) {
  const [revealed, setRevealed] = useState(false);
  const SAVING_AMOUNT = 5;
  const WEEKS = 52;
  const TOTAL = SAVING_AMOUNT * WEEKS;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
            <PiggyBank size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-800">Small Change</h2>
            <p className="text-sm text-stone-500">Forecasting the Future</p>
          </div>
        </div>

        <p className="text-stone-700 text-lg mb-6 leading-relaxed">
          Saving feels slow. It's hard to see the forest when you're planting seeds.
          <br/><br/>
          <strong>If you saved just $5 every week, how much would you have in a year?</strong>
        </p>

        {!revealed ? (
          <div className="flex flex-col items-center gap-4 mb-4">
            <span className="text-5xl font-bold text-emerald-600">${prediction}</span>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={prediction}
              onChange={(e) => setPrediction(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between w-full text-xs text-stone-400">
              <span>$50</span>
              <span>$500</span>
            </div>

            <button
              onClick={() => setRevealed(true)}
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
                  <p className="text-2xl font-bold text-stone-600">${prediction}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">The Reality</p>
                  <p className="text-2xl font-bold text-emerald-600">${TOTAL}</p>
                </div>
              </div>
              <p className="text-sm text-stone-500 italic">
                "$5 is barely a snack, but over time it adds up to a new pair of sneakers."
              </p>
            </div>
            <button
              onClick={onNext}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Plant your Tree <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="skill-check-box animate-fade-in">
        <p>
          <span className="text-lg mr-2">📈</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Forecasting</strong> — visualizing the long-term result of small actions.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: THE SETUP
// ═══════════════════════════════════════════════════════════════

function Phase1Setup({ onNext }) {
  return (
    <div className="space-y-6 animate-fade-in flex flex-col items-center justify-center h-full pt-10">
      <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700 shadow-xl">
        <TreeDeciduous size={64} />
      </div>

      <h2 className="text-2xl font-bold text-[#F5F1E6] text-center">Meet your Savings Tree</h2>

      <div className="soft-card p-6 w-full text-center space-y-4">
        <p className="text-stone-600">
          This tree needs money to grow.
          <br/>
          <strong>If you spend your money on other things, the tree starves.</strong>
        </p>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-left space-y-2 text-sm text-stone-600">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>Survive for <strong>60 seconds</strong>.</span>
          </div>
          <div className="flex items-center gap-3">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>Income arrives every <strong>2 seconds</strong>.</span>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Spending makes the tree <strong>shrink</strong>.</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Start Growing <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE GAME LOOP (Loss Aversion Mechanic)
// ═══════════════════════════════════════════════════════════════

function Phase2GameLoop({ gameState, setGameState, onGameOver }) {
  const [activeEffect, setActiveEffect] = useState(null); // 'heal' | 'damage'
  const [lastItem, setLastItem] = useState(null);
  const [gameOverReason, setGameOverReason] = useState(null);
  const timerRef = useRef(null);

  const SHOP_ITEMS = [
    { name: 'Treat', icon: <Coffee size={20} />, cost: 10 },
    { name: 'Game', icon: <Gamepad2 size={20} />, cost: 10 },
    { name: 'Fashion', icon: <ShoppingBag size={20} />, cost: 10 },
    { name: 'Food', icon: <Utensils size={20} />, cost: 10 },
    { name: 'Music', icon: <Music size={20} />, cost: 10 },
  ];

  // Game Loop
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        // Stop logic if game is over (prevents negative values before unmount)
        if (prev.treeHealth <= 0 || prev.timeLeft <= 0) return prev;

        const newTime = prev.timeLeft - 1;

        // Income Logic: Every 2 seconds
        const isIncomeTick = newTime % 2 === 0;
        const newCash = isIncomeTick ? prev.cash + 10 : prev.cash;

        // Passive Starvation Logic (decay)
        const newHealth = Math.max(0, prev.treeHealth - 1);

        return {
          ...prev,
          timeLeft: newTime,
          cash: newCash,
          treeHealth: newHealth
        };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Check for Game Over / Win Conditions
  useEffect(() => {
    if (gameState.treeHealth <= 0) {
      clearInterval(timerRef.current);
      setGameOverReason('died');
    } else if (gameState.timeLeft <= 0) {
      clearInterval(timerRef.current);
      onGameOver(true);
    }
  }, [gameState.treeHealth, gameState.timeLeft, onGameOver]);

  const handleSave = () => {
    if (gameState.cash < 10) return;

    setActiveEffect('heal');
    setTimeout(() => setActiveEffect(null), 500);

    setGameState(prev => ({
      ...prev,
      cash: prev.cash - 10,
      treeHealth: Math.min(100, prev.treeHealth + 15),
      treeScale: Math.min(2.5, prev.treeScale + 0.1),
      totalSaved: prev.totalSaved + 10
    }));
  };

  const handleSpend = () => {
    if (gameState.cash < 10) return;

    const item = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
    setLastItem(item);
    setActiveEffect('damage');
    setTimeout(() => setActiveEffect(null), 500);

    setGameState(prev => ({
      ...prev,
      cash: prev.cash - 10,
      inventory: [...prev.inventory, item],
      treeHealth: Math.max(0, prev.treeHealth - 20), // Significant penalty
      treeScale: Math.max(0.3, prev.treeScale - 0.3), // Visible shrinking
      totalSpent: prev.totalSpent + 10
    }));
  };

  const handleRetry = () => {
    setGameState({
      treeHealth: 50,
      treeScale: 1.0,
      cash: 0,
      inventory: [],
      timeLeft: 60,
      totalSaved: 0,
      totalSpent: 0
    });
    setGameOverReason(null);

    // Restart interval manually for retry
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
       setGameState(prev => {
         if (prev.treeHealth <= 0 || prev.timeLeft <= 0) return prev;
         const newTime = prev.timeLeft - 1;
         const isIncomeTick = newTime % 2 === 0;
         const newCash = isIncomeTick ? prev.cash + 10 : prev.cash;
         const newHealth = Math.max(0, prev.treeHealth - 1);
         return { ...prev, timeLeft: newTime, cash: newCash, treeHealth: newHealth };
       });
    }, 1000);
  };

  if (gameOverReason === 'died') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center">
          <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4 text-rose-500">
            <XCircle size={48} />
          </div>
          <h3 className="text-2xl font-bold text-stone-800 mb-2">The Tree Died</h3>
          <p className="text-stone-600 mb-6">
            You spent too much on other things and the tree starved.
          </p>
          <button
            onClick={handleRetry}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Visual calculations
  const healthColor = gameState.treeHealth > 50 ? 'bg-emerald-500' : gameState.treeHealth > 20 ? 'bg-amber-400' : 'bg-rose-500';
  const treeColor = gameState.treeHealth > 40 ? 'text-emerald-600' : 'text-stone-400';
  const treeIcon = gameState.treeScale > 1.5 ? <TreeDeciduous size={120} /> : <Sprout size={120} />;

  return (
    <div className="h-[80vh] flex flex-col justify-between">
      {/* HUD */}
      <div className="bg-stone-800 text-white p-4 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-emerald-400"/>
            <span className="font-mono text-xl font-bold">{gameState.timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-emerald-400"/>
            <span className="font-mono text-xl font-bold">${gameState.cash}</span>
          </div>
        </div>
        {/* Health Bar */}
        <div className="w-full bg-stone-700 h-3 rounded-full overflow-hidden relative">
          <div
            className={`h-full transition-all duration-300 ${healthColor}`}
            style={{width: `${gameState.treeHealth}%`}}
          />
        </div>
        <p className="text-[10px] text-center mt-1 text-stone-400 uppercase tracking-widest">Tree Health</p>
      </div>

      {/* Main Visual Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div
          className={`transition-all duration-500 ${treeColor} ${activeEffect === 'damage' ? 'animate-shake' : ''}`}
          style={{
            transform: `scale(${gameState.treeScale})`,
            filter: activeEffect === 'damage' ? 'grayscale(0.8)' : 'none'
          }}
        >
          {treeIcon}
        </div>

        {/* Effect Floaters */}
        {activeEffect === 'heal' && (
          <div className="absolute top-1/3 animate-slide-up text-emerald-500 font-bold text-xl">+ Health</div>
        )}
        {activeEffect === 'damage' && (
          <div className="absolute top-1/3 animate-slide-up text-rose-500 font-bold text-xl">- Wither</div>
        )}

        {/* Inventory Display (Visual Clutter) */}
        {gameState.inventory.length > 0 && (
          <div className="absolute bottom-0 w-full flex justify-center gap-1 flex-wrap px-4">
            {gameState.inventory.slice(-5).map((item, i) => (
              <div key={i} className="bg-white/10 p-2 rounded-full text-[#F5F1E6] animate-fade-in shadow-sm" title={item.name}>
                {item.icon}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 pb-6">
        <button
          onClick={handleSave}
          disabled={gameState.cash < 10}
          className={`py-6 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
            gameState.cash >= 10
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 active:scale-95'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <Leaf size={32} />
          <span className="font-bold">FEED TREE</span>
          <span className="text-xs opacity-80">-$10 Cash</span>
        </button>

        <button
          onClick={handleSpend}
          disabled={gameState.cash < 10}
          className={`py-6 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
            gameState.cash >= 10
              ? 'bg-rose-100 text-rose-600 border-2 border-rose-200 hover:bg-rose-200 active:scale-95'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <ShoppingBag size={32} />
          <span className="font-bold">BUY STUFF</span>
          <span className="text-xs opacity-80">-$10 Cash</span>
        </button>
      </div>

      {/* Income Indicator */}
      {gameState.cash < 10 && gameState.timeLeft > 0 && (
        <div className="absolute bottom-32 left-0 right-0 text-center">
          <span className="bg-stone-800/80 text-white text-xs px-3 py-1 rounded-full animate-pulse">
            Waiting for income...
          </span>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE HARVEST (Success)
// ═══════════════════════════════════════════════════════════════

function Phase3Harvest({ gameState, onNext }) {
  return (
    <div className="space-y-6 animate-fade-in pt-6">
      <div className="text-center">
        {/* Removed shadow-emerald-200 for a matte finish */}
        <div className="inline-block p-8 bg-emerald-100 rounded-full mb-6 shadow-xl">
          <TreeDeciduous size={80} className="text-emerald-700" />
        </div>
        <h2 className="text-3xl font-bold text-[#F5F1E6] mb-2">Time's Up!</h2>
        <p className="text-[#F5F1E6]/70">The 60 seconds is over. Let's look at your harvest.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="soft-card p-4 text-center border-b-4 border-emerald-500">
          <p className="text-xs font-bold text-stone-400 uppercase">You Saved</p>
          <p className="text-3xl font-bold text-emerald-600">${gameState.totalSaved}</p>
        </div>
        <div className="soft-card p-4 text-center border-b-4 border-rose-400">
          <p className="text-xs font-bold text-stone-400 uppercase">You Spent</p>
          <p className="text-3xl font-bold text-rose-500">${gameState.totalSpent}</p>
        </div>
      </div>

      <div className="forest-card p-6">
        <h3 className="font-semibold text-white mb-2 text-lg">Your Inventory</h3>
        {gameState.inventory.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {gameState.inventory.map((item, i) => (
              <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm text-white flex items-center gap-1">
                {item.icon} <span className="text-xs">{item.name}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-white/60 italic mb-4">Empty! You focused purely on growth.</p>
        )}

        <div className="bg-black/20 p-4 rounded-xl text-sm text-white/90">
          <p>
            In the game, spending money hurt the tree immediately.
            In real life, the damage is invisible — you just end up with "less tree" (savings) later on.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Reflect <Brain size={20} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 4: REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase4Reflection({ reflection, setReflection, onComplete }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-5">
        <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-600" />
          The Pain of Paying
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          This is called <strong>Loss Aversion</strong>. We naturally hate losing things (like the tree's health) more than we like gaining things (like bubble tea).
          <br/><br/>
          Smart savers use this trick: treat spending money as "losing" your future freedom.
        </p>
      </div>

      <div className="soft-card p-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Why did it feel bad to spend money when the tree started shrinking?
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I realized that..."
          className="w-full p-3 border-2 border-stone-200 rounded-xl text-stone-700 resize-none focus:border-emerald-500 focus:outline-none focus:ring-0 transition-colors"
          rows={3}
        />
      </div>

      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">🎯</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Forecasting</strong> — predicting consequences before they happen.
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
          You've earned points in Forecasting and Estimating.
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
