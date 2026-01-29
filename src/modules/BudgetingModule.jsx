import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, ChevronLeft, Target, Briefcase, Brain, PieChart,
  Calculator, Check, Info, Home, ShoppingBag, CreditCard, Scissors,
  BarChart3, AlertTriangle, Users, Key
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - Budgeting Basics (The Golden Rule)
// "Quiet Interface" Design System | Capital Efficiency & ROI
// STRICTLY MODELED ON VEGGIE GARDEN ARCHITECTURE
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// MODULE SKILL WEIGHTING
// ═══════════════════════════════════════════════════════════════

const moduleSkillWeights = {
  estimating: 3,    // Guesses on Needs vs Wants split
  calculating: 4,   // Balancing the budget, deficit math
  comparing: 3,     // Trade-offs between living situations
  forecasting: 2,   // Long term impact of 20% savings
  reflecting: 1     // Final thoughts
};

const SKILLS = {
  estimating: {
    id: 'estimating',
    name: 'Estimating',
    icon: '🎯',
    description: {
      '1-4': 'Guessing the right amounts',
      '5-8': 'Estimating costs before spending',
      '9-10': 'Forming educated estimates on ratios',
      '11-13': 'Developing informed hypotheses on allocation'
    }
  },
  calculating: {
    id: 'calculating',
    name: 'Calculating',
    icon: '🧮',
    description: {
      '1-4': 'Adding up costs',
      '5-8': 'Checking if you have enough money',
      '9-10': 'Balancing income against expenses',
      '11-13': 'Complex deficit and surplus modelling'
    }
  },
  comparing: {
    id: 'comparing',
    name: 'Comparing',
    icon: '⚖️',
    description: {
      '1-4': 'Choosing this or that',
      '5-8': 'Weighing up wants vs needs',
      '9-10': 'Analysing trade-offs in spending',
      '11-13': 'Evaluating opportunity costs of consumption'
    }
  },
  forecasting: {
    id: 'forecasting',
    name: 'Forecasting',
    icon: '📈',
    description: {
      '1-4': 'Saving for later',
      '5-8': 'Planning for future fun',
      '9-10': 'Projecting savings growth over time',
      '11-13': 'Modelling long-term compound interest'
    }
  },
  reflecting: {
    id: 'reflecting',
    name: 'Reflecting',
    icon: '🪞',
    description: {
      '1-4': 'Thinking about choices',
      '5-8': 'Understanding where money went',
      '9-10': 'Evaluating budget effectiveness',
      '11-13': 'Critically analysing financial behaviour'
    }
  }
};

const BUDGET_MODULE_SKILLS = ['estimating', 'calculating', 'comparing', 'forecasting', 'reflecting'];

// ═══════════════════════════════════════════════════════════════
// DATA MODELS - ADULT SIMULATION MODE
// ═══════════════════════════════════════════════════════════════

// Fixed Income for the Simulation (Entry level full time)
const SIMULATION_INCOME = 850;

const LIVING_SITUATIONS = [
  { id: 'flatmates', name: 'Flatting (4 people)', cost: 210, icon: Users, desc: 'Cheaper rent, less privacy.' },
  { id: 'studio', name: 'Studio Apartment', cost: 380, icon: Key, desc: 'Total privacy, very expensive.' },
  { id: 'home', name: 'Boarding at Home', cost: 100, icon: Home, desc: 'Cheapest, but... parents.' }
];

const BASE_NEEDS = [
  // Rent is dynamic based on selection
  { id: 'groceries', name: 'Supermarket', cost: 120, icon: '🛒' },
  { id: 'transport', name: 'Bus/Train', cost: 45, icon: '🚌' },
  { id: 'utilities', name: 'Power & Net', cost: 35, icon: '⚡' },
  { id: 'phone', name: 'Phone Plan', cost: 25, icon: '📱' }
];

const WANTS_ITEMS = [
  { id: 'takeout', name: 'Uber Eats', cost: 40, icon: '🍔' },
  { id: 'social', name: 'Weekend Fun', cost: 60, icon: '🎉' },
  { id: 'clothes', name: 'New Clothes', cost: 50, icon: '👕' },
  { id: 'streaming', name: 'Netflix/Spotify', cost: 25, icon: '🎬' },
  { id: 'gym', name: 'Gym Member', cost: 25, icon: '💪' },
  { id: 'coffee', name: 'Daily Coffee', cost: 30, icon: '☕' },
  { id: 'gaming', name: 'Gaming', cost: 20, icon: '🎮' }
];

// ═══════════════════════════════════════════════════════════════
// BUDGETING MODULE (STANDALONE CHILD COMPONENT)
// ═══════════════════════════════════════════════════════════════

export default function BudgetingModule({ onBack, onComplete }) {
  // Internal State
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');
  const [income, setIncome] = useState(SIMULATION_INCOME);
  const [anchorGuess, setAnchorGuess] = useState(null); // The user's guess for Wants %

  // Phase 2 State (The Sort) - Start Equidistant (33/33/34)
  const [allocations, setAllocations] = useState({ needs: 33, wants: 33, savings: 34 });

  // Phase 3 State (The Wizard)
  const [livingSituation, setLivingSituation] = useState(LIVING_SITUATIONS[0]);
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [selectedWants, setSelectedWants] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Anchor', icon: Target },
    { num: 1, name: 'Income', icon: Briefcase },
    { num: 2, name: 'Sort', icon: PieChart },
    { num: 3, name: 'Build', icon: Calculator },
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
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Budgeting</span>
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
                    {phase > p.num ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <p.icon className="w-4 h-4" />
                    )}
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
            userLevel={userLevel}
            anchorGuess={anchorGuess}
            setAnchorGuess={setAnchorGuess}
            onNext={() => setPhase(1)}
          />
        )}
        {phase === 1 && (
          <Phase1Income
            userLevel={userLevel}
            income={income}
            setIncome={setIncome}
            onNext={() => setPhase(2)}
            onBack={() => setPhase(0)}
          />
        )}
        {phase === 2 && (
          <Phase2TheSort
            userLevel={userLevel}
            income={income}
            allocations={allocations}
            setAllocations={setAllocations}
            onNext={() => setPhase(3)}
            onBack={() => setPhase(1)}
          />
        )}
        {phase === 3 && (
          <Phase3Wizard
            userLevel={userLevel}
            income={income}
            livingSituation={livingSituation}
            setLivingSituation={setLivingSituation}
            selectedNeeds={selectedNeeds}
            setSelectedNeeds={setSelectedNeeds}
            selectedWants={selectedWants}
            setSelectedWants={setSelectedWants}
            onNext={() => setPhase(4)}
            onBack={() => setPhase(2)}
          />
        )}
        {phase === 4 && (
          <Phase4Reflection
            userLevel={userLevel}
            anchorGuess={anchorGuess}
            income={income}
            livingSituation={livingSituation}
            selectedNeeds={selectedNeeds}
            selectedWants={selectedWants}
            onComplete={onComplete}
          />
        )}
      </main>

      {/* STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-outfit { font-family: 'Outfit', system-ui, sans-serif; }

        :root {
          --midnight-moss: #1A2F23;
          --moss-light: #243D2E;
          --moss-mid: #2E4A38;
          --forest-card-from: #2D4A3E;
          --forest-card-to: #3A5D4D;
          --living-coral: #FF6F61;
          --coral-muted: #E6635A;
          --matcha-green: #B7D9B1;
          --glacial-blue: #A0D2EB;
          --sun-yellow: #F2E8CF;
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
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

        .soft-card {
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-radius: 24px;
        }

        .forest-card {
          background: linear-gradient(145deg, #2D4A3E, #3A5D4D);
          box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          border-radius: 24px;
        }

        .skill-check-box {
          background: linear-gradient(145deg, #2D4A3E, #3A5D4D);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .skill-check-box p { color: #F5F1E6; font-size: 14px; margin: 0; }
        .skill-check-box strong { color: #B7D9B1; }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 12px;
          border-radius: 6px;
          background: #e7e5e4;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          border: 4px solid #059669;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.1s ease;
        }
        input[type="range"]::-webkit-slider-thumb:active { transform: scale(1.1); }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 0: ANCHOR
// ═══════════════════════════════════════════════════════════════

function Phase0Anchor({ userLevel, anchorGuess, setAnchorGuess, onNext }) {
  const [showSkills, setShowSkills] = useState(false);
  const [localGuess, setLocalGuess] = useState(30);

  return (
    <div className="space-y-6 animate-fade-in">
      {!showSkills ? (
        // STEP 1: INTRO CARD
        <div className="soft-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-sm text-amber-700">
              📝
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-800">Budgeting Basics</h2>
              <p className="text-sm text-stone-500">The Golden Rule</p>
            </div>
          </div>
          <p className="text-stone-600 mb-6">
            There is a "Golden Rule" for spending money. Let's see if you can guess what it is.
          </p>
          <button
            onClick={() => setShowSkills(true)}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            See what you'll learn
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : !anchorGuess ? (
        <>
          {/* STEP 2: SKILLS DISPLAY */}
          <div className="soft-card p-6">
            <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Skills you'll practice
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {BUDGET_MODULE_SKILLS.map((skillId) => {
                const skill = SKILLS[skillId];
                return (
                  <div key={skillId} className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl">
                    <span className="text-xl">{skill.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-stone-700">{skill.name}</p>
                      <p className="text-xs text-stone-500">{skill.description[userLevel]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: ANCHOR QUESTION - TIME TRAVEL THEME */}
          <div className="soft-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">✈️</span>
              <h3 className="font-semibold text-stone-800">Time Travel: Age 18</h3>
            </div>

            <p className="text-stone-600 mb-2">
              Imagine you have moved out of home and have your first full-time job.
            </p>
            <p className="text-stone-600 mb-4">
              If you earn <span className="font-bold text-stone-800">$100</span>, how much should you allow for <span className="text-emerald-600 font-bold">Wants</span> (fun stuff)?
            </p>

            <div className="text-center py-6">
              <span className="text-4xl font-bold text-emerald-600">${Math.round(localGuess)}</span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step="5"
              value={localGuess}
              onChange={(e) => setLocalGuess(Number(e.target.value))}
              className="w-full mb-6"
            />

            <div className="flex justify-between text-xs text-stone-400 mb-6">
              <span>$0 (All bills)</span>
              <span>$100 (All fun)</span>
            </div>

            <button
              onClick={() => setAnchorGuess(localGuess)}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Lock in Guess <Check className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        // STEP 4: CONFIRMATION
        <div className="soft-card p-6 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Guess Locked!</h3>
            <p className="text-3xl font-bold text-emerald-600">${anchorGuess}</p>
            <p className="text-sm text-stone-500 mt-2">
              Let's fast forward to your first real job and test that theory.
            </p>
          </div>

          <div className="skill-check-box mb-6">
            <p>
              <span className="text-lg mr-2">🎯</span>
              <span className="opacity-80">Skill check:</span> You just practiced <strong>Estimating</strong> — predicting future spending ratios.
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Start Simulation
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: INCOME SETUP (LOCKED - SIMULATION MODE)
// ═══════════════════════════════════════════════════════════════

function Phase1Income({ userLevel, income, setIncome, onNext, onBack }) {

  // Calculate tank fill percentage relative to max of 1000
  const fillPercentage = (income / 1200) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl text-blue-600">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Job Offer Accepted</h3>
            <p className="text-sm text-stone-500">Welcome to the workforce!</p>
          </div>
        </div>

        {/* The Contract Visual */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-6 relative overflow-hidden">
            <h4 className="font-bold text-stone-800 text-lg mb-1">Employment Contract</h4>
            <p className="text-stone-500 text-xs mb-4">ACME Industries Ltd.</p>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-600">Role:</span>
                    <span className="font-medium">Junior Associate</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-600">Weekly Pay (Net):</span>
                    <span className="font-bold text-emerald-600 text-lg">${income}</span>
                </div>
                <div className="h-px bg-stone-200 my-2" />
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-stone-400 mt-0.5" />
                    <p className="text-xs text-stone-500 italic">
                        This is your "take home" pay after tax. You need to use this to pay for Rent, Food, and Fun.
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-600 font-medium hover:bg-stone-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          Sort Money
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE SORT (50/30/20 Rule)
// ═══════════════════════════════════════════════════════════════

function Phase2TheSort({ userLevel, income, allocations, setAllocations, onNext, onBack }) {
  const [handle1, setHandle1] = useState(33); // Position of first divider (0-100)
  const [handle2, setHandle2] = useState(66); // Position of second divider (0-100)
  const [activeHandle, setActiveHandle] = useState(null);
  const [showExperts, setShowExperts] = useState(false); // New state to toggle expert view
  const barRef = useRef(null);

  // Sync handles with allocations on mount
  useEffect(() => {
    // Initial setup if not already set cleanly
    if (allocations.needs === 33 && allocations.wants === 33) {
      setHandle1(33);
      setHandle2(66);
    } else {
      setHandle1(allocations.needs);
      setHandle2(allocations.needs + allocations.wants);
    }
  }, []);

  // Sync allocations when handles move
  useEffect(() => {
    const needs = handle1;
    const wants = handle2 - handle1;
    const savings = 100 - handle2;
    setAllocations({ needs, wants, savings });
  }, [handle1, handle2]);

  const handleTouch = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));

    // Determine which handle is closer
    const dist1 = Math.abs(pct - handle1);
    const dist2 = Math.abs(pct - handle2);

    if (activeHandle === 1 || (activeHandle === null && dist1 < dist2)) {
      setHandle1(Math.min(pct, handle2 - 5)); // Keep 5% gap
      setActiveHandle(1);
    } else {
      setHandle2(Math.max(pct, handle1 + 5)); // Keep 5% gap
      setActiveHandle(2);
    }
  };

  const handleEnd = () => {
    setActiveHandle(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Intro */}
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl text-purple-600">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">The Golden Rule</h3>
            <p className="text-sm text-stone-500">How would you split your money?</p>
          </div>
        </div>

        <p className="text-stone-600 mb-6 text-sm">
           Drag the dividers below to split your income into <strong>Needs</strong>, <strong>Wants</strong>, and <strong>Savings</strong>.
        </p>

        {/* The Budget Bar */}
        <div className="relative h-16 w-full bg-stone-100 rounded-full mb-8 select-none touch-none mt-12"
          ref={barRef}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => { handleTouch(e); document.addEventListener('mousemove', handleTouch); document.addEventListener('mouseup', () => { handleEnd(); document.removeEventListener('mousemove', handleTouch); }, { once: true }); }}
        >
          {/* Needs Segment */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-l-full flex items-center justify-center text-xs font-bold text-white transition-all duration-75 overflow-hidden"
            style={{ width: `${handle1}%` }}
          >
            {handle1 > 15 && `Needs ${Math.round(handle1)}%`}
          </div>

          {/* Wants Segment */}
          <div
            className="absolute top-0 bottom-0 bg-purple-500 flex items-center justify-center text-xs font-bold text-white transition-all duration-75 overflow-hidden"
            style={{ left: `${handle1}%`, width: `${handle2 - handle1}%` }}
          >
            {(handle2 - handle1) > 15 && `Wants ${Math.round(handle2 - handle1)}%`}
          </div>

          {/* Savings Segment */}
          <div
            className="absolute right-0 top-0 bottom-0 bg-emerald-500 rounded-r-full flex items-center justify-center text-xs font-bold text-white transition-all duration-75 overflow-hidden"
            style={{ width: `${100 - handle2}%` }}
          >
            {(100 - handle2) > 15 && `Save ${Math.round(100 - handle2)}%`}
          </div>

          {/* Handles */}
          <div
            className="absolute top-0 bottom-0 w-8 -ml-4 bg-white rounded-full shadow-lg border-2 border-stone-200 flex items-center justify-center z-10 cursor-ew-resize"
            style={{ left: `${handle1}%` }}
          >
            <div className="w-1 h-4 bg-stone-300 rounded-full" />
          </div>
          <div
            className="absolute top-0 bottom-0 w-8 -ml-4 bg-white rounded-full shadow-lg border-2 border-stone-200 flex items-center justify-center z-10 cursor-ew-resize"
            style={{ left: `${handle2}%` }}
          >
            <div className="w-1 h-4 bg-stone-300 rounded-full" />
          </div>

          {/* EXPERT MARKERS (Hidden initially) */}
          {showExperts && (
            <div className="animate-fade-in">
              <div className="absolute -top-8 left-[50%] -translate-x-1/2 flex flex-col items-center">
                 <span className="text-[10px] text-stone-600 font-bold bg-white px-2 py-0.5 rounded shadow-sm border border-stone-200 whitespace-nowrap">Goal: 50%</span>
                 <div className="w-0.5 h-3 bg-stone-400 mt-1"></div>
              </div>
              <div className="absolute -top-8 left-[80%] -translate-x-1/2 flex flex-col items-center">
                 <span className="text-[10px] text-stone-600 font-bold bg-white px-2 py-0.5 rounded shadow-sm border border-stone-200 whitespace-nowrap">Goal: 80%</span>
                 <div className="w-0.5 h-3 bg-stone-400 mt-1"></div>
              </div>
            </div>
          )}
        </div>

        {/* Live Feedback */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-3 rounded-xl border ${showExperts && Math.abs(allocations.needs - 50) < 5 ? 'bg-blue-50 border-blue-200' : 'bg-stone-50 border-transparent'}`}>
            <p className="text-xs text-stone-500">Needs</p>
            <p className="text-lg font-bold text-blue-600">${Math.round(income * (allocations.needs/100))}</p>
          </div>
          <div className={`p-3 rounded-xl border ${showExperts && Math.abs(allocations.wants - 30) < 5 ? 'bg-purple-50 border-purple-200' : 'bg-stone-50 border-transparent'}`}>
            <p className="text-xs text-stone-500">Wants</p>
            <p className="text-lg font-bold text-purple-600">${Math.round(income * (allocations.wants/100))}</p>
          </div>
          <div className={`p-3 rounded-xl border ${showExperts && Math.abs(allocations.savings - 20) < 5 ? 'bg-emerald-50 border-emerald-200' : 'bg-stone-50 border-transparent'}`}>
            <p className="text-xs text-stone-500">Savings</p>
            <p className="text-lg font-bold text-emerald-600">${Math.round(income * (allocations.savings/100))}</p>
          </div>
        </div>

        {/* Reveal Button or Expert Text */}
        {!showExperts ? (
          <button
             onClick={() => setShowExperts(true)}
             className="w-full mt-6 py-3 bg-stone-800 text-white rounded-xl font-medium flex items-center justify-center gap-2"
          >
             See what experts say <Brain className="w-4 h-4" />
          </button>
        ) : (
           <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl animate-fade-in">
              <h4 className="font-bold text-emerald-800 text-sm mb-1 flex items-center gap-2">
                 The 50/30/20 Rule
              </h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                 Experts recommend: <strong>50%</strong> Needs, <strong>30%</strong> Wants, and <strong>20%</strong> Savings.
                 Try to move the sliders to match this goal!
              </p>
           </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-600 font-medium hover:bg-stone-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          Build Budget
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE WIZARD (Build & Balance)
// ═══════════════════════════════════════════════════════════════

function Phase3Wizard({
  userLevel, income,
  livingSituation, setLivingSituation,
  selectedNeeds, setSelectedNeeds,
  selectedWants, setSelectedWants,
  onNext, onBack
}) {
  const [step, setStep] = useState(0); // 0: Living, 1: Needs, 2: Wants, 3: Balance

  // Calculations
  const rentCost = livingSituation.cost;
  const otherNeedsCost = selectedNeeds.reduce((sum, id) => sum + BASE_NEEDS.find(i => i.id === id).cost, 0);
  const totalNeeds = rentCost + otherNeedsCost;

  const totalWants = selectedWants.reduce((sum, id) => sum + WANTS_ITEMS.find(i => i.id === id).cost, 0);
  const totalExpenses = totalNeeds + totalWants;
  const remaining = income - totalExpenses;
  const isDeficit = remaining < 0;

  const toggleNeed = (id) => {
    if (selectedNeeds.includes(id)) {
      setSelectedNeeds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedNeeds(prev => [...prev, id]);
    }
  };

  const toggleWant = (id) => {
    if (selectedWants.includes(id)) {
      setSelectedWants(prev => prev.filter(i => i !== id));
    } else {
      setSelectedWants(prev => [...prev, id]);
    }
  };

  // Step Logic: Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Dynamic Header based on Step */}
      <div className="soft-card p-5">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            step === 0 ? 'bg-stone-100 text-stone-600' : step === 1 ? 'bg-blue-100 text-blue-600' : step === 2 ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
             {step === 0 ? <Home className="w-6 h-6" /> : step === 1 ? <ShoppingBag className="w-6 h-6" /> : step === 2 ? <CreditCard className="w-6 h-6" /> : <Calculator className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">
              {step === 0 ? "Living Situation" : step === 1 ? "Essential Costs" : step === 2 ? "Fun & Wants" : "Balance Check"}
            </h3>
            <p className="text-sm text-stone-500">
              {step === 0 ? "Where will you live?" : step === 1 ? "Bills you must pay." : step === 2 ? "Stuff you enjoy." : "Does it add up?"}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Budget Bar */}
      {step > 0 && (
        <div className={`sticky top-32 z-20 rounded-2xl p-4 shadow-lg transition-colors duration-300 ${
          isDeficit ? 'bg-rose-600 text-white' : 'bg-white text-stone-800 border border-stone-100'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium opacity-80">Remaining for Savings</span>
            <span className="text-xl font-bold">${remaining}</span>
          </div>
          <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isDeficit ? 'bg-white' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, (totalExpenses / income) * 100)}%` }}
            />
          </div>
          {isDeficit && step === 3 && (
             <div className="mt-2 text-xs font-bold flex items-center gap-1 animate-pulse">
               <AlertTriangle className="w-3 h-3" />
               You are in deficit! Tap items to cut costs.
             </div>
          )}
        </div>
      )}

      {/* STEP 0: LIVING SITUATION */}
      {step === 0 && (
         <div className="space-y-3 animate-slide-up">
            {LIVING_SITUATIONS.map(opt => (
               <button
                  key={opt.id}
                  onClick={() => setLivingSituation(opt)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                     livingSituation.id === opt.id
                     ? 'bg-white shadow-lg ring-2 ring-emerald-500'
                     : 'bg-white border-2 border-stone-100 text-stone-600 hover:shadow-md'
                  }`}
               >
                  <div className="flex items-center justify-between mb-1">
                     <span className={`font-bold flex items-center gap-2 ${livingSituation.id === opt.id ? 'text-stone-800' : ''}`}>
                        <opt.icon className="w-4 h-4" /> {opt.name}
                     </span>
                     <span className={`font-bold ${livingSituation.id === opt.id ? 'text-emerald-600' : ''}`}>${opt.cost}/wk</span>
                  </div>
                  <p className="text-xs text-stone-400">
                     {opt.desc}
                  </p>
                  {livingSituation.id === opt.id && (
                    <div className="absolute top-4 right-4 text-emerald-500">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
               </button>
            ))}
            <button
               onClick={() => setStep(1)}
               className="w-full mt-4 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
               Next: Essentials
               <ChevronRight className="w-5 h-5" />
            </button>
         </div>
      )}

      {/* STEP 1: NEEDS */}
      {step === 1 && (
        <div className="space-y-3 animate-slide-up">
          {/* Rent (Locked from Step 0) */}
          <div className="w-full p-4 rounded-xl flex items-center justify-between bg-stone-100 border-2 border-stone-200 text-stone-500 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                   <span className="font-medium block">{livingSituation.name}</span>
                   <span className="text-xs">Locked (Step 1)</span>
                </div>
              </div>
              <span className="font-bold">${livingSituation.cost}</span>
          </div>

          {BASE_NEEDS.map(item => (
            <button
              key={item.id}
              onClick={() => toggleNeed(item.id)}
              className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                selectedNeeds.includes(item.id)
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                  : 'bg-white border-2 border-transparent shadow-sm opacity-80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-stone-800">{item.name}</span>
              </div>
              <span className="font-bold text-stone-600">${item.cost}</span>
            </button>
          ))}
          <div className="flex gap-3 mt-4">
             <button
              onClick={() => setStep(0)}
              className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-600 font-medium"
            >
              Back
            </button>
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
            >
              Next: Wants
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: WANTS */}
      {step === 2 && (
        <div className="space-y-3 animate-slide-up">
          {WANTS_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => toggleWant(item.id)}
              className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                selectedWants.includes(item.id)
                  ? 'bg-purple-50 border-2 border-purple-500 shadow-sm'
                  : 'bg-white border-2 border-transparent shadow-sm opacity-80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-stone-800">{item.name}</span>
              </div>
              <span className="font-bold text-stone-600">${item.cost}</span>
            </button>
          ))}
          <div className="flex gap-3 mt-4">
             <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-600 font-medium"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-4 rounded-xl bg-stone-800 text-white font-semibold hover:bg-black transition-colors"
            >
              Check Balance
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: BALANCE */}
      {step === 3 && (
        <div className="space-y-4 animate-slide-up">

          {/* Summary Card */}
          <div className="soft-card p-5">
            <h4 className="font-semibold text-stone-800 mb-3">Monthly Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Income</span>
                <span className="font-bold text-stone-800">${income}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-500">Needs (Rent + {selectedNeeds.length})</span>
                <span className="font-bold text-blue-600">-${totalNeeds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-500">Wants ({selectedWants.length})</span>
                <span className="font-bold text-purple-600">-${totalWants}</span>
              </div>
              <div className="border-t border-stone-100 my-2 pt-2 flex justify-between">
                <span className="font-semibold text-stone-800">Savings Left</span>
                <span className={`font-bold text-xl ${isDeficit ? 'text-rose-600' : 'text-emerald-600'}`}>
                  ${remaining}
                </span>
              </div>
            </div>
          </div>

          {/* Friction: Item Removal Grid if Deficit */}
          {isDeficit && (
             <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
               <h5 className="text-rose-800 font-bold text-sm mb-3 flex items-center gap-2">
                 <Scissors className="w-4 h-4" />
                 Cut some costs to fix the budget
               </h5>
               <div className="flex flex-wrap gap-2">
                 {/* Show Rent Option to Change */}
                 <button
                    onClick={() => setStep(0)}
                    className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg shadow-sm text-xs font-medium text-rose-700 flex items-center gap-1 hover:bg-rose-100"
                 >
                    Change Living Situation?
                 </button>

                 {[...selectedWants, ...selectedNeeds].map(id => {
                   const item = [...WANTS_ITEMS, ...BASE_NEEDS].find(i => i.id === id);
                   const isWant = WANTS_ITEMS.find(i => i.id === id);
                   return (
                     <button
                       key={id}
                       onClick={() => isWant ? toggleWant(id) : toggleNeed(id)}
                       className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg shadow-sm text-xs font-medium text-rose-700 flex items-center gap-1 hover:bg-rose-100"
                     >
                       {item.name} (${item.cost}) <span className="text-rose-400">×</span>
                     </button>
                   );
                 })}
               </div>
             </div>
          )}

          <div className="flex gap-3">
             <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-600 font-medium"
            >
              Back
            </button>
            <button
              onClick={onNext}
              disabled={isDeficit}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                isDeficit
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              Finish Budget
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 4: REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase4Reflection({
  userLevel, onComplete,
  anchorGuess, income,
  livingSituation, selectedNeeds, selectedWants
}) {
  const [reflection, setReflection] = useState('');

  // Calculate Finals
  const rentCost = livingSituation.cost;
  const otherNeedsCost = selectedNeeds.reduce((sum, id) => sum + BASE_NEEDS.find(i => i.id === id).cost, 0);
  const totalNeeds = rentCost + otherNeedsCost;
  const totalWants = selectedWants.reduce((sum, id) => sum + WANTS_ITEMS.find(i => i.id === id).cost, 0);
  const totalSavings = income - totalNeeds - totalWants;

  // Calculate Percentages
  const needsPct = Math.round((totalNeeds / income) * 100);
  const wantsPct = Math.round((totalWants / income) * 100);
  const savingsPct = Math.round((totalSavings / income) * 100);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* REALITY CHECK DASHBOARD */}
      <div className="soft-card p-5">
         <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Reality Check
         </h3>

         <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
            <div className="bg-stone-100 p-2 rounded-lg">
               <div className="text-stone-500 mb-1">Your Guess</div>
               <div className="font-bold text-stone-800">{anchorGuess}%</div>
               <div className="text-[10px] text-stone-400">Wants</div>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg ring-2 ring-purple-500">
               <div className="text-purple-700 mb-1">Actual</div>
               <div className="font-bold text-purple-900">{wantsPct}%</div>
               <div className="text-[10px] text-purple-600">Wants</div>
            </div>
            <div className="bg-stone-100 p-2 rounded-lg">
               <div className="text-stone-500 mb-1">Expert Rule</div>
               <div className="font-bold text-stone-800">30%</div>
               <div className="text-[10px] text-stone-400">Wants</div>
            </div>
         </div>

         <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
               <span className="text-stone-600">Needs (Goal: 50%)</span>
               <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500" style={{width: `${Math.min(100, needsPct)}%`}}></div>
                  </div>
                  <span className="font-bold w-8 text-right">{needsPct}%</span>
               </div>
            </div>
            <div className="flex items-center justify-between text-sm">
               <span className="text-stone-600">Wants (Goal: 30%)</span>
               <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500" style={{width: `${Math.min(100, wantsPct)}%`}}></div>
                  </div>
                  <span className="font-bold w-8 text-right">{wantsPct}%</span>
               </div>
            </div>
            <div className="flex items-center justify-between text-sm">
               <span className="text-stone-600">Savings (Goal: 20%)</span>
               <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500" style={{width: `${Math.min(100, savingsPct)}%`}}></div>
                  </div>
                  <span className="font-bold w-8 text-right">{savingsPct}%</span>
               </div>
            </div>
         </div>
      </div>

      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-12 h-12 rounded-xl bg-emerald-100 p-3 text-emerald-600" />
          <h2 className="text-xl font-bold text-stone-800">Final Thought</h2>
        </div>

        <p className="text-stone-600 mb-4 font-medium">
          Look at your actual budget above. How close did you get to the 50/30/20 rule, and was it harder than you expected?
        </p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I noticed that rent took up huge amount of my money..."
          className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-32 text-stone-800 transition-colors"
        />
      </div>

      <div className="soft-card p-5">
        <h4 className="font-medium text-stone-800 mb-4">Skills Added</h4>
        <div className="space-y-3">
          {BUDGET_MODULE_SKILLS.map(skillId => (
            <div key={skillId}>
               <div className="flex justify-between text-sm mb-1">
                 <span className="flex items-center gap-2">
                   {SKILLS[skillId].icon} {SKILLS[skillId].name}
                 </span>
                 <span className="text-stone-400 text-xs">+{moduleSkillWeights[skillId]}</span>
               </div>
               <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500" style={{width: `${(moduleSkillWeights[skillId]/4)*100}%`}}></div>
               </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onComplete(moduleSkillWeights)}
        disabled={reflection.length < 5}
        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
          reflection.length >= 5
            ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Add to Kete Putea <span className="text-xl">🧺</span>
      </button>
    </div>
  );
}
