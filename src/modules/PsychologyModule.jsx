import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, Shield, Zap, Eye, ChevronRight, ChevronLeft,
  Heart, Target, Clock, AlertTriangle, Sparkles, Info, Check,
  X, Wallet, Scale, Search, BarChart3, LineChart, Lock,
  Unlock, Timer, TrendingUp, DollarSign, Filter, Gift,
  HelpCircle, MessageCircle
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - The Psychology of Money Module
// "Quiet Interface" Design System
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// SKILLS ENGINE
// ═══════════════════════════════════════════════════════════════

const SKILLS = {
  estimating: {
    id: 'estimating',
    name: 'Estimating',
    icon: '🎯',
    description: {
      '1-4': 'Guessing how much',
      '5-8': 'Making a reasonable guess',
      '9-10': 'Forming educated estimates',
      '11-13': 'Developing informed hypotheses'
    }
  },
  researching: {
    id: 'researching',
    name: 'Researching',
    icon: '🔍',
    description: {
      '1-4': 'Spotting the tricks',
      '5-8': 'Finding the marketing tricks',
      '9-10': 'Identifying persuasive techniques in ads',
      '11-13': 'Deconstructing marketing psychology'
    }
  },
  comparing: {
    id: 'comparing',
    name: 'Comparing',
    icon: '⚖️',
    description: {
      '1-4': 'Do I really need it?',
      '5-8': 'Checking wants vs needs',
      '9-10': 'Weighing up emotional vs real value',
      '11-13': 'Evaluating utility against psychological impulse'
    }
  },
  calculating: {
    id: 'calculating',
    name: 'Calculating',
    icon: '🧮',
    description: {
      '1-4': 'Counting the cost',
      '5-8': 'Working out the cost in work hours',
      '9-10': 'Calculating the "time cost" of purchases',
      '11-13': 'Quantifying opportunity cost and labour value'
    }
  },
  forecasting: {
    id: 'forecasting',
    name: 'Forecasting',
    icon: '📈',
    description: {
      '1-4': 'Stopping before you buy',
      '5-8': 'Thinking about if you\'ll use it later',
      '9-10': 'Predicting if you\'ll regret this purchase',
      '11-13': 'Modelling future utility and regret minimization'
    }
  },
  reflecting: {
    id: 'reflecting',
    name: 'Reflecting',
    icon: '🪞',
    description: {
      '1-4': 'Thinking about feelings',
      '5-8': 'Understanding why you buy things',
      '9-10': 'Recognising your own spending triggers',
      '11-13': 'Critically analysing internal biases'
    }
  }
};

const PSYCH_MODULE_SKILLS = ['reflecting', 'forecasting', 'researching', 'calculating', 'comparing', 'estimating'];

const PSYCH_SKILL_WEIGHTS = {
  reflecting: 3,    // Core: Knowing yourself
  forecasting: 3,   // Core: Predicting the trap
  researching: 2,   // Spotting the tactic
  calculating: 2,   // Time-cost math
  comparing: 1,     // Want vs Need
  estimating: 1     // Initial guess
};

// ═══════════════════════════════════════════════════════════════
// MODULE CONTENT DATA
// ═══════════════════════════════════════════════════════════════

// Quiz Questions to determine Archetype
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: {
      '1-4': "When do you want new toys?",
      '5-8': "What makes you want to buy something?",
      '9-10': "What's most likely to make you tap 'Buy Now'?",
      '11-13': "Identify your primary psychological purchase trigger:"
    },
    options: [
      { id: 'sale', text: "When it's super cheap!", type: 'bargain' },
      { id: 'cool', text: "When my friends have it.", type: 'social' },
      { id: 'happy', text: "When I'm bored or having a bad day.", type: 'emotional' },
      { id: 'best', text: "When it's the newest, best version.", type: 'quality' }
    ]
  },
  {
    id: 2,
    question: {
      '1-4': "What does the voice in your head say?",
      '5-8': "What do you tell yourself before buying?",
      '9-10': "What's your excuse for buying something you don't need?",
      '11-13': "Which rationalisation do you use most frequently?"
    },
    options: [
      { id: 'sale', text: "It's such a good deal, I'd be losing money not to!", type: 'bargain' },
      { id: 'cool', text: "Ideally, this will make me look cooler.", type: 'social' },
      { id: 'happy', text: "I deserve a treat today.", type: 'emotional' },
      { id: 'best', text: "It's an investment—it'll last forever.", type: 'quality' }
    ]
  },
  {
    id: 3,
    question: {
      '1-4': "Which sign do you look for?",
      '5-8': "Which sign grabs your attention?",
      '9-10': "Which marketing trick works best on you?",
      '11-13': "To which scarcity principle are you most susceptible?"
    },
    options: [
      { id: 'sale', text: "50% OFF - ENDS SOON!", type: 'bargain' },
      { id: 'cool', text: "TRENDING NOW 🔥", type: 'social' },
      { id: 'happy', text: "LIMITED EDITION ✨", type: 'emotional' },
      { id: 'best', text: "RATED #1 BY EXPERTS", type: 'quality' }
    ]
  }
];

// Archetypes
const ARCHETYPES = {
  bargain: {
    name: "The Deal Hunter",
    icon: "🏷️",
    desc: "You love a bargain. You hate paying full price.",
    trap: "You often buy things you don't need just because they were 'cheap'.",
    product: {
      name: "Ultra-Glow Headphones",
      image: "🎧",
      price: 199,
      salePrice: 89,
      triggers: ['scarcity', 'anchoring']
    }
  },
  social: {
    name: "The Trend Setter",
    icon: "😎",
    desc: "You like to fit in or stand out. You notice what others have.",
    trap: "You buy things to impress people who might not even care.",
    product: {
      name: "Viral Hype Sneakers",
      image: "👟",
      price: 250,
      salePrice: 250,
      triggers: ['social_proof', 'urgency']
    }
  },
  emotional: {
    name: "The Mood Shopper",
    icon: "🎭",
    desc: "You shop when you're happy, sad, or bored.",
    trap: "You use spending to fix your feelings, but the feeling doesn't last.",
    product: {
      name: "Mystery Box Surprise",
      image: "🎁",
      price: 50,
      salePrice: 45,
      triggers: ['variable_reward', 'urgency']
    }
  },
  quality: {
    name: "The Upgrader",
    icon: "⭐",
    desc: "You want the best. You research everything.",
    trap: "You overspend on features you'll never actually use.",
    product: {
      name: "Pro-Master Tech Watch",
      image: "⌚",
      price: 499,
      salePrice: 449,
      triggers: ['authority', 'framing']
    }
  }
};

// Psychological Triggers (The Enemies)
const TRIGGERS = {
  scarcity: {
    id: 'scarcity',
    name: 'Scarcity',
    clues: ['Only 2 left!', 'Low stock', 'Selling fast'],
    explanation: "Makes you panic that you'll miss out (FOMO)."
  },
  anchoring: {
    id: 'anchoring',
    name: 'Anchoring',
    clues: ['Was $199', '50% Off', 'Strike-through price'],
    explanation: "Shows a high price first so the real price looks cheap."
  },
  social_proof: {
    id: 'social_proof',
    name: 'Social Proof',
    clues: ['500 people bought this', 'Trending now', '⭐⭐⭐⭐⭐'],
    explanation: "Makes you think 'if everyone likes it, it must be good'."
  },
  urgency: {
    id: 'urgency',
    name: 'Urgency',
    clues: ['Sale ends in 05:00', 'Today only', 'Countdown timer'],
    explanation: "Rushes you so you don't have time to think."
  },
  authority: {
    id: 'authority',
    name: 'Authority',
    clues: ['Expert recommended', 'Pro Choice', 'Certified'],
    explanation: "Uses fancy words or experts so you trust them."
  },
  variable_reward: {
    id: 'variable_reward',
    name: 'Mystery/Reward',
    clues: ['Surprise inside', '1 in 10 chance', 'Unlock rare item'],
    explanation: "Excites your brain like a game of chance."
  },
  framing: {
    id: 'framing',
    name: 'Framing',
    clues: ['Best Value', 'Premium Choice', 'Investment'],
    explanation: "Makes the expensive option look like the smart option."
  }
};

// ═══════════════════════════════════════════════════════════════
// PSYCHOLOGY MODULE - REFACTORED
// ═══════════════════════════════════════════════════════════════

export default function PsychologyModule({ onBack, onComplete, userLevel = '9-10' }) {
  // Internal state for the module
  const [phase, setPhase] = useState(0);
  const [anchorGuess, setAnchorGuess] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [archetype, setArchetype] = useState(null);
  const [identifiedTriggers, setIdentifiedTriggers] = useState([]);
  const [adUnlocked, setAdUnlocked] = useState(false);

  // Ref for auto-scrolling
  const topRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { id: 0, icon: Target, name: 'Anchor' },
    { id: 1, icon: Brain, name: 'Mirror' },
    { id: 2, icon: Zap, name: 'Trap' },
    { id: 3, icon: Shield, name: 'Shield' },
    { id: 4, icon: Clock, name: 'Cost' },
    { id: 5, icon: LineChart, name: 'Review' }
  ];

  return (
    <div className="relative min-h-screen pb-24" ref={topRef}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg border-b border-stone-200/50">
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
              <Brain className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Psychology</span>
            </div>
            <div className="w-16" />
          </div>

          {/* Phase Indicator */}
          <div className="flex items-center justify-between mt-4 px-1">
            {phases.map((p, idx) => (
              <React.Fragment key={p.id}>
                <div className={`flex flex-col items-center transition-all duration-300 ${
                  phase >= p.id ? 'opacity-100' : 'opacity-40'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    phase === p.id
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-110'
                      : phase > p.id
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-stone-100 text-stone-400'
                  }`}>
                    {phase > p.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <p.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-[10px] mt-1 font-medium text-stone-600">{p.name}</span>
                </div>
                {idx < phases.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 rounded transition-colors duration-300 ${
                    phase > p.id ? 'bg-emerald-400' : 'bg-stone-200'
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
          <Phase1Quiz
            userLevel={userLevel}
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            setArchetype={setArchetype}
            onNext={() => setPhase(2)}
          />
        )}
        {phase === 2 && (
          <Phase2Trap
            userLevel={userLevel}
            archetype={archetype}
            onNext={() => setPhase(3)}
          />
        )}
        {phase === 3 && (
          <Phase3Shield
            userLevel={userLevel}
            archetype={archetype}
            identifiedTriggers={identifiedTriggers}
            setIdentifiedTriggers={setIdentifiedTriggers}
            adUnlocked={adUnlocked}
            setAdUnlocked={setAdUnlocked}
            onNext={() => setPhase(4)}
          />
        )}
        {phase === 4 && (
          <Phase4TrueCost
            userLevel={userLevel}
            archetype={archetype}
            onNext={() => setPhase(5)}
          />
        )}
        {phase === 5 && (
          <Phase5Review
            userLevel={userLevel}
            archetype={archetype}
            anchorGuess={anchorGuess}
            onComplete={onComplete}
          />
        )}
      </main>

      {/* STYLES (Copied from Design System) */}
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }

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

        /* Range Slider Styling */
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
          background: linear-gradient(145deg, #FF6F61, #E6635A);
          cursor: pointer;
          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
        }

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
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 0: ANCHOR (ESTIMATING)
// ═══════════════════════════════════════════════════════════════

function Phase0Anchor({ userLevel, anchorGuess, setAnchorGuess, onNext }) {
  const introText = {
    '1-4': "Ads are everywhere! Sometimes they make us want toys we don't really play with.",
    '5-8': "Did you know you see thousands of ads a day? They use clever tricks to make you spend money.",
    '9-10': "We are exposed to thousands of marketing messages daily. This module helps you spot the tricks shops use to make you spend.",
    '11-13': "Consumer psychology drives the economy. This module will help you audit your own decision-making."
  }[userLevel];

  const questionText = {
    '1-4': "How much money did you spend on things you forgot about?",
    '5-8': "Guess how much money you wasted last year on stuff you didn't need?",
    '9-10': "Estimate your 'Impulse Tax'—money wasted on unplanned buys last year:",
    '11-13': "Estimate your annual expenditure on discretionary impulse purchases:"
  }[userLevel];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-2xl shadow-sm text-teal-700">
            🧠
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-800">Psychology of Money</h2>
            <p className="text-sm text-stone-500">Why do we buy things we don't need?</p>
          </div>
        </div>

        <p className="text-stone-600 mb-6">{introText}</p>
      </div>

      <div className="soft-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🎯</span>
          <h3 className="font-semibold text-stone-800">First, a guess...</h3>
        </div>

        <p className="text-stone-600 mb-4">{questionText}</p>

        <div className="flex items-center gap-2 bg-stone-50 rounded-xl p-2">
          <span className="text-2xl font-semibold text-stone-400 pl-3">$</span>
          <input
            type="number"
            value={anchorGuess}
            onChange={(e) => setAnchorGuess(e.target.value)}
            className="flex-1 bg-transparent border-none text-2xl font-semibold"
            style={{background: 'transparent', border: 'none', boxShadow: 'none', padding: '12px 8px'}}
            placeholder="0"
          />
        </div>

        <button
          onClick={onNext}
          disabled={!anchorGuess}
          className={`w-full mt-4 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            anchorGuess
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          Lock in Estimate <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: THE MIRROR (QUIZ)
// ═══════════════════════════════════════════════════════════════

function Phase1Quiz({ userLevel, quizAnswers, setQuizAnswers, setArchetype, onNext }) {
  const [currentQ, setCurrentQ] = useState(0);

  const handleOptionSelect = (option) => {
    const newAnswers = { ...quizAnswers, [currentQ]: option.type };
    setQuizAnswers(newAnswers);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      // Calculate result
      const counts = Object.values(newAnswers).reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      const resultType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setArchetype(ARCHETYPES[resultType]);
      setTimeout(onNext, 500);
    }
  };

  const question = QUIZ_QUESTIONS[currentQ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
            🪞
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">The Mirror</h3>
            <p className="text-sm text-stone-500">
              {userLevel === '1-4' ? "What kind of shopper are you?" : "Let's identify your spender type."}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-stone-100 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{width: `${((currentQ + 1) / 3) * 100}%`}}></div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-medium text-white/90 px-2">{question.question[userLevel]}</h4>

        <div className="grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className="w-full text-left p-4 rounded-2xl bg-white shadow hover:shadow-md transition-all active:scale-[0.98]"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE TRAP (SIMULATION)
// ═══════════════════════════════════════════════════════════════

function Phase2Trap({ userLevel, archetype, onNext }) {
  const [showTrap, setShowTrap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTrap(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showTrap) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mb-6 animate-pulse">
          🤖
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Generating Ad...</h3>
        <p className="text-white/60">Creating the perfect trap for a <strong>{archetype.name}</strong>...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Archetype Reveal */}
      <div className="forest-card p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">
            {archetype.icon}
          </div>
          <div>
            <p className="text-white/60 text-sm uppercase tracking-wide">Your Spender Type</p>
            <h3 className="text-2xl font-bold text-white">{archetype.name}</h3>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed mb-4">{archetype.desc}</p>
        <div className="bg-rose-500/20 p-3 rounded-lg border border-rose-500/30 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-300 shrink-0" />
          <p className="text-sm text-rose-100"><strong>The Trap:</strong> {archetype.trap}</p>
        </div>
      </div>

      <p className="text-center text-sm text-white/60">
        This ad was made just for you...
      </p>

      {/* The Ad Card */}
      <div className="soft-card overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
        <div className="bg-stone-900 h-48 flex items-center justify-center relative">
          <span className="text-8xl">{archetype.product.image}</span>

          {/* Dynamic Badges based on Triggers */}
          {archetype.product.triggers.includes('scarcity') && (
            <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded shadow animate-pulse">
              ONLY 2 LEFT
            </div>
          )}
          {archetype.product.triggers.includes('social_proof') && (
            <div className="absolute bottom-3 left-3 bg-white/90 text-stone-900 text-xs font-bold px-2 py-1 rounded shadow flex items-center gap-1">
              🔥 1.2k views
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-stone-900">{archetype.product.name}</h3>
              <div className="flex text-amber-500 text-sm">★★★★★ <span className="text-stone-400 ml-1">(420)</span></div>
            </div>
            <div className="text-right">
              <span className="text-stone-400 line-through text-sm block">${archetype.product.price}</span>
              <span className="text-rose-600 font-bold text-2xl">${archetype.product.salePrice}</span>
            </div>
          </div>

          {archetype.product.triggers.includes('urgency') && (
            <p className="text-xs text-rose-600 font-bold mb-4 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Sale ends in 04:59
            </p>
          )}

          <button className="w-full py-3 bg-rose-600 text-white font-bold rounded-xl shadow-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
            BUY NOW <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">🪞</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Reflecting</strong> — seeing how an ad targets your personality.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
      >
        Wait! Let's take this apart <Brain className="w-5 h-5" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE SHIELD (DECONSTRUCTION)
// ═══════════════════════════════════════════════════════════════

function Phase3Shield({ userLevel, archetype, identifiedTriggers, setIdentifiedTriggers, adUnlocked, setAdUnlocked, onNext }) {
  const activeTriggers = archetype.product.triggers;
  const allFound = activeTriggers.every(t => identifiedTriggers.includes(t));

  const handleTriggerClick = (triggerId) => {
    if (identifiedTriggers.includes(triggerId)) return;

    if (activeTriggers.includes(triggerId)) {
      setIdentifiedTriggers([...identifiedTriggers, triggerId]);
      if (identifiedTriggers.length + 1 === activeTriggers.length) {
        setAdUnlocked(true);
      }
    } else {
      // Wrong trigger feedback could go here
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
            🛡️
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Activate your Shield</h3>
            <p className="text-sm text-stone-600">
              This ad uses <strong>{activeTriggers.length} tricks</strong> against you. Tap the buttons below to find them.
            </p>
          </div>
        </div>
      </div>

      {/* The Ad (Interactive) */}
      <div className={`soft-card overflow-hidden transition-all duration-500 ${adUnlocked ? 'grayscale opacity-70 scale-95' : 'ring-4 ring-rose-500/20'}`}>
        <div className="bg-stone-900 h-40 flex items-center justify-center relative">
          <span className="text-6xl">{archetype.product.image}</span>
          {adUnlocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white text-stone-900 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <Unlock className="w-4 h-4" /> SPELL BROKEN
              </div>
            </div>
          )}
        </div>
        <div className="p-4 relative">
          <h3 className="font-bold text-stone-900">{archetype.product.name}</h3>
          <p className="text-rose-600 font-bold text-xl mb-4">${archetype.product.salePrice}</p>

          {/* Trigger Overlay Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {Object.values(TRIGGERS).map((trigger) => {
              const isActive = identifiedTriggers.includes(trigger.id);

              return (
                <button
                  key={trigger.id}
                  onClick={() => handleTriggerClick(trigger.id)}
                  disabled={isActive || adUnlocked}
                  className={`text-xs p-2 rounded-lg border text-left transition-all ${
                    isActive
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="font-bold mb-1 flex justify-between">
                    {trigger.name}
                    {isActive && <Check className="w-3 h-3" />}
                  </div>
                  {isActive && <span className="text-[10px] leading-tight block">{trigger.explanation}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex justify-between items-center text-sm font-medium text-white/80">
        <span>Tricks found:</span>
        <span className={allFound ? "text-emerald-400" : "text-white"}>
          {identifiedTriggers.length} / {activeTriggers.length}
        </span>
      </div>

      {allFound && (
        <div className="animate-slide-up space-y-4">
          <div className="skill-check-box">
            <p>
              <span className="text-lg mr-2">🔍</span>
              <span className="opacity-80">Skill check:</span> You're practicing <strong>Researching</strong> — identifying the specific persuasion tactics used in ads.
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            See the True Cost <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 4: THE TRUE COST (CALCULATING)
// ═══════════════════════════════════════════════════════════════

function Phase4TrueCost({ userLevel, archetype, onNext }) {
  const wage = userLevel === '1-4' || userLevel === '5-8' ? 5 : 23.15; // Allowance vs Min Wage
  const wageLabel = userLevel === '1-4' || userLevel === '5-8' ? "chore money ($5/hr)" : "minimum wage ($23.15/hr)";

  const hoursNeeded = Math.ceil(archetype.product.salePrice / wage);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">⏳</div>
          <h3 className="font-semibold text-stone-800">The True Cost</h3>
        </div>
        <p className="text-stone-600 mb-6">
          The ad says <strong>${archetype.product.salePrice}</strong>. But let's see what that costs in <strong>work hours</strong>.
        </p>

        <div className="bg-stone-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm text-stone-500 mb-2">
            <span>Price tag</span>
            <span>Your rate ({wageLabel})</span>
          </div>
          <div className="flex justify-between items-end font-mono">
            <span className="text-2xl font-bold text-rose-600">${archetype.product.salePrice}</span>
            <span className="text-2xl text-stone-300">÷</span>
            <span className="text-xl text-stone-600">${wage}</span>
          </div>
        </div>

        <div className="text-center py-6 border-t-2 border-dashed border-stone-200">
          <p className="text-sm text-stone-500 mb-2">You would have to work</p>
          <div className="text-5xl font-bold text-stone-800 mb-2">{hoursNeeded}</div>
          <p className="text-lg font-medium text-emerald-600">Hours</p>
        </div>
      </div>

      <div className="forest-card p-5">
        <h4 className="font-semibold text-white mb-2">Think about it</h4>
        <p className="text-white/90 text-sm italic">
          "Is this {archetype.product.name} worth standing on your feet working for {hoursNeeded} hours?"
        </p>
      </div>

      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">🧮</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Calculating</strong> — translating money into work to see value differently.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
      >
        Final Review <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 5: REVIEW & REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase5Review({ userLevel, archetype, anchorGuess, onComplete }) {
  const [reflection, setReflection] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          🛡️
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Shield Activated!</h2>
        <p className="text-stone-600">
          You've analyzed your triggers and learned to spot the traps.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="soft-card p-4">
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Your Spender Type</p>
          <p className="font-bold text-emerald-700">{archetype.name}</p>
          <p className="text-xs text-stone-500 mt-1">{archetype.icon}</p>
        </div>
        <div className="soft-card p-4">
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Your Estimate</p>
          <p className="font-bold text-stone-700">${anchorGuess}</p>
          <p className="text-xs text-stone-500 mt-1">Impulse tax</p>
        </div>
      </div>

      <div className="soft-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-stone-800">One last thought...</h3>
        </div>

        <p className="text-sm text-stone-600 mb-3">
          {userLevel === '1-4'
            ? "Next time you want to buy something, what will you ask yourself?"
            : "Based on your Spender Type, what's one rule you can make to stop buying things you don't need?"}
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I will..."
          className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-24"
        />
      </div>

      <div className="soft-card p-5">
        <h4 className="font-medium text-stone-800 mb-4">Skills Added</h4>
        <div className="space-y-3">
          {PSYCH_MODULE_SKILLS.map(skillId => (
            <div key={skillId}>
               <div className="flex justify-between text-sm mb-1">
                 <span className="flex items-center gap-2">
                   {SKILLS[skillId].icon} {SKILLS[skillId].name}
                 </span>
                 <span className="text-stone-400 text-xs">+{PSYCH_SKILL_WEIGHTS[skillId]}</span>
               </div>
               <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500" style={{width: `${(PSYCH_SKILL_WEIGHTS[skillId]/3)*100}%`}}></div>
               </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onComplete(PSYCH_SKILL_WEIGHTS)}
        disabled={!reflection}
        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
          reflection
            ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Add to Kete Pūtea <span className="text-xl">🧺</span>
      </button>
    </div>
  );
}
