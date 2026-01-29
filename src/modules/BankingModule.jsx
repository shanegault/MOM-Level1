import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronLeft,
  Heart, Target, Check, Info,
  Search, BarChart3, AlertTriangle,
  AlertCircle, XCircle, MapPin,
  Briefcase, Calculator, ShoppingBag, Wallet, PiggyBank,
  Coins, Brain, PieChart, CreditCard, Scissors,
  Plane, Calendar, Users, Key, Landmark, Smartphone,
  Droplets, PawPrint
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - Banking 101 (The Cost of 'Free')
// "Quiet Interface" Design System | Capital Efficiency & ROI
// STRICTLY MODELED ON VEGGIE GARDEN ARCHITECTURE & STYLING
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// MODULE SKILL WEIGHTING
// ═══════════════════════════════════════════════════════════════

const moduleSkillWeights = {
  estimating: 2,    // Estimating usage
  calculating: 4,   // Calculating annual fees
  comparing: 5,     // Comparing product features
  forecasting: 2,   // Predicting future costs
  reflecting: 2     // Final analysis
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

const BANKING_MODULE_SKILLS = ['estimating', 'calculating', 'comparing', 'forecasting', 'reflecting'];

// ═══════════════════════════════════════════════════════════════
// DATA MODELS
// ═══════════════════════════════════════════════════════════════

const BANK_ACCOUNTS = [
  {
    id: 'youth',
    name: 'Youth Saver',
    provider: 'Big Bank Corp',
    icon: PiggyBank,
    color: 'emerald', // Green - Safe
    monthlyFee: 0,
    txnFee: 0,
    atmFee: 0,
    overdraftPenalty: 0,
    overdraftType: 'decline', // Transaction fails
    replacementFee: 5,
    wrongAtmFee: 0, // Usually blocked or standard
    features: ['EFTPOS Only', 'No Online Buying', 'Interest: 0.5%']
  },
  {
    id: 'student',
    name: 'Everyday Student',
    provider: 'National Trust',
    icon: Landmark,
    color: 'amber', // Orange/Amber - Caution
    monthlyFee: 0,
    txnFee: 0,
    atmFee: 0,
    overdraftPenalty: 5, // Unarranged overdraft fee
    overdraftType: 'fee',
    replacementFee: 15,
    wrongAtmFee: 2.50,
    features: ['Visa Debit', 'Apple Pay', 'Interest: 0.0%']
  },
  {
    id: 'digital',
    name: 'The "Free" Digital',
    provider: 'NeoCash App',
    icon: Smartphone,
    color: 'rose', // Red/Rose - Danger
    monthlyFee: 0,
    txnFee: 0,
    atmFee: 2.50, // The hidden cost for physical cash
    overdraftPenalty: 25, // The big sting
    overdraftType: 'fee',
    replacementFee: 25, // Metal card shipping
    wrongAtmFee: 5.00,
    features: ['Metal Card', 'Fancy App', 'Crypto Features']
  }
];

const LIFE_EVENTS = [
  {
    id: 'overdraft',
    label: 'Accidental Overdraft',
    desc: 'You spent $10 more than you had.',
    icon: AlertTriangle
  },
  {
    id: 'lost_card',
    label: 'Lost Debit Card',
    desc: 'You left your card on the bus.',
    icon: CreditCard
  },
  {
    id: 'wrong_atm',
    label: 'Wrong ATM Used',
    desc: 'You used a different bank\'s ATM.',
    icon: MapPin
  }
];

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function BankingModule({ onBack, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');
  const [profile, setProfile] = useState({ eftpos: 20, atm: 2, subs: 1 });
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Anchor', icon: Target },
    { num: 1, name: 'Setup', icon: Briefcase },
    { num: 2, name: 'Products', icon: CreditCard },
    { num: 3, name: 'Simulator', icon: AlertTriangle },
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
              <span className="text-sm font-medium">Hub</span>
            </button>
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Banking 101</span>
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
            onNext={() => setPhase(1)}
          />
        )}
        {phase === 1 && (
          <Phase1Setup
            userLevel={userLevel}
            profile={profile}
            setProfile={setProfile}
            onNext={() => setPhase(2)}
            onBack={() => setPhase(0)}
          />
        )}
        {phase === 2 && (
          <Phase2ProductSelector
            userLevel={userLevel}
            profile={profile}
            setProfile={setProfile}
            onNext={() => setPhase(3)}
            onBack={() => setPhase(1)}
          />
        )}
        {phase === 3 && (
          <Phase3TheSting
            userLevel={userLevel}
            profile={profile}
            setProfile={setProfile}
            selectedEvents={selectedEvents}
            setSelectedEvents={setSelectedEvents}
            onNext={() => setPhase(4)}
            onBack={() => setPhase(2)}
          />
        )}
        {phase === 4 && (
          <Phase4Reflection
            userLevel={userLevel}
            profile={profile}
            selectedEvents={selectedEvents}
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

function Phase0Anchor({ userLevel, onNext }) {
  const [showSkills, setShowSkills] = useState(false);
  const [answer, setAnswer] = useState(null);

  const options = [
    { id: 'fees', text: "They charge monthly fees" },
    { id: 'lend', text: "They lend our money out" },
    { id: 'govt', text: "The government pays them" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {!showSkills ? (
        // STEP 1: INTRO CARD
        <div className="soft-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl shadow-sm text-emerald-700">
              🏦
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-800">Banking 101</h2>
              <p className="text-sm text-stone-500">The Cost of 'Free'</p>
            </div>
          </div>
          <p className="text-stone-600 mb-6">
            Banks look after your money and keep it safe. But how do they actually make money?
          </p>
          <button
            onClick={() => setShowSkills(true)}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            See what you'll learn
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : !answer ? (
        <>
          {/* STEP 2: SKILLS DISPLAY */}
          <div className="soft-card p-6">
            <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Skills you'll practice
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {BANKING_MODULE_SKILLS.map((skillId) => {
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

          {/* STEP 3: ANCHOR QUESTION */}
          <div className="soft-card p-6">
            <h3 className="font-semibold text-stone-800 mb-4">Quick Guess:</h3>
            <p className="text-stone-600 mb-6 text-sm">
              If you put $100 in a bank, how does the bank turn a profit from it?
            </p>

            <div className="space-y-3">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAnswer(opt.id)}
                  className="w-full p-4 rounded-xl border-2 border-stone-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all text-left font-medium text-stone-700"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        // STEP 4: REVEAL
        <div className="soft-card p-6 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4">
              {answer === 'lend' ? '✓' : '💡'}
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">
              {answer === 'lend' ? "Spot on!" : "Actually..."}
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Banks make most of their money by <strong>lending your money</strong> to other people (for houses or businesses) and charging them interest.
            </p>
            <p className="text-stone-600 mt-4 leading-relaxed">
              But they also make money from <strong>fees</strong> when you make mistakes. Let's explore that.
            </p>
          </div>

          <div className="skill-check-box mb-6">
            <p>
              <span className="text-lg mr-2">🎯</span>
              <span className="opacity-80">Skill check:</span> You just practiced <strong>Estimating</strong> how businesses work.
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
// PHASE 1: SETUP
// ═══════════════════════════════════════════════════════════════

function Phase1Setup({ userLevel, profile, setProfile, onNext, onBack }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl text-emerald-600">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Your Spending Profile</h3>
            <p className="text-sm text-stone-500">How do you use your money?</p>
          </div>
        </div>

        <p className="text-stone-600 mb-6 text-sm">
          Adjust the sliders to match a typical month for a student.
        </p>

        {/* Sliders */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">EFTPOS Card Swipes</label>
              <span className="text-sm font-bold text-emerald-600">{profile.eftpos}</span>
            </div>
            <input
              type="range" min="0" max="50" step="1"
              value={profile.eftpos}
              onChange={(e) => setProfile({...profile, eftpos: Number(e.target.value)})}
              className="w-full"
            />
            <p className="text-xs text-stone-400 mt-1">times per month (Snacks, drinks, shopping)</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">ATM Withdrawals</label>
              <span className="text-sm font-bold text-emerald-600">{profile.atm}</span>
            </div>
            <input
              type="range" min="0" max="10" step="1"
              value={profile.atm}
              onChange={(e) => setProfile({...profile, atm: Number(e.target.value)})}
              className="w-full"
            />
            <p className="text-xs text-stone-400 mt-1">times per month (Cash for lunch, market)</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">Online Subs</label>
              <span className="text-sm font-bold text-emerald-600">{profile.subs}</span>
            </div>
            <input
              type="range" min="0" max="5" step="1"
              value={profile.subs}
              onChange={(e) => setProfile({...profile, subs: Number(e.target.value)})}
              className="w-full"
            />
            <p className="text-xs text-stone-400 mt-1">times per month (Netflix, Xbox, Spotify)</p>
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
          See Products
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: PRODUCT SELECTOR
// ═══════════════════════════════════════════════════════════════

function Phase2ProductSelector({
  userLevel, profile, setProfile,
  onNext, onBack
}) {
  const [showEditor, setShowEditor] = useState(false);

  // Helper to Calculate Cost
  const calculateCost = (account) => {
    let cost = (account.monthlyFee * 12) + (profile.atm * account.atmFee * 12) + (profile.eftpos * account.txnFee * 12);
    return cost;
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* INSTRUCTION BANNER */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-emerald-800 text-sm">Compare Annual Costs</h4>
          <p className="text-xs text-emerald-700 mt-1">
            You don't need to pick an account yet. Just adjust your usage below to see how fees change for each bank.
          </p>
        </div>
      </div>

      {/* Editor Toggle */}
      <div className="soft-card p-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="bg-stone-100 p-2 rounded-lg">
               <BarChart3 className="w-5 h-5 text-stone-600" />
            </div>
            <div className="text-xs text-stone-500">
               <div>Usage Profile:</div>
               <strong className="text-stone-800">{profile.eftpos} swipes, {profile.atm} ATMs</strong>
            </div>
         </div>
         <button
           onClick={() => setShowEditor(!showEditor)}
           className="text-xs font-medium text-emerald-600 px-3 py-1.5 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
         >
           {showEditor ? 'Hide' : 'Edit'}
         </button>
      </div>

      {/* Mini Editor */}
      {showEditor && (
        <div className="soft-card p-5 animate-slide-up border-2 border-emerald-100">
           <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium">ATM Withdrawals</span>
                <span className="text-xs font-bold">{profile.atm}/mo</span>
              </div>
              <input
                type="range" min="0" max="10" step="1"
                value={profile.atm}
                onChange={(e) => setProfile({...profile, atm: Number(e.target.value)})}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium">EFTPOS Swipes</span>
                <span className="text-xs font-bold">{profile.eftpos}/mo</span>
              </div>
              <input
                type="range" min="0" max="50" step="1"
                value={profile.eftpos}
                onChange={(e) => setProfile({...profile, eftpos: Number(e.target.value)})}
                className="w-full"
              />
            </div>
           </div>
        </div>
      )}

      {/* Cards Display */}
      <div className="grid gap-4">
        {BANK_ACCOUNTS.map((account) => {
           const annualCost = calculateCost(account);

           return (
             <div key={account.id} className="soft-card p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-${account.color}-100 text-${account.color}-600`}>
                         <account.icon className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-semibold text-stone-800">{account.name}</h4>
                         <p className="text-xs text-stone-500">{account.provider}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-2xl font-bold text-stone-800">${annualCost.toFixed(0)}</div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wide">Per Year</div>
                   </div>
                </div>

                <div className="space-y-1 mb-4">
                   {account.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-600">
                         <Check className="w-3 h-3 text-emerald-500" /> {feature}
                      </div>
                   ))}
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                   <span className="text-xs font-medium text-stone-400">Monthly Fee: ${account.monthlyFee}</span>
                   {account.atmFee > 0 && profile.atm > 0 && (
                      <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">
                         ATM Fees!
                      </span>
                   )}
                </div>
             </div>
           );
        })}
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
          Add "Real Life"
          <AlertTriangle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE STING (Life Simulator)
// ═══════════════════════════════════════════════════════════════

function Phase3TheSting({
   userLevel, profile, setProfile,
   selectedEvents, setSelectedEvents,
   onNext, onBack
 }) {

   // Helper to Calculate Cost including Life Events
   const calculateTotalCost = (account) => {
     let cost = (account.monthlyFee * 12) + (profile.atm * account.atmFee * 12) + (profile.eftpos * account.txnFee * 12);

     if (selectedEvents.includes('overdraft')) cost += account.overdraftPenalty;
     if (selectedEvents.includes('lost_card')) cost += account.replacementFee;
     if (selectedEvents.includes('wrong_atm')) cost += account.wrongAtmFee;

     return cost;
   };

   const toggleEvent = (eventId) => {
     if (selectedEvents.includes(eventId)) {
       setSelectedEvents(prev => prev.filter(id => id !== eventId));
     } else {
       setSelectedEvents(prev => [...prev, eventId]);
     }
   };

   return (
     <div className="space-y-6 animate-fade-in">

       <div className="soft-card p-6 bg-amber-50 border-2 border-amber-100">
          <div className="flex items-center gap-3 mb-2">
             <AlertTriangle className="w-6 h-6 text-amber-600" />
             <h3 className="font-semibold text-stone-800">Life Simulator</h3>
          </div>
          <p className="text-sm text-stone-600 mb-4">
             "Free" accounts often rely on you making mistakes. Tap events below to see how they impact your costs.
          </p>

          <div className="space-y-2">
            {LIFE_EVENTS.map(event => {
              const isActive = selectedEvents.includes(event.id);
              return (
                <button
                  key={event.id}
                  onClick={() => toggleEvent(event.id)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 border-2 transition-all ${
                    isActive
                      ? 'bg-amber-100 border-amber-300 shadow-sm'
                      : 'bg-white border-transparent hover:bg-stone-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-amber-200 text-amber-700' : 'bg-stone-100 text-stone-400'}`}>
                    <event.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className={`font-semibold text-sm ${isActive ? 'text-amber-900' : 'text-stone-700'}`}>{event.label}</div>
                    <div className="text-xs text-stone-500">{event.desc}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isActive ? 'bg-amber-500 border-amber-500' : 'border-stone-300'}`}>
                    {isActive && <Check className="w-4 h-4 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
       </div>

       {/* Cards Display */}
       <div className="grid gap-4">
         {BANK_ACCOUNTS.map((account) => {
            const annualCost = calculateTotalCost(account);
            const baseCost = (account.monthlyFee * 12) + (profile.atm * account.atmFee * 12) + (profile.eftpos * account.txnFee * 12);
            const extraFees = annualCost - baseCost;
            const isStung = extraFees > 0;

            return (
              <div key={account.id} className={`soft-card p-5 relative overflow-hidden transition-all duration-500 ${isStung ? 'ring-2 ring-rose-500 bg-rose-50' : ''}`}>

                 {isStung && (
                    <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl">
                       +${extraFees} FEES
                    </div>
                 )}

                 <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-${account.color}-100 text-${account.color}-600`}>
                          <account.icon className="w-5 h-5" />
                       </div>
                       <div>
                          <h4 className="font-semibold text-stone-800">{account.name}</h4>
                          <div className="text-xs text-stone-500">{account.provider}</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className={`text-2xl font-bold transition-colors duration-500 ${isStung ? 'text-rose-600' : 'text-stone-800'}`}>
                          ${annualCost.toFixed(0)}
                       </div>
                       <div className="text-[10px] text-stone-400 uppercase tracking-wide">Total Cost</div>
                    </div>
                 </div>

                 <div className="pt-3 border-t border-stone-100/50">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-stone-500">Event Impact:</span>
                       {selectedEvents.length > 0 ? (
                          <span className={`font-bold ${isStung ? 'text-rose-600' : 'text-stone-600'}`}>
                             {isStung ? `+$${extraFees} in penalties` : 'Safe'}
                          </span>
                       ) : (
                          <span className="text-stone-400">Add events above</span>
                       )}
                    </div>
                 </div>
              </div>
            );
         })}
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
           disabled={selectedEvents.length === 0}
           className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedEvents.length > 0
               ? 'bg-emerald-600 text-white hover:bg-emerald-700'
               : 'bg-stone-200 text-stone-400 cursor-not-allowed'
           }`}
         >
           Review & Reflect
           <Brain className="w-5 h-5" />
         </button>
       </div>
     </div>
   );
 }

// ═══════════════════════════════════════════════════════════════
// PHASE 4: REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase4Reflection({ userLevel, profile, selectedEvents, onComplete }) {
  const [reflection, setReflection] = useState('');

  // Find the cheapest account now
  const totals = BANK_ACCOUNTS.map(acc => {
    let cost = (acc.monthlyFee * 12) + (profile.atm * acc.atmFee * 12) + (profile.eftpos * acc.txnFee * 12);
    if (selectedEvents.includes('overdraft')) cost += acc.overdraftPenalty;
    if (selectedEvents.includes('lost_card')) cost += acc.replacementFee;
    if (selectedEvents.includes('wrong_atm')) cost += acc.wrongAtmFee;
    return { name: acc.name, cost };
  });

  const mostExpensive = totals.reduce((prev, current) => (prev.cost > current.cost) ? prev : current);
  const safest = totals.reduce((prev, current) => (prev.cost < current.cost) ? prev : current);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* REALITY CHECK DASHBOARD */}
      <div className="soft-card p-5">
         <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Reality Check
         </h3>

         <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 leading-relaxed mb-4">
            <p>
               After facing real life events ({selectedEvents.length} scenarios), the <strong>{mostExpensive.name}</strong> became the most expensive option at ${mostExpensive.cost.toFixed(0)}.
            </p>
            <p className="mt-2">
               The <strong>{safest.name}</strong> was the safest choice (${safest.cost.toFixed(0)}) because it had lower penalties for mistakes.
            </p>
         </div>

         <div className="flex items-center gap-3">
            <div className="flex-1 bg-stone-100 rounded-lg p-3 text-center">
               <div className="text-xs text-stone-500 mb-1">Your Profile</div>
               <div className="font-bold text-emerald-600">{profile.atm} ATMs</div>
            </div>
            <div className="flex-1 bg-rose-50 rounded-lg p-3 text-center border border-rose-100">
               <div className="text-xs text-rose-500 mb-1">Life Events</div>
               <div className="font-bold text-rose-600">{selectedEvents.length}</div>
            </div>
         </div>
      </div>

      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-12 h-12 rounded-xl bg-emerald-100 p-3 text-emerald-600" />
          <h2 className="text-xl font-bold text-stone-800">Final Thought</h2>
        </div>

        <p className="text-stone-600 mb-4 font-medium">
           Why do banks offer "Free" accounts with cool apps if they make zero money from monthly fees? What are they hoping you will do?
        </p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I think they hope I will make a mistake..."
          className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-32 text-stone-800 transition-colors"
        />
      </div>

      <div className="soft-card p-5">
        <h4 className="font-medium text-stone-800 mb-4">Skills Added</h4>
        <div className="space-y-3">
          {BANKING_MODULE_SKILLS.map(skillId => (
            <div key={skillId}>
               <div className="flex justify-between text-sm mb-1">
                 <span className="flex items-center gap-2">
                   {SKILLS[skillId].icon} {SKILLS[skillId].name}
                 </span>
                 <span className="text-stone-400 text-xs">+{moduleSkillWeights[skillId]}</span>
               </div>
               <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500" style={{width: `${(moduleSkillWeights[skillId]/5)*100}%`}}></div>
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
        Add to Kete Pūtea <span className="text-xl">🧺</span>
      </button>
    </div>
  );
}
