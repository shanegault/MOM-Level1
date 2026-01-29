import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, ChevronLeft,
  Check, Wallet, Clock, AlertTriangle,
  Brain, FileText, HelpCircle, Info,
  Search, BarChart3, LineChart, MessageCircle, HelpCircle as Help2,
  DollarSign, ShoppingBag, Calculator, Brain as Brain2, FileText as File2,
  AlertCircle, Timer, XCircle, CheckCircle2, ShoppingCart,
  Utensils, Sprout, TreeDeciduous, Coins, Gift, Coffee,
  Gamepad2, Music, Zap, PiggyBank, Smartphone, Clapperboard,
  Wifi, CreditCard, Receipt, ShieldAlert, ShieldCheck, Banknote,
  Hourglass
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// DEBIT CARD DRILL MODULE (Standalone Child Component)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// SKILLS ENGINE
// ═══════════════════════════════════════════════════════════════

const SKILLS = {
  tracking: {
    id: 'tracking',
    name: 'Tracking',
    icon: '👀',
    description: 'Knowing exactly where your money is going'
  },
  managing: {
    id: 'managing',
    name: 'Managing',
    icon: '🕹️',
    description: 'Taking action to keep things under control'
  },
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
  tracking: 3,
  managing: 2
};

// ═══════════════════════════════════════════════════════════════
// DEBIT DRILL MODULE (Default Export)
// ═══════════════════════════════════════════════════════════════

export default function DebitDrillModule({ onBack, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');
  const [prediction, setPrediction] = useState(25);
  const [finalReflection, setFinalReflection] = useState('');
  const [resultState, setResultState] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Guess', icon: HelpCircle },
    { num: 1, name: 'Rules', icon: Info },
    { num: 2, name: 'Drill', icon: CreditCard },
    { num: 3, name: 'Result', icon: FileText },
    { num: 4, name: 'Reflect', icon: Brain }
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
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Debit Drill</span>
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
            onNext={() => {
              setResultState(null);
              setPhase(2);
            }}
          />
        )}
        {phase === 2 && (
          <Phase2GameLoop
            onGameOver={(finalState) => {
              setResultState(finalState);
              setPhase(3);
            }}
          />
        )}
        {phase === 3 && (
          <Phase3Harvest
            gameState={resultState}
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
          --emerald-600: #059669;
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

        @keyframes slam {
          0% { transform: scale(2); opacity: 0; }
          50% { transform: scale(0.9); opacity: 1; }
          75% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-slam { animation: slam 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        @keyframes flash-red {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(244, 63, 94, 0.3); }
        }
        .animate-flash-red { animation: flash-red 0.5s ease-in-out; }

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
  const TREAT_PRICE = 5;
  const OVERDRAFT_FEE = 30;
  const TOTAL = TREAT_PRICE + OVERDRAFT_FEE;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
            <Coffee size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-800">The Magic Card</h2>
            <p className="text-sm text-stone-500">Estimating Costs</p>
          </div>
        </div>

        <p className="text-stone-700 text-lg mb-6 leading-relaxed">
          Debit cards feel like magic. You tap, and you get your treat.
          <br/><br/>
          <strong>If you buy a $5 hot chocolate but your account is empty, how much does it actually cost?</strong>
        </p>

        {!revealed ? (
          <div className="flex flex-col items-center gap-4 mb-4">
            <span className="text-5xl font-bold text-emerald-600">${prediction}</span>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={prediction}
              onChange={(e) => setPrediction(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between w-full text-xs text-stone-400">
              <span>$5</span>
              <span>$50</span>
            </div>

            <button
              onClick={() => setRevealed(true)}
              className="w-full mt-4 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
            >
              Reveal Truth
            </button>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="text-center mb-6 p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="flex justify-between items-center mb-4 border-b border-stone-200 pb-4">
                <div className="text-left">
                  <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">Hot Choc</p>
                  <p className="text-2xl font-bold text-stone-600">$5</p>
                </div>
                <div className="text-center px-4">
                  <span className="text-rose-400 text-xl font-bold">+</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-rose-500 font-medium uppercase tracking-wide">Overdraft Fee</p>
                  <p className="text-2xl font-bold text-rose-500">$30</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                 <p className="text-sm font-semibold text-stone-600 uppercase">Total Cost</p>
                 <p className="text-4xl font-bold text-stone-800">${TOTAL}</p>
              </div>
              <p className="text-sm text-stone-500 italic mt-3">
                "The bank doesn't stop you. They charge you."
              </p>
            </div>
            <button
              onClick={onNext}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Start Drill <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="skill-check-box animate-fade-in">
        <p>
          <span className="text-lg mr-2">🎯</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Estimating</strong> — hidden costs can turn a small treat into a big problem.
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
    <div className="space-y-6 animate-fade-in flex flex-col items-center justify-center h-full pt-6">
      <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-700 shadow-xl">
        <CreditCard size={48} />
      </div>

      <h2 className="text-2xl font-bold text-[#F5F1E6] text-center">The Drill</h2>

      <div className="soft-card p-6 w-full text-center space-y-4">
        <p className="text-stone-600">
          This is your bank balance. It starts at <strong>$50</strong>.
          <br/>
          Automatic payments (Bills) will try to eat it.
        </p>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-left space-y-3 text-sm text-stone-600">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span>Survive for <strong>60 seconds</strong>.</span>
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <span>Tap <strong>Get Paid</strong> to earn wages (+$15).</span>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <span>If balance hits <strong>$0</strong>, you get hit with a <strong>$10 Fee</strong> instantly.</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        I'm Ready <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE GAME LOOP
// ═══════════════════════════════════════════════════════════════

function Phase2GameLoop({ onGameOver }) {
  // Local State for high-performance loop
  const [gameState, setGameState] = useState({
    balance: 50,
    feesIncurred: 0,
    totalIncome: 0,
    timeLeft: 60,
    bills: [],
    history: []
  });

  const [activeEffect, setActiveEffect] = useState(null); // 'deposit' | 'bill' | 'fee'
  const [isDepositing, setIsDepositing] = useState(false); // Cooldown state
  const [flashRed, setFlashRed] = useState(false);
  const containerRef = useRef(null);
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const nextBillTimeRef = useRef(2000);

  // Reset/Init Game
  useEffect(() => {
    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Monitor for Game Over
  useEffect(() => {
    if (gameState.timeLeft <= 0) {
      cancelAnimationFrame(requestRef.current);
      onGameOver(gameState);
    }
  }, [gameState.timeLeft, onGameOver, gameState]);

  const spawnBill = () => {
    const types = [
      { id: 'phone', icon: Smartphone, amount: 15, color: 'text-blue-500', bg: 'bg-blue-100' },
      { id: 'sub', icon: Clapperboard, amount: 12, color: 'text-purple-500', bg: 'bg-purple-100' },
      { id: 'power', icon: Zap, amount: 25, color: 'text-amber-500', bg: 'bg-amber-100' },
      { id: 'wifi', icon: Wifi, amount: 20, color: 'text-cyan-500', bg: 'bg-cyan-100' },
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    // Random position between 10% and 80% width
    const xPos = 10 + Math.random() * 70;

    return {
      uid: Date.now() + Math.random(),
      ...type,
      x: xPos,
      y: -10, // Start slightly above
      speed: 0.2 + Math.random() * 0.1 // Random speed
    };
  };

  const gameLoop = (time) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setGameState(prev => {
      // Guard against updating if time is already up
      if (prev.timeLeft <= 0) {
        return prev;
      }

      // Timer Logic: Dec 1 sec roughly every 1000ms
      const newTimeLeft = Math.max(0, prev.timeLeft - (deltaTime / 1000));

      // Bill Spawning
      nextBillTimeRef.current -= deltaTime;
      let newBills = [...prev.bills];

      if (nextBillTimeRef.current <= 0) {
        newBills.push(spawnBill());
        // Randomize next spawn: 1.5s to 4s
        nextBillTimeRef.current = 1500 + Math.random() * 2500;
      }

      // Bill Movement
      let balanceChange = 0;
      let feeHit = false;
      let hitBills = [];

      newBills = newBills.map(b => ({
        ...b,
        y: b.y + (b.speed * (deltaTime / 16)) // normalize to 60fps
      })).filter(b => {
        // If bill hits bottom (approx 85% of container height where wallet is)
        if (b.y > 80) {
          balanceChange -= b.amount;
          hitBills.push(b);
          return false; // Remove from array
        }
        return true;
      });

      let currentBalance = prev.balance + balanceChange;
      let newFees = prev.feesIncurred;
      let newHistory = prev.history;

      // Overdraft Logic
      if (balanceChange < 0) {
        // We took a hit
        if (currentBalance < 0) {
          // Trigger Fee
          currentBalance -= 10;
          newFees += 10;
          feeHit = true;

          newHistory = [...newHistory, ...hitBills.map(b => ({...b, type: 'bill'})), { uid: Date.now(), id: 'fee', amount: 10, type: 'fee' }];
        } else {
           newHistory = [...newHistory, ...hitBills.map(b => ({...b, type: 'bill'}))];
        }
      }

      // Capping max balance if needed (Optional, prompt says max $100)
      if (currentBalance > 100) currentBalance = 100;

      if (feeHit) {
        setFlashRed(true);
        setTimeout(() => setFlashRed(false), 500);
      }

      if (hitBills.length > 0) {
        setActiveEffect(feeHit ? 'fee' : 'bill');
        setTimeout(() => setActiveEffect(null), 300);
      }

      return {
        ...prev,
        timeLeft: newTimeLeft,
        balance: currentBalance,
        bills: newBills,
        feesIncurred: newFees,
        history: newHistory
      };
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const handleDeposit = () => {
    if (isDepositing) return; // Prevent spam

    setIsDepositing(true);

    // Simulate delay
    setTimeout(() => {
      setActiveEffect('deposit');
      setTimeout(() => setActiveEffect(null), 200);

      setGameState(prev => {
        const newBal = Math.min(100, prev.balance + 15); // Reverted to +15
        return {
          ...prev,
          balance: newBal,
          totalIncome: prev.totalIncome + 15
        };
      });

      setIsDepositing(false);
    }, 1500); // 1.5s delay
  };

  // Balance Bar Height Calculation
  // range -50 to 100.
  // Visual height: 0% at -50, 100% at 100.
  // 0 point is at 33% height.
  const balancePercent = Math.min(100, Math.max(0, ((gameState.balance + 50) / 150) * 100));
  const isNegative = gameState.balance < 0;

  return (
    <div className={`h-[80vh] flex flex-col justify-between relative overflow-hidden transition-colors duration-200 ${flashRed ? 'bg-rose-900/30' : ''}`} ref={containerRef}>

      {/* HUD - Time */}
      <div className="absolute top-0 right-0 p-4 z-20">
         <div className="bg-stone-800/90 text-white px-4 py-2 rounded-full font-mono text-xl font-bold flex items-center gap-2 shadow-lg">
           <Clock size={18} className="text-emerald-400" />
           {Math.ceil(gameState.timeLeft)}s
         </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 relative mx-4 mt-16 mb-4 bg-stone-900/40 rounded-3xl border-2 border-stone-700/50 backdrop-blur-sm overflow-hidden">

        {/* Zero Line Marker */}
        <div className="absolute bottom-[33%] w-full h-0.5 bg-stone-500 border-t border-dashed border-stone-400 z-0 flex items-center">
           <span className="text-[10px] text-stone-400 ml-2 bg-stone-800 px-1 rounded">$0.00</span>
        </div>

        {/* The Balance Fluid */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out z-10 opacity-80 ${isNegative ? 'bg-rose-500' : 'bg-emerald-500'}`}
          style={{ height: `${balancePercent}%` }}
        >
          {/* Surface Ripples */}
          <div className="absolute top-0 w-full h-2 bg-white/20"></div>
        </div>

        {/* Falling Bills */}
        {gameState.bills.map(bill => {
          const BillIcon = bill.icon;
          return (
            <div
              key={bill.uid}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 transition-transform ${bill.bg} ${bill.color}`}
              style={{
                left: `${bill.x}%`,
                top: `${bill.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <BillIcon size={24} />
              <span className="absolute -bottom-6 bg-stone-800 text-white text-xs px-1.5 py-0.5 rounded font-bold">-${bill.amount}</span>
            </div>
          );
        })}

        {/* Fee Stamp Animation */}
        {activeEffect === 'fee' && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none animate-slam">
            <div className="border-4 border-rose-500 text-rose-500 px-6 py-2 rounded-xl text-4xl font-black uppercase -rotate-12 bg-white/90">
              OVERDRAFT!
            </div>
          </div>
        )}

        {/* Current Balance Display (Floating) */}
        <div className="absolute top-4 left-4 z-30">
          <div className={`text-4xl font-bold transition-colors duration-200 ${isNegative ? 'text-rose-400' : 'text-white'}`}>
            ${gameState.balance}
          </div>
          <div className="text-stone-400 text-xs uppercase tracking-widest font-semibold">Available Funds</div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 pb-6 z-30">
        <button
          onPointerDown={handleDeposit}
          disabled={isDepositing}
          className={`w-full py-6 rounded-2xl text-white shadow-lg transition-all relative overflow-hidden flex flex-col items-center justify-center gap-1 group ${
            isDepositing
              ? 'bg-stone-500 cursor-wait'
              : 'bg-emerald-600 active:bg-emerald-500 shadow-emerald-500/30 active:scale-95'
          }`}
        >
          {/* Progress Bar Background */}
          {isDepositing && (
             <div
               className="absolute top-0 left-0 bottom-0 bg-emerald-700/50 z-0 transition-all duration-[1500ms] ease-linear"
               style={{ width: '100%', animation: 'fillProgress 1.5s linear forwards' }}
             />
          )}
          <style>{`
            @keyframes fillProgress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>

          <div className="relative z-10 flex items-center gap-2">
             {isDepositing ? <Hourglass className="animate-spin-slow" /> : <Banknote className="group-active:animate-bounce" />}
             <span className="text-2xl font-bold tracking-wide">
               {isDepositing ? "EARNING..." : "GET PAID"}
             </span>
          </div>
          <span className={`relative z-10 text-sm font-medium ${isDepositing ? 'text-stone-200' : 'text-emerald-200'}`}>
            {isDepositing ? "Wait for wages..." : "+$15.00 Income"}
          </span>
        </button>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE HARVEST (Success)
// ═══════════════════════════════════════════════════════════════

function Phase3Harvest({ gameState, onNext }) {
  // Guard clause if gameState is not yet populated
  if (!gameState) return null;

  const perfectRun = gameState.feesIncurred === 0;

  return (
    <div className="space-y-6 animate-fade-in pt-6">
      <div className="text-center">
        <div className={`inline-block p-8 rounded-full mb-6 shadow-xl ${perfectRun ? 'bg-amber-100' : 'bg-stone-200'}`}>
          {perfectRun ? (
            <ShieldCheck size={80} className="text-amber-500" />
          ) : (
            <ShieldAlert size={80} className="text-stone-500" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-[#F5F1E6] mb-2">
          {perfectRun ? "Clean Sheet!" : "The Fee Trap"}
        </h2>
        <p className="text-[#F5F1E6]/70">
          {perfectRun
            ? "You balanced the flow perfectly. No fees paid."
            : "You survived, but the bank took a cut."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="soft-card p-4 text-center border-b-4 border-emerald-500">
          <p className="text-xs font-bold text-stone-400 uppercase">Total Income</p>
          <p className="text-3xl font-bold text-emerald-600">+${gameState.totalIncome}</p>
        </div>
        <div className="soft-card p-4 text-center border-b-4 border-rose-400">
          <p className="text-xs font-bold text-stone-400 uppercase">Fees Paid</p>
          <p className={`text-3xl font-bold ${gameState.feesIncurred > 0 ? 'text-rose-500' : 'text-stone-300'}`}>
            -${gameState.feesIncurred}
          </p>
        </div>
      </div>

      <div className="forest-card p-6">
        <h3 className="font-semibold text-white mb-2 text-lg">Statement Summary</h3>
        {gameState.history.filter(h => h.type === 'fee').length > 0 ? (
          <div className="space-y-2 mb-4">
             {gameState.history.filter(h => h.type === 'fee').slice(0, 3).map((fee, i) => (
               <div key={i} className="flex justify-between items-center bg-rose-500/20 p-2 rounded text-rose-100 text-sm">
                 <span>Overdraft Penalty</span>
                 <span className="font-mono">-$10.00</span>
               </div>
             ))}
             {gameState.history.filter(h => h.type === 'fee').length > 3 && (
               <div className="text-center text-xs text-white/50 italic">...and more</div>
             )}
          </div>
        ) : (
          <div className="bg-white/10 p-4 rounded-xl text-center mb-4">
            <span className="text-amber-300 font-bold">NO FEES INCURRED</span>
          </div>
        )}

        <div className="bg-black/20 p-4 rounded-xl text-sm text-white/90">
          <p>
            This is why "free" bank accounts can be expensive. If you slip up just once, the fees can cost more than the things you bought.
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
          The Poverty Premium
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          Banks charge the highest fees to people with the lowest balances.
          <br/><br/>
          It's a trap: You run out of money, so they charge you money, so you have even less money.
        </p>
      </div>

      <div className="soft-card p-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Why is it sometimes "expensive to be poor"?
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
          <span className="text-lg mr-2">👀</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Tracking</strong> — watching your cash flow to avoid penalties.
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
          You've earned points in Tracking and Managing.
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
