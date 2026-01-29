import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronLeft, Check, Target, Hourglass, Rocket,
  AlertTriangle, Brain, PiggyBank, ArrowRight, Clock, Plus
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - Introduction to Saving (The Time Machine)
// "Quiet Interface" Design System | SMART Goals & Timeline Visualisation
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// MODULE SKILL WEIGHTING
// ═══════════════════════════════════════════════════════════════

const moduleSkillWeights = {
  estimating: 2,    // Guessing time to $500
  calculating: 4,   // Weekly vs Total math
  forecasting: 5,   // Timeline visualisation and goal setting
  reflecting: 2     // Motivation reflection
};

const SKILLS = {
  estimating: {
    id: 'estimating',
    name: 'Estimating',
    icon: '🎯',
    description: {
      '1-4': 'Guessing how long things take',
      '5-8': 'Estimating time based on amounts',
      '9-10': 'Forming educated estimates on accumulation',
      '11-13': 'Developing informed hypotheses on time-value'
    }
  },
  calculating: {
    id: 'calculating',
    name: 'Calculating',
    icon: '🧮',
    description: {
      '1-4': 'Adding up savings',
      '5-8': 'Working out totals over time',
      '9-10': 'Calculating accumulation periods accurately',
      '11-13': 'Complex timeline modelling'
    }
  },
  forecasting: {
    id: 'forecasting',
    name: 'Forecasting',
    icon: '📈',
    description: {
      '1-4': 'Thinking about tomorrow',
      '5-8': 'Planning for future wants',
      '9-10': 'Projecting savings timelines and milestones',
      '11-13': 'Modelling long-term financial horizons'
    }
  },
  reflecting: {
    id: 'reflecting',
    name: 'Reflecting',
    icon: '🪞',
    description: {
      '1-4': 'Thinking about waiting',
      '5-8': 'Understanding patience and goals',
      '9-10': 'Evaluating motivation and trade-offs',
      '11-13': 'Critically analysing goal feasibility'
    }
  }
};

const SAVING_MODULE_SKILLS = ['estimating', 'calculating', 'forecasting', 'reflecting'];

// ═══════════════════════════════════════════════════════════════
// DATA MODELS
// ═══════════════════════════════════════════════════════════════

const SAVINGS_GOALS = [
  { id: 'sneakers', name: 'Fresh Sneakers', cost: 200, emoji: '👟' },
  { id: 'concert', name: 'Concert Tickets', cost: 350, emoji: '🎫' },
  { id: 'ps5', name: 'Gaming Console', cost: 800, emoji: '🎮' },
  { id: 'phone', name: 'New Phone', cost: 1200, emoji: '📱' },
  { id: 'car', name: 'First Car', cost: 5000, emoji: '🚗' },
  { id: 'trip', name: 'Overseas Trip', cost: 3000, emoji: '✈️' }
];

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function SavingsModule({ onBack, onComplete }) {
  // Internal module state
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');

  // Savings Specific State
  const [anchorGuess, setAnchorGuess] = useState(0);
  const [goal, setGoal] = useState(SAVINGS_GOALS[0]);
  const [weeklySavings, setWeeklySavings] = useState(20);
  const [simulatedDate, setSimulatedDate] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Intro', icon: Hourglass },
    { num: 1, name: 'Setup', icon: Target },
    { num: 2, name: 'View', icon: Rocket },
    { num: 3, name: 'Check', icon: AlertTriangle },
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
              <Clock className="w-5 h-5 text-lime-600" />
              <span className="font-semibold text-stone-800">Time Machine</span>
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
                      ? 'bg-lime-600 text-white shadow-lg shadow-lime-500/30 scale-110'
                      : phase > p.num
                        ? 'bg-lime-100 text-lime-600'
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
                    phase > p.num ? 'bg-lime-400' : 'bg-stone-200'
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
          <Phase1Setup
            userLevel={userLevel}
            goal={goal}
            setGoal={setGoal}
            weeklySavings={weeklySavings}
            setWeeklySavings={setWeeklySavings}
            onNext={() => setPhase(2)}
            onBack={() => setPhase(0)}
          />
        )}
        {phase === 2 && (
          <Phase2Visualisation
            userLevel={userLevel}
            goal={goal}
            weeklySavings={weeklySavings}
            setSimulatedDate={setSimulatedDate}
            onNext={() => setPhase(3)}
            onBack={() => setPhase(1)}
          />
        )}
        {phase === 3 && (
          <Phase3RealityCheck
            userLevel={userLevel}
            goal={goal}
            weeklySavings={weeklySavings}
            setWeeklySavings={setWeeklySavings}
            simulatedDate={simulatedDate}
            onNext={() => setPhase(4)}
            onBack={() => setPhase(1)}
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

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

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(183, 217, 177, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(183, 217, 177, 0); }
          100% { box-shadow: 0 0 0 0 rgba(183, 217, 177, 0); }
        }
        .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }

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
          border: 4px solid #84cc16; /* Lime-500 for this module */
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
  const [locked, setLocked] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {!showSkills ? (
        // STEP 1: INTRO CARD
        <div className="soft-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-lime-100 flex items-center justify-center text-2xl shadow-sm text-lime-700">
              ⏳
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-800">The Time Machine</h2>
              <p className="text-sm text-stone-500">Goals & Timelines</p>
            </div>
          </div>
          <p className="text-stone-600 mb-6">
            Small amounts of money don't seem like much. But over time, they add up. The question is... how much time?
          </p>
          <button
            onClick={() => setShowSkills(true)}
            className="w-full py-3 rounded-xl bg-lime-600 text-white font-medium hover:bg-lime-700 transition-colors flex items-center justify-center gap-2"
          >
            See what you'll learn
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : !locked ? (
        <>
          {/* STEP 2: SKILLS DISPLAY */}
          <div className="soft-card p-6">
            <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-lime-600" />
              Skills you'll practice
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SAVING_MODULE_SKILLS.map((skillId) => {
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
            <h3 className="font-semibold text-stone-800 mb-2">Take a guess</h3>
            <p className="text-sm text-stone-500 mb-6">
              If you save <strong>$5 a week</strong>, how long until you have <strong>$500</strong>?
            </p>

            <div className="flex justify-between items-end mb-4 h-12 px-2">
              <div className="text-center opacity-40">
                <span className="text-xs font-bold text-stone-600">Quick</span>
              </div>
              <div className="text-center opacity-40">
                <span className="text-xs font-bold text-stone-600">A while</span>
              </div>
            </div>

            <div className="relative mb-8">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={anchorGuess}
                onChange={(e) => setAnchorGuess(Number(e.target.value))}
                className="w-full"
              />
              <div className="absolute top-6 left-0 right-0 text-center">
                 <span className="text-2xl font-bold text-lime-600">{anchorGuess} Weeks</span>
              </div>
            </div>

            <button
              onClick={() => setLocked(true)}
              disabled={anchorGuess === 0}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 mt-4 ${
                anchorGuess > 0
                  ? 'bg-lime-600 text-white hover:bg-lime-700'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Lock in Answer <Check className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        // STEP 4: REVEAL
        <div className="soft-card p-6 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center text-3xl mx-auto mb-4">
              💯
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">
              It takes 100 weeks.
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm">
              That's almost <strong>2 years</strong>! Small amounts do add up, but they take time. To get things faster, you need to save more per week.
            </p>
            <div className="mt-4 p-4 bg-lime-50 rounded-xl border border-lime-100 text-lime-800 text-sm font-medium">
               Math: $500 ÷ $5 = 100 Weeks
            </div>
          </div>

          <div className="skill-check-box mb-6">
            <p>
              <span className="text-lg mr-2">🎯</span>
              <span className="opacity-80">Skill check:</span> You just practiced <strong>Estimating</strong> — getting a feel for how slow saving can be.
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl bg-lime-600 text-white font-semibold hover:bg-lime-700 transition-colors flex items-center justify-center gap-2"
          >
            Set your Time Machine
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

function Phase1Setup({
  userLevel, goal, setGoal, weeklySavings, setWeeklySavings,
  onNext, onBack
}) {

  const weeksToGoal = Math.ceil(goal.cost / weeklySavings);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Introduction Card */}
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-lime-100 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-lime-600" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Set your Goal</h3>
            <p className="text-sm text-stone-500">Pick something you want to buy.</p>
          </div>
        </div>

        {/* Goal Selector */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">What do you want?</label>
          <div className="grid grid-cols-2 gap-3">
            {SAVINGS_GOALS.map((item) => (
              <button
                key={item.id}
                onClick={() => setGoal(item)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  goal.id === item.id
                    ? 'border-lime-500 bg-lime-50'
                    : 'border-stone-100 bg-white hover:border-lime-200'
                }`}
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="font-bold text-stone-800 text-sm">{item.name}</div>
                <div className="text-xs text-stone-500">${item.cost}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Savings Slider */}
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-lime-100 flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-lime-600" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Weekly Savings</h3>
            <p className="text-sm text-stone-500">How much can you save each week?</p>
          </div>
        </div>

        <div className="mb-8">
           <div className="flex justify-between items-center mb-4">
             <span className="text-stone-500 font-medium text-sm">Amount</span>
             <span className="text-2xl font-bold text-lime-600">${weeklySavings}</span>
           </div>

           <input
             type="range"
             min={5}
             max={100}
             step={5}
             value={weeklySavings}
             onChange={(e) => setWeeklySavings(Number(e.target.value))}
             className="w-full"
           />
           <div className="flex justify-between text-xs text-stone-400 mt-2">
             <span>$5</span>
             <span>$100</span>
           </div>
        </div>
      </div>

      {/* Real-time Counter */}
      <div className="forest-card p-5 sticky top-36 z-20 shadow-xl">
         <div className="flex items-center justify-between">
            <div className="text-white/80 text-sm font-medium">Time to Goal</div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs text-white">
              ${goal.cost} ÷ ${weeklySavings}/wk
            </div>
         </div>
         <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white transition-all duration-300">
               {weeksToGoal}
            </span>
            <span className="text-white/80 font-medium">Weeks</span>
         </div>
         <p className="text-white/60 text-xs mt-1">
           {(weeksToGoal / 52).toFixed(1)} years
         </p>
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
          className="flex-1 py-4 rounded-xl bg-lime-600 text-white font-semibold hover:bg-lime-700 transition-colors flex items-center justify-center gap-2"
        >
          Travel to Future
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: VISUALISATION
// ═══════════════════════════════════════════════════════════════

function Phase2Visualisation({
  userLevel, goal, weeklySavings, setSimulatedDate,
  onNext, onBack
}) {
  const [isTravelling, setIsTravelling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date());

  const weeksToGoal = Math.ceil(goal.cost / weeklySavings);

  // Calculate future date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + (weeksToGoal * 7));

  const startTravel = () => {
    setIsTravelling(true);

    // Animation of dates scrolling
    let steps = 0;
    const maxSteps = 30; // 30 ticks of animation
    const interval = setInterval(() => {
      steps++;
      // Random jump forward
      setDisplayDate(prev => {
        const next = new Date(prev);
        next.setDate(next.getDate() + Math.floor(Math.random() * 30) + 7);
        return next;
      });

      if (steps >= maxSteps) {
        clearInterval(interval);
        setDisplayDate(targetDate);
        setSimulatedDate(targetDate);
        setIsTravelling(false);
        setShowResult(true);
      }
    }, 80);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {!isTravelling && !showResult && (
        <div className="soft-card p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center text-4xl mx-auto mb-6">
             🚀
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Ready to travel?</h3>
          <p className="text-stone-600 mb-8">
            We are going to jump forward <strong>{weeksToGoal} weeks</strong> into the future to see when you get your {goal.name}.
          </p>
          <button
            onClick={startTravel}
            className="w-full py-4 rounded-xl bg-lime-600 text-white font-semibold hover:bg-lime-700 transition-colors shadow-lg shadow-lime-500/30 flex items-center justify-center gap-2"
          >
            Launch Time Machine
          </button>
        </div>
      )}

      {isTravelling && (
        <div className="soft-card p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
           <div className="text-6xl mb-4 animate-bounce">⏳</div>
           <h3 className="text-2xl font-bold text-stone-800 mb-2">Travelling...</h3>
           <div className="text-4xl font-mono text-lime-600 font-bold tabular-nums">
             {formatDate(displayDate)}
           </div>
        </div>
      )}

      {showResult && (
        <div className="space-y-6 animate-slide-up">
           <div className="forest-card p-8 text-center">
              <div className="text-white/80 text-sm uppercase tracking-widest font-medium mb-4">Arrival Date</div>
              <div className="text-3xl font-bold text-white mb-2">{formatDate(targetDate)}</div>
              <div className="inline-block bg-white/20 rounded-full px-4 py-1 text-sm text-white backdrop-blur-sm">
                In {(weeksToGoal / 52).toFixed(1)} Years
              </div>
           </div>

           <div className="soft-card p-6 text-center">
             <div className="text-6xl mb-4 animate-pulse-soft">{goal.emoji}</div>
             <p className="text-stone-600">
               You finally have enough money to buy your <strong>{goal.name}</strong>!
             </p>
           </div>

           <div className="skill-check-box">
            <p>
              <span className="text-lg mr-2">📈</span>
              <span className="opacity-80">Skill check:</span> You just practiced <strong>Forecasting</strong> — visualizing a future outcome based on current actions.
            </p>
          </div>

           <button
            onClick={onNext}
            className="w-full py-4 rounded-xl bg-lime-600 text-white font-semibold hover:bg-lime-700 transition-colors flex items-center justify-center gap-2"
          >
            Check the Reality
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: REALITY CHECK
// ═══════════════════════════════════════════════════════════════

function Phase3RealityCheck({
  userLevel, goal, weeklySavings, setWeeklySavings, simulatedDate,
  onNext, onBack
}) {
   const weeksToGoal = Math.ceil(goal.cost / weeklySavings);
   const isLongWait = weeksToGoal > 104; // > 2 years

   // Animation for value change
   const [highlightSacrifice, setHighlightSacrifice] = useState(false);

   const handleSacrifice = () => {
      setWeeklySavings(prev => Math.min(prev + 5, 200));
      setHighlightSacrifice(true);
      setTimeout(() => setHighlightSacrifice(false), 500);
   };

   return (
     <div className="space-y-6 animate-fade-in">

       <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${
         isLongWait
           ? 'bg-amber-50 border-amber-200'
           : 'bg-emerald-50 border-emerald-200'
       }`}>
         <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
               isLongWait ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
               {isLongWait ? '⚠️' : '✅'}
            </div>
            <div>
               <h2 className={`text-xl font-bold ${isLongWait ? 'text-amber-800' : 'text-emerald-800'}`}>
                  {isLongWait ? 'Reality Check' : 'Green Light'}
               </h2>
               <p className={`text-sm ${isLongWait ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {isLongWait ? 'Warning: Risk of Failure' : 'Achievable Goal'}
               </p>
            </div>
         </div>

         <p className={`text-sm mb-4 ${isLongWait ? 'text-amber-800' : 'text-emerald-800'}`}>
            {isLongWait
               ? "That's a very long time to wait. Most people lose motivation after 2 years and give up. You might need to change something."
               : "Great! This timeline is under 2 years. It's realistic to stay motivated for this long."
            }
         </p>

         {/* If long wait, show adjustment controls directly here */}
         {isLongWait && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 mt-4">
               <h4 className="font-bold text-stone-700 text-sm mb-3">Fix your timeline:</h4>

               {/* VISUAL TIMELINE BAR */}
               <div className="mb-6 relative pt-4">
                  <div className="text-xs text-stone-400 absolute top-0 right-0">Goal: &lt; 104 Weeks</div>
                  <div className="h-4 bg-stone-100 rounded-full overflow-hidden w-full relative">
                     {/* The 2-year mark indicator */}
                     <div className="absolute top-0 bottom-0 w-0.5 bg-stone-300 z-10" style={{ left: '50%' }}></div>

                     {/* The Progress Bar */}
                     <div
                        className={`h-full transition-all duration-500 ${weeksToGoal > 104 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min((weeksToGoal / 208) * 100, 100)}%` }}
                     />
                  </div>
                  <div className="flex justify-between mt-1 text-xs font-medium">
                     <span className="text-emerald-600">Fast</span>
                     <span className="text-stone-400">2 Years (104 wks)</span>
                     <span className="text-amber-500">Slow</span>
                  </div>
               </div>

               {/* SACRIFICE COFFEE TOGGLE */}
               <button
                  onClick={handleSacrifice}
                  className="w-full mb-4 py-3 bg-stone-50 hover:bg-emerald-50 border-2 border-dashed border-stone-200 hover:border-emerald-300 rounded-xl flex items-center justify-between px-4 transition-all group"
               >
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        ☕
                     </div>
                     <div className="text-left">
                        <div className="font-bold text-stone-700 text-sm">Sacrifice a Coffee</div>
                        <div className="text-xs text-stone-500">Save +$5/week</div>
                     </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Plus className="w-5 h-5" />
                  </div>
               </button>

               {/* SLIDER */}
               <div className="mb-2">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                     <span>Current: <span className={highlightSacrifice ? 'text-emerald-600 font-bold' : ''}>${weeklySavings}/wk</span></span>
                     <span className={`transition-all duration-300 ${weeksToGoal <= 104 ? 'text-emerald-600 font-bold scale-110' : 'text-amber-500'}`}>
                        {weeksToGoal} Weeks
                     </span>
                  </div>
                  <input
                     type="range"
                     min={5}
                     max={200}
                     step={5}
                     value={weeklySavings}
                     onChange={(e) => setWeeklySavings(Number(e.target.value))}
                     className="w-full"
                  />
               </div>
            </div>
         )}
       </div>

       <div className="soft-card p-5">
         <h4 className="font-medium text-stone-800 mb-3">Goal Summary</h4>
         <div className="space-y-2 text-sm">
            <div className="flex justify-between">
               <span className="text-stone-500">Goal</span>
               <span className="font-medium text-stone-800">{goal.name} (${goal.cost})</span>
            </div>
            <div className="flex justify-between">
               <span className="text-stone-500">Weekly Savings</span>
               <span className="font-medium text-stone-800">${weeklySavings}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-100">
               <span className="text-stone-500">Total Time</span>
               <span className={`font-bold ${isLongWait ? 'text-amber-500' : 'text-emerald-600'}`}>
                  {weeksToGoal} Weeks
               </span>
            </div>
         </div>
       </div>

       <button
         onClick={onNext}
         disabled={isLongWait}
         className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
           isLongWait
             ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
             : 'bg-lime-600 text-white shadow-lg hover:bg-lime-700'
         }`}
       >
         {isLongWait ? 'Reduce timeline to continue' : 'Continue to Reflection'}
         {!isLongWait && <ChevronRight className="w-5 h-5" />}
       </button>
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
          <Brain className="w-12 h-12 rounded-xl bg-lime-100 p-3 text-lime-600" />
          <h2 className="text-xl font-bold text-stone-800">Final Thought</h2>
        </div>

        <p className="text-stone-600 mb-4 font-medium">
          Saving takes patience. What is one thing you can do to stop yourself from spending your savings before you reach your goal?
        </p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I could put the money in a bank account I can't touch..."
          className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-lime-500 focus:outline-none resize-none h-32 text-stone-800 transition-colors"
        />
      </div>

      <div className="soft-card p-5">
        <h4 className="font-medium text-stone-800 mb-4">Skills Added</h4>
        <div className="space-y-3">
          {SAVING_MODULE_SKILLS.map(skillId => (
            <div key={skillId}>
               <div className="flex justify-between text-sm mb-1">
                 <span className="flex items-center gap-2">
                   {SKILLS[skillId].icon} {SKILLS[skillId].name}
                 </span>
                 <span className="text-stone-400 text-xs">+{moduleSkillWeights[skillId]}</span>
               </div>
               <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-lime-500" style={{width: `${(moduleSkillWeights[skillId]/5)*100}%`}}></div>
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
            ? 'bg-lime-600 text-white shadow-lg hover:bg-lime-700'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Add to Kete Pūtea <span className="text-xl">🧺</span>
      </button>
    </div>
  );
}
