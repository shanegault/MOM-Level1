import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, ChevronLeft,
  Heart, Shield, Target, Check, Info, Ruler, Box,
  BarChart3, LineChart, DollarSign, Clock,
  Layers, Minus, Plus, AlertTriangle, Droplets, PawPrint,
  Briefcase, Calculator, ShoppingBag, Wallet, PiggyBank,
  ArrowRight, Coins, Brain
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// INCOME & THE PAY SLIP MODULE
// "Quiet Interface" Design System | Capital Efficiency & ROI
// STRICTLY MODELED ON VEGGIE GARDEN ARCHITECTURE
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// MODULE SKILL WEIGHTING
// ═══════════════════════════════════════════════════════════════

const moduleSkillWeights = {
  estimating: 3,    // Predicting take-home pay
  calculating: 4,   // Deductions math, hours-to-purchase
  comparing: 2,     // Gross vs Net, KiwiSaver rates
  forecasting: 2,   // Future savings vs current cash
  reflecting: 2     // Real world application
};

const SKILLS = {
  estimating: {
    id: 'estimating',
    name: 'Estimating',
    icon: '🎯',
    description: {
      '1-4': 'Guessing how much',
      '5-8': 'Making a reasonable guess',
      '9-10': 'Forming educated estimates based on rates',
      '11-13': 'Developing informed hypotheses on taxation'
    }
  },
  calculating: {
    id: 'calculating',
    name: 'Calculating',
    icon: '🧮',
    description: {
      '1-4': 'Counting the money',
      '5-8': 'Working out what is left over',
      '9-10': 'Computing accurate net income figures',
      '11-13': 'Applying tax codes and levy calculations'
    }
  },
  comparing: {
    id: 'comparing',
    name: 'Comparing',
    icon: '⚖️',
    description: {
      '1-4': 'Checking the difference',
      '5-8': 'Weighing up spending vs saving',
      '9-10': 'Analysing Gross vs Net purchasing power',
      '11-13': 'Evaluating remuneration packages'
    }
  },
  forecasting: {
    id: 'forecasting',
    name: 'Forecasting',
    icon: '📈',
    description: {
      '1-4': 'Thinking ahead',
      '5-8': 'Planning for future costs',
      '9-10': 'Projecting future savings growth',
      '11-13': 'Modelling long-term compound interest'
    }
  },
  reflecting: {
    id: 'reflecting',
    name: 'Reflecting',
    icon: '🪞',
    description: {
      '1-4': 'Thinking about money',
      '5-8': 'Understanding where money goes',
      '9-10': 'Recognising the impact of deductions',
      '11-13': 'Critically analysing income structure'
    }
  }
};

const INCOME_MODULE_SKILLS = ['estimating', 'calculating', 'comparing', 'forecasting', 'reflecting'];

// ═══════════════════════════════════════════════════════════════
// DATA MODELS
// ═══════════════════════════════════════════════════════════════

const JOBS = [
  {
    id: 'barista',
    title: 'Junior Barista',
    hourlyRate: 24.00,
    hoursPerWeek: 15,
    description: 'Weekend and after-school shifts at a local cafe.',
    icon: '☕'
  },
  {
    id: 'retail',
    title: 'Retail Assistant',
    hourlyRate: 26.50,
    hoursPerWeek: 12,
    description: 'Helping customers and stocking shelves.',
    icon: '👕'
  },
  {
    id: 'labour',
    title: 'Landscape Labourer',
    hourlyRate: 28.00,
    hoursPerWeek: 10,
    description: 'Hard physical work in gardens and sites.',
    icon: '🧱'
  }
];

const DEDUCTIONS = {
  paye: {
    name: 'PAYE Tax',
    rate: 0.175, // Simplified secondary tax/low income bracket average for demo
    description: 'Pay As You Earn. Income tax for schools, hospitals, and roads.',
    icon: '🏛️'
  },
  acc: {
    name: 'ACC Levy',
    rate: 0.016, // 1.6%
    description: 'Accident Compensation Corporation. Insurance for accidents.',
    icon: '🚑'
  }
};

const KIWISAVER_RATES = [
  { rate: 0.03, label: '3%', note: 'Minimum.' },
  { rate: 0.04, label: '4%', note: 'Balanced.' },
  { rate: 0.08, label: '8%', note: 'High savings.' }
];

const GOAL_ITEMS = [
  { id: 'sneakers', name: 'Sneakers', price: 220, icon: '👟' },
  { id: 'phone', name: 'Headphones', price: 350, icon: '🎧' },
  { id: 'concert', name: 'Concert Tix', price: 180, icon: '🎫' }
];

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT - STANDALONE CHILD MODULE
// ═══════════════════════════════════════════════════════════════

export default function IncomeModule({ onBack, onComplete }) {
  // Internal Module State
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');
  const [selectedJob, setSelectedJob] = useState(JOBS[0]);
  const [initialGuess, setInitialGuess] = useState(null);
  const [kiwiSaverRate, setKiwiSaverRate] = useState(0.03); // Default 3%
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Auto-scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Anchor', icon: Target },
    { num: 1, name: 'Job', icon: Briefcase },
    { num: 2, name: 'Deductions', icon: Calculator },
    { num: 3, name: 'Reality', icon: ShoppingBag },
    { num: 4, name: 'Reflect', icon: Brain } // Merged reflection
  ];

  // Core Calculations
  const grossPay = selectedJob.hourlyRate * selectedJob.hoursPerWeek;
  const paye = grossPay * DEDUCTIONS.paye.rate;
  const acc = grossPay * DEDUCTIONS.acc.rate;
  const kiwiSaver = grossPay * kiwiSaverRate;
  const netPay = grossPay - paye - acc - kiwiSaver;

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
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Income</span>
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
          <Phase0Prediction
            userLevel={userLevel}
            selectedJob={selectedJob}
            initialGuess={initialGuess}
            setInitialGuess={setInitialGuess}
            grossPay={grossPay}
            onNext={() => setPhase(1)}
          />
        )}
        {phase === 1 && (
          <Phase1JobSelection
            userLevel={userLevel}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            onNext={() => setPhase(2)}
            onBack={() => setPhase(0)}
          />
        )}
        {phase === 2 && (
          <Phase2Deductions
            userLevel={userLevel}
            grossPay={grossPay}
            kiwiSaverRate={kiwiSaverRate}
            setKiwiSaverRate={setKiwiSaverRate}
            paye={paye}
            acc={acc}
            netPay={netPay}
            onNext={() => setPhase(3)}
            onBack={() => setPhase(1)}
          />
        )}
        {phase === 3 && (
          <Phase3PurchasingPower
            userLevel={userLevel}
            netPay={netPay}
            grossPay={grossPay}
            initialGuess={initialGuess}
            selectedJob={selectedJob}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
            onNext={() => setPhase(4)}
            onBack={() => setPhase(2)}
          />
        )}
        {phase === 4 && (
          <Phase4Reflection
            userLevel={userLevel}
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

        /* Scrollable tabs container */
        .scroll-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .scroll-tabs::-webkit-scrollbar { display: none; }
        .scroll-tabs > button {
          scroll-snap-align: start;
          flex-shrink: 0;
        }

        /* Custom slider styling */
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
// PHASE 0: PREDICTION (Anchor) - Updated Flow
// ═══════════════════════════════════════════════════════════════

function Phase0Prediction({ userLevel, selectedJob, initialGuess, setInitialGuess, grossPay, onNext }) {
  const [showSkills, setShowSkills] = useState(false);
  const [localGuess, setLocalGuess] = useState(grossPay * 0.8);

  return (
    <div className="space-y-6 animate-fade-in">
      {!showSkills ? (
        // STEP 1: INTRO CARD
        <div className="soft-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-2xl shadow-sm text-teal-700">
              💸
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-800">Income & The Pay Slip</h2>
              <p className="text-sm text-stone-500">Gross vs Net Pay</p>
            </div>
          </div>
          <p className="text-stone-600 mb-6">
            If you get a job paying $25.00 per hour, how much of that actually lands in your bank account?
          </p>
          <button
            onClick={() => setShowSkills(true)}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            See what you'll learn
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : !initialGuess ? (
        <>
          {/* STEP 2: SKILLS DISPLAY */}
          <div className="soft-card p-6">
            <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Skills you'll practice
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {INCOME_MODULE_SKILLS.map((skillId) => {
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
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎯</span>
              <h3 className="font-semibold text-stone-800">Make an estimate</h3>
            </div>

            <p className="text-stone-600 mb-2">
              If your job contract says you earn <span className="font-bold text-stone-800">${grossPay}/week</span>, how much actually lands in your bank account?
            </p>

            <div className="text-center py-6">
              <span className="text-4xl font-bold text-emerald-600">${Math.round(localGuess)}</span>
              <p className="text-sm text-stone-400 mt-1">per week</p>
            </div>

            <input
              type="range"
              min={grossPay * 0.6}
              max={grossPay}
              step="5"
              value={localGuess}
              onChange={(e) => setLocalGuess(Number(e.target.value))}
              className="w-full mb-6"
            />

            <div className="flex justify-between text-xs text-stone-400 mb-6">
              <span>Maybe $300?</span>
              <span>Full $360?</span>
            </div>

            <button
              onClick={() => setInitialGuess(localGuess)}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Lock in Estimate <Check className="w-5 h-5" />
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
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Estimate Locked!</h3>
            <p className="text-3xl font-bold text-emerald-600">${initialGuess}</p>
            <p className="text-sm text-stone-500 mt-2">
              Let's construct your payslip and see if you're right.
            </p>
          </div>

          <div className="skill-check-box mb-6">
            <p>
              <span className="text-lg mr-2">🎯</span>
              <span className="opacity-80">Skill check:</span> You just practiced <strong>Estimating</strong> — predicting the real value of your time.
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Review Job Offer
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: JOB SELECTION
// ═══════════════════════════════════════════════════════════════

function Phase1JobSelection({ userLevel, selectedJob, setSelectedJob, onNext, onBack }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Select a Job</h3>
            <p className="text-sm text-stone-500">Different rates, different hours.</p>
          </div>
        </div>
        <p className="text-stone-600 mb-4">
          Choose a role to simulate your weekly income.
        </p>
      </div>

      <div className="space-y-3">
        {JOBS.map((job) => {
          const isSelected = selectedJob.id === job.id;
          const weeklyGross = job.hourlyRate * job.hoursPerWeek;

          return (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`w-full text-left p-4 rounded-2xl transition-all ${
                isSelected
                  ? 'bg-white shadow-lg ring-2 ring-emerald-500'
                  : 'bg-white/90 shadow hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  isSelected ? 'bg-emerald-100' : 'bg-stone-100'
                }`}>
                  {job.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-stone-800">{job.title}</h4>
                    {isSelected && <Check className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <p className="text-sm text-stone-500 mt-1">{job.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <span className="px-2 py-1 bg-stone-100 rounded-lg text-stone-600">
                      ${job.hourlyRate}/hr
                    </span>
                    <span className="px-2 py-1 bg-stone-100 rounded-lg text-stone-600">
                      {job.hoursPerWeek} hrs/wk
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 rounded-lg text-emerald-700 font-bold">
                      ${weeklyGross} Gross
                    </span>
                  </div>
                </div>
              </div>
            </button>
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
          Build Payslip
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: DEDUCTIONS LAB (The Builder - INTERACTIVE REDESIGN)
// ═══════════════════════════════════════════════════════════════

function Phase2Deductions({
  userLevel, grossPay, kiwiSaverRate, setKiwiSaverRate,
  paye, acc, netPay, onNext, onBack
}) {
  const [currentStep, setCurrentStep] = useState(0); // 0: PAYE, 1: ACC, 2: KiwiSaver, 3: Summary
  const [paidAmount, setPaidAmount] = useState(0); // 0 to deduction amount
  const [isDragging, setIsDragging] = useState(false);
  const tabsRef = useRef(null);

  const steps = [
    { id: 'paye', name: 'Tax', icon: '🏛️', color: 'rose' },
    { id: 'acc', name: 'ACC', icon: '🚑', color: 'rose' },
    { id: 'ks', name: 'KiwiSaver', icon: '🥝', color: 'amber' },
    { id: 'summary', name: 'Review', icon: '📋', color: 'emerald' }
  ];

  const ksDeduction = grossPay * kiwiSaverRate;

  // Determine deductions and previous payments
  let currentDeductionTarget, stepLabel, stepColor;
  let previousDeductions = 0;

  if (currentStep === 0) {
    currentDeductionTarget = paye;
    stepLabel = "PAYE Tax";
    stepColor = "rose";
    previousDeductions = 0;
  } else if (currentStep === 1) {
    currentDeductionTarget = acc;
    stepLabel = "ACC Levy";
    stepColor = "rose";
    previousDeductions = paye;
  } else if (currentStep === 2) {
    currentDeductionTarget = ksDeduction;
    stepLabel = "KiwiSaver";
    stepColor = "amber";
    previousDeductions = paye + acc;
  }

  // Current Take Home Calculation: Gross - Previous - Currently Paying
  const currentTakeHome = grossPay - previousDeductions - paidAmount;

  // Check completion
  const isStepComplete = currentStep < 3 && Math.abs(paidAmount - currentDeductionTarget) < 0.1;

  // Reset slider when step changes
  useEffect(() => {
    if (currentStep < 3) setPaidAmount(0);
  }, [currentStep]);

  // Handle KiwiSaver rate change - resets slider
  const handleRateChange = (newRate) => {
    setKiwiSaverRate(newRate);
    setPaidAmount(0);
  };

  const handleDrag = (e) => {
    const val = parseFloat(e.target.value);
    setPaidAmount(val);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Snap to target if close (within 5%)
    if (Math.abs(paidAmount - currentDeductionTarget) < (currentDeductionTarget * 0.1) || paidAmount > currentDeductionTarget * 0.95) {
      setPaidAmount(currentDeductionTarget);
    }
  };

  // Auto-scroll tabs
  useEffect(() => {
    if (tabsRef.current && tabsRef.current.children[currentStep]) {
      tabsRef.current.children[currentStep].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentStep]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="soft-card p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
            🏗️
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Payslip Builder</h3>
            <p className="text-sm text-stone-500">
              Drag the slider to pay your deductions.
            </p>
          </div>
        </div>
      </div>

      {/* The Tank (Running Total) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm sticky top-36 z-10 border border-stone-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-stone-600">Take Home Pay</span>
          <span className="text-xl font-bold text-emerald-600">${currentTakeHome.toFixed(2)}</span>
        </div>

        {/* Progress Bar Visualization */}
        <div className="h-4 bg-emerald-100 rounded-full overflow-hidden flex relative">
          <div className="h-full bg-emerald-500 transition-all duration-75" style={{ width: `${(currentTakeHome / grossPay) * 100}%` }} />
        </div>

        <div className="flex justify-between text-xs text-stone-400 mt-2 font-medium">
          <span>Gross: ${grossPay}</span>
          <span className="text-rose-500">-${(grossPay - currentTakeHome).toFixed(2)} deducted</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="scroll-tabs" ref={tabsRef}>
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => idx <= currentStep && setCurrentStep(idx)}
            disabled={idx > currentStep}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              idx === currentStep
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-stone-600 border border-stone-100'
            } ${idx > currentStep ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{step.icon}</span>
            <span className="text-sm font-medium">{step.name}</span>
            {idx < currentStep && <Check className="w-3 h-3" />}
          </button>
        ))}
      </div>

      {/* Interactive Step Content */}
      <div className="min-h-[200px]">
        {currentStep < 3 ? (
          <div className="space-y-6 animate-slide-up">

            {/* KiwiSaver Specific: Rate Explainer */}
            {currentStep === 2 && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {KIWISAVER_RATES.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleRateChange(opt.rate)}
                      className={`py-2 rounded-xl border-2 transition-all text-sm ${
                        kiwiSaverRate === opt.rate
                          ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                          : 'bg-white border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="font-bold">{opt.label}</div>
                    </button>
                  ))}
                </div>

                {/* Updated KiwiSaver Explanation Card */}
                <div className="forest-card p-4">
                  <div className="flex gap-3 items-start">
                    <Info className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">Why different rates?</h4>
                      <p className="text-emerald-100/90 text-xs leading-relaxed">
                        It's a trade-off. <strong>3%</strong> gives you more cash now (good for spending).
                        <strong> 8%</strong> puts more into your savings for a house or retirement.
                      </p>
                      <p className="text-emerald-100/90 text-xs leading-relaxed mt-2 border-t border-white/10 pt-2">
                        <strong>Pro Tip:</strong> Your employer matches your 3% contribution. That is free money!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`p-6 rounded-3xl ${
              isStepComplete
                ? 'bg-emerald-50 border-2 border-emerald-100'
                : 'bg-white shadow-lg border border-stone-100'
            } transition-all duration-300`}>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className={`text-lg font-bold ${isStepComplete ? 'text-emerald-700' : 'text-stone-700'}`}>
                    {stepLabel}
                  </h4>
                  <p className="text-sm text-stone-500">
                    {isStepComplete ? "Paid!" : "Drag right to pay"}
                  </p>
                </div>
                <div className={`text-xl font-mono font-bold ${
                  isStepComplete ? 'text-emerald-600' : `text-${stepColor}-500`
                }`}>
                  -${currentDeductionTarget.toFixed(2)}
                </div>
              </div>

              {/* The Slider (0 to Amount) */}
              <input
                type="range"
                min="0"
                max={currentDeductionTarget}
                step={0.1}
                value={paidAmount}
                onChange={handleDrag}
                onMouseUp={handleDragEnd}
                onTouchEnd={handleDragEnd}
                disabled={isStepComplete}
                className="w-full mb-2"
              />

              <div className="flex justify-between text-xs text-stone-400 font-medium">
                <span>$0</span>
                <span>${currentDeductionTarget.toFixed(2)}</span>
              </div>
            </div>

            {isStepComplete && (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all animate-bounce"
              >
                Confirm Payment <Check className="w-5 h-5 inline ml-2" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-slide-up">
            {/* Payslip Card */}
            <div className="soft-card p-0 overflow-hidden border border-stone-200">
              <div className="bg-stone-50 p-4 border-b border-stone-100 flex justify-between items-center">
                <span className="font-bold text-stone-600">PAYSLIP SUMMARY</span>
                <span className="text-xs font-mono text-stone-400">#8842</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 font-medium">Gross Pay</span>
                  <span className="font-bold text-stone-800">${grossPay.toFixed(2)}</span>
                </div>
                <div className="h-px bg-stone-100 my-1" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-rose-500">
                    <span>PAYE Tax</span>
                    <span>-${paye.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-rose-500">
                    <span>ACC Levy</span>
                    <span>-${acc.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-600">
                    <span>KiwiSaver ({kiwiSaverRate * 100}%)</span>
                    <span>-${(grossPay * kiwiSaverRate).toFixed(2)}</span>
                  </div>
                </div>
                <div className="h-px bg-stone-200 my-2" />
                <div className="flex justify-between items-end">
                  <span className="font-bold text-stone-800 text-lg">Net Pay</span>
                  <span className="font-bold text-2xl text-emerald-600">${netPay.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onNext}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Check Purchasing Power <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: PURCHASING POWER (Yield/Cost Analysis)
// ═══════════════════════════════════════════════════════════════

function Phase3PurchasingPower({
  userLevel, netPay, grossPay, initialGuess, selectedJob,
  selectedGoal, setSelectedGoal,
  onNext, onBack
}) {

  // Calculate hours needed based on hourly rate
  const getHoursToEarn = (price, hourlyRate) => (price / hourlyRate).toFixed(1);
  const hoursPerWeek = selectedJob.hoursPerWeek;
  const hourlyGross = grossPay / hoursPerWeek;
  const hourlyNet = netPay / hoursPerWeek;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Expectation vs Reality Card */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-stone-800">Expectation vs Reality</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <p className="text-xs text-stone-500 mb-1">Your Guess</p>
            <p className="text-xl font-bold text-stone-400">${initialGuess}</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-emerald-100">
            <p className="text-xs text-stone-500 mb-1">Actual Pay</p>
            <p className="text-xl font-bold text-emerald-600">${netPay.toFixed(0)}</p>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-stone-500">
          Difference: <span className={netPay >= initialGuess ? "text-emerald-600 font-bold" : "text-rose-500 font-bold"}>
            {netPay >= initialGuess ? '+' : ''}${(netPay - initialGuess).toFixed(0)}
          </span>
        </div>
      </div>

      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Purchasing Power</h3>
            <p className="text-sm text-stone-500">The Illusion vs Reality</p>
          </div>
        </div>
        <p className="text-stone-600 mb-4">
          Pick an item you want to buy. Let's see how long you <i>actually</i> have to work to get it.
        </p>
      </div>

      {/* Goal Selection */}
      <div className="grid grid-cols-3 gap-3">
        {GOAL_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedGoal(item)}
            className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
              selectedGoal?.id === item.id
                ? 'bg-purple-100 ring-2 ring-purple-500 text-purple-900'
                : 'bg-white shadow hover:shadow-md text-stone-600'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-xs font-bold">${item.price}</span>
          </button>
        ))}
      </div>

      {/* Analysis Card */}
      {selectedGoal && (
        <div className="forest-card p-5 animate-slide-up">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-white">Time Cost Analysis</h4>
            <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">
              {selectedGoal.name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            {/* The Illusion */}
            <div className="opacity-60">
              <p className="text-xs text-white/80 mb-1">Based on Gross Pay</p>
              <p className="text-2xl font-bold text-white">
                {getHoursToEarn(selectedGoal.price, hourlyGross)}
              </p>
              <div className="text-sm text-white/80">
                 hrs work
              </div>
              <p className="text-[10px] text-white/60 mt-1">("On paper")</p>
            </div>

            {/* The Reality */}
            <div className="relative z-10">
              <p className="text-xs text-emerald-200 mb-1 font-bold">Real Cost (Net)</p>
              <div className="text-3xl font-bold text-white mb-1">
                 {getHoursToEarn(selectedGoal.price, hourlyNet)}
              </div>
              <div className="text-xs text-emerald-200">
                +{ (getHoursToEarn(selectedGoal.price, hourlyNet) - getHoursToEarn(selectedGoal.price, hourlyGross)).toFixed(1) } hrs extra
              </div>
            </div>

            {/* Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />
          </div>

          <p className="text-sm text-white/70 mt-4 italic border-t border-white/10 pt-3">
            "You have to work extra hours just to pay the taxes on the money used to buy the {selectedGoal.name}."
          </p>
        </div>
      )}

      {/* Skill Check */}
      {selectedGoal && (
        <div className="skill-check-box animate-fade-in">
          <p>
            <span className="text-lg mr-2">🧮</span>
            <span className="opacity-80">Skill check:</span> You're practicing <strong>Calculating</strong> — translating money into time to see true cost.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-600 font-medium hover:bg-stone-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedGoal}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            selectedGoal
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          Finish
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 4: REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase4Reflection({ userLevel, onComplete }) {
  const [reflection, setReflection] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-stone-800">Final Thought</h2>
        </div>

        <p className="text-stone-600 mb-4 font-medium">
          Why is it important to budget based on your <strong>Net Pay</strong>, not your Gross Pay?
        </p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Because if I plan with Gross pay..."
          className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-32 text-stone-800 transition-colors"
        />
      </div>

      <div className="soft-card p-5">
        <h4 className="font-medium text-stone-800 mb-4">Skills Added</h4>
        <div className="space-y-3">
          {INCOME_MODULE_SKILLS.map(skillId => (
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
        Add to Kete Pūtea <span className="text-xl">🧺</span>
      </button>
    </div>
  );
}
