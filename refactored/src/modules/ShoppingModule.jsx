import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronLeft, Target, Check, Tag, MessageCircle, Scale, Brain,
  ShoppingBag
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MODULE SKILL WEIGHTING
// ═══════════════════════════════════════════════════════════════

const moduleSkillWeights = {
  estimating: 2,    // Guessing unit value
  calculating: 4,   // Unit pricing math
  comparing: 5,     // Comparing product value & approaches
  forecasting: 1,   // Long term value
  reflecting: 3     // Consumer rights reflection
};

const SKILLS = {
  estimating: {
    id: 'estimating',
    name: 'Estimating',
    icon: '🎯',
    description: {
      '1-4': 'Guessing the right amounts',
      '5-8': 'Estimating value before buying',
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
      '9-10': 'Calculating unit prices to find true value',
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
      '9-10': 'Analysing trade-offs in products',
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
      '9-10': 'Evaluating purchasing decisions',
      '11-13': 'Critically analysing financial behaviour'
    }
  }
};

const SHOPPING_MODULE_SKILLS = ['estimating', 'calculating', 'comparing', 'forecasting', 'reflecting'];

// ═══════════════════════════════════════════════════════════════
// DATA MODELS
// ═══════════════════════════════════════════════════════════════

const PRODUCTS = [
  {
    id: 'small',
    name: 'Snack Pack',
    weight: 100, // g
    price: 3.00,
    type: 'bag',
    emoji: '🍟',
    desc: 'Perfect for one person.'
  },
  {
    id: 'big',
    name: 'Party Bag',
    weight: 200, // g
    price: 5.00,
    type: 'bag',
    emoji: '🍟',
    desc: 'Good for sharing.'
  },
  {
    id: 'multi',
    name: 'Multi-Pack',
    weight: 120, // 6 x 20g
    price: 6.00,
    type: 'box',
    emoji: '📦',
    desc: '6 mini bags inside.'
  }
];

const COMPLAINT_OPTIONS = {
  problems: [
    { id: 'loose_button', text: "The volume button is a bit loose.", type: 'minor' },
    { id: 'dead', text: "It won't turn on at all.", type: 'major' },
    { id: 'mind', text: "I don't like the colour anymore.", type: 'none' }
  ],
  solutions: [
    { id: 'repair', text: "it to be fixed." },
    { id: 'refund', text: "a full refund." },
    { id: 'replace', text: "a brand new replacement." }
  ],
  tones: [
    { id: 'angry', text: "Angry / Threatening", label: "😠 I am furious!" },
    { id: 'sad', text: "Sad / Begging", label: "🥺 Please help me..." },
    { id: 'firm', text: "Firm / Assertive", label: "😐 I know my rights." }
  ]
};

const SHOP_RESPONSES = [
  {
    id: 1,
    manager: "Sorry, you didn't buy the extended warranty, so we can't help you.",
    options: [
      { id: 'give_up', text: "Oh, okay. I guess I should have bought it.", correct: false, feedback: "Don't give up! The CGA applies whether you buy a warranty or not." },
      { id: 'cga', text: "The Consumer Guarantees Act applies automatically.", correct: true, feedback: "Correct! The law protects you regardless of store warranties." },
      { id: 'yell', text: "I'm going to write a bad review!", correct: false, feedback: "Threats aren't as powerful as the law. Use the CGA argument." }
    ]
  },
  {
    id: 2,
    manager: "We don't do refunds, only store credit.",
    options: [
      { id: 'credit', text: "Fine, I'll take the credit.", correct: false, feedback: "If the product is faulty, you are entitled to a remedy (repair, replace, or refund), not just credit." },
      { id: 'law', text: "Actually, for a major fault, I can choose a refund.", correct: true, feedback: "Spot on! If it's a major failure, the choice of remedy is yours." },
      { id: 'beg', text: "Please, I really need the cash.", correct: false, feedback: "Don't beg. Demand your legal right." }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════
// MAIN SHOPPING MODULE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function ShoppingModule({ onBack, onComplete }) {
  // Internal state
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');

  // Shopping Specific State
  const [rightsGuess, setRightsGuess] = useState(50);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [revealedPrices, setRevealedPrices] = useState(false);
  const [complaint, setComplaint] = useState({ problem: '', solution: '', tone: '' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Intro', icon: Target },
    { num: 1, name: 'Value', icon: Tag },
    { num: 2, name: 'Builder', icon: MessageCircle },
    { num: 3, name: 'Rights', icon: Scale },
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
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Smart Shopping</span>
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
            rightsGuess={rightsGuess}
            setRightsGuess={setRightsGuess}
            onNext={() => setPhase(1)}
          />
        )}
        {phase === 1 && (
          <Phase1UnitPricing
            userLevel={userLevel}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            revealedPrices={revealedPrices}
            setRevealedPrices={setRevealedPrices}
            onNext={() => setPhase(2)}
            onBack={() => setPhase(0)}
          />
        )}
        {phase === 2 && (
          <Phase2ComplaintBuilder
            userLevel={userLevel}
            complaint={complaint}
            setComplaint={setComplaint}
            onNext={() => setPhase(3)}
            onBack={() => setPhase(1)}
          />
        )}
        {phase === 3 && (
          <Phase3RealityCheck
            userLevel={userLevel}
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

function Phase0Anchor({ userLevel, rightsGuess, setRightsGuess, onNext }) {
  const [showSkills, setShowSkills] = useState(false);
  const [locked, setLocked] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {!showSkills ? (
        // STEP 1: INTRO CARD
        <div className="soft-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-2xl shadow-sm text-rose-700">
              🛍️
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-800">Smart Shopping</h2>
              <p className="text-sm text-stone-500">Rights & Returns</p>
            </div>
          </div>
          <p className="text-stone-600 mb-6">
            You buy a phone with your savings. 3 weeks later, it stops working. The shop says "No refunds." What do you do?
          </p>
          <button
            onClick={() => setShowSkills(true)}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
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
              <Target className="w-5 h-5 text-emerald-600" />
              Skills you'll practice
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SHOPPING_MODULE_SKILLS.map((skillId) => {
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
            <h3 className="font-semibold text-stone-800 mb-4">How hard would you fight?</h3>

            <div className="flex justify-between items-end mb-4 h-20 px-2">
              <div className={`text-center transition-opacity duration-300 ${rightsGuess < 40 ? 'opacity-100' : 'opacity-30'}`}>
                <span className="text-3xl block mb-2">🤷‍♂️</span>
                <span className="text-xs font-bold text-stone-600">Give Up</span>
              </div>
              <div className={`text-center transition-opacity duration-300 ${rightsGuess > 60 ? 'opacity-100' : 'opacity-30'}`}>
                <span className="text-3xl block mb-2">😤</span>
                <span className="text-xs font-bold text-stone-600">Demand Rights</span>
              </div>
            </div>

            <div className="relative mb-8">
              <input
                type="range"
                min={0}
                max={100}
                step="5"
                value={rightsGuess}
                onChange={(e) => setRightsGuess(Number(e.target.value))}
                className="w-full"
              />
              <div className="absolute top-6 left-0 right-0 text-center">
                 <span className="text-2xl font-bold text-emerald-600">{rightsGuess}%</span>
              </div>
            </div>

            <button
              onClick={() => setLocked(true)}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              Lock in Answer <Check className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        // STEP 4: REVEAL
        <div className="soft-card p-6 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4">
              ⚖️
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">
              Actually, the law is on your side.
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm">
              In New Zealand, the <strong>Consumer Guarantees Act (CGA)</strong> says products must last for a "reasonable time". 3 weeks for a phone is NOT reasonable.
            </p>
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 text-sm font-medium">
               They MUST fix it, replace it, or refund it.
            </div>
          </div>

          <div className="skill-check-box mb-6">
            <p>
              <span className="text-lg mr-2">🪞</span>
              <span className="opacity-80">Skill check:</span> You just practiced <strong>Reflecting</strong> on your own confidence.
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Become a Detective
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: UNIT PRICING
// ═══════════════════════════════════════════════════════════════

function Phase1UnitPricing({
  userLevel, selectedProduct, setSelectedProduct,
  revealedPrices, setRevealedPrices,
  onNext, onBack
}) {

  const calculateUnitCost = (price, weight) => {
    return (price / weight) * 100; // Price per 100g
  };

  const handleReveal = () => {
    setRevealedPrices(true);
  };

  const bestValueId = 'big';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl text-amber-600">
            🕵️‍♀️
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Supermarket Detective</h3>
            <p className="text-sm text-stone-500">Which option is actually cheaper?</p>
          </div>
        </div>

        <p className="text-stone-600 mb-6 text-sm">
          Don't just look at the price tag. Look at how much you get. Tap a product to choose the <strong>Best Value</strong>.
        </p>

        {/* Products Grid */}
        <div className="space-y-3">
          {PRODUCTS.map(product => {
            const unitPrice = calculateUnitCost(product.price, product.weight);
            const isSelected = selectedProduct === product.id;
            const isBestValue = product.id === 'big';

            return (
               <button
                  key={product.id}
                  onClick={() => { setSelectedProduct(product.id); setRevealedPrices(true); }}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 border-2 transition-all ${
                     isSelected
                      ? isBestValue
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-rose-50 border-rose-500'
                      : 'bg-white border-stone-100 hover:border-stone-300'
                  }`}
               >
                  <div className="text-4xl">{product.emoji}</div>
                  <div className="flex-1 text-left">
                     <div className="font-bold text-stone-800">{product.name}</div>
                     <div className="text-xs text-stone-500">{product.desc}</div>
                     <div className="mt-1 inline-block bg-stone-100 px-2 py-0.5 rounded text-xs font-medium text-stone-600">
                        {product.weight}g
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-xl font-bold text-stone-800">${product.price.toFixed(2)}</div>

                     {revealedPrices && (
                       <div className={`text-xs font-bold mt-1 px-2 py-1 rounded animate-fade-in ${
                         isBestValue ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'
                       }`}>
                         ${unitPrice.toFixed(2)} / 100g
                       </div>
                     )}
                  </div>
               </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        {revealedPrices && selectedProduct && (
           <div className={`mt-6 p-4 rounded-xl animate-slide-up ${
              selectedProduct === 'big'
                ? 'bg-emerald-100 border border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
           }`}>
              <div className="flex gap-2">
                 <span className="text-xl">{selectedProduct === 'big' ? '🎉' : '👀'}</span>
                 <div>
                    <h4 className="font-bold text-sm mb-1">{selectedProduct === 'big' ? 'Correct!' : 'Look closer...'}</h4>
                    <p className="text-sm opacity-90">
                       {selectedProduct === 'big'
                         ? "The Big Bag is only $2.50 per 100g. That's the best value!"
                         : selectedProduct === 'multi'
                           ? "Convenience costs money! The Multi-pack is $5.00 per 100g. That's double the price of the big bag!"
                           : "The Small Bag is $3.00 per 100g. Cheaper than the multi-pack, but more than the big bag."
                       }
                    </p>
                 </div>
              </div>
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
          disabled={!revealedPrices}
          className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
             revealedPrices
               ? 'bg-emerald-600 text-white hover:bg-emerald-700'
               : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          Draft Complaint
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: COMPLAINT BUILDER
// ═══════════════════════════════════════════════════════════════

function Phase2ComplaintBuilder({
  userLevel, complaint, setComplaint,
  onNext, onBack
}) {
  const [advice, setAdvice] = useState(null);

  // Check valid state
  const isComplete = complaint.problem && complaint.solution && complaint.tone;
  const isAngry = complaint.tone === 'angry';
  const isSad = complaint.tone === 'sad';

  useEffect(() => {
    setAdvice(null);

    if (isAngry) {
      setAdvice({ type: 'tone', msg: "Wait! Being rude hurts your case. Shop staff are people too. Try being 'Firm' instead.", color: 'rose', title: "Don't get mad" });
      return;
    }
    if (isSad) {
      setAdvice({ type: 'tone', msg: "You don't need to ask for a favour. The law protects you. Try being 'Firm' instead.", color: 'amber', title: "Don't beg" });
      return;
    }

    if (complaint.problem && complaint.solution) {
      const problemType = COMPLAINT_OPTIONS.problems.find(p => p.id === complaint.problem)?.type;

      if (problemType === 'minor' && complaint.solution === 'refund') {
        setAdvice({
          type: 'logic',
          msg: "For minor faults, the retailer gets to choose the remedy. They will likely offer a repair, not a refund.",
          color: 'blue',
          title: "Know Your Rights"
        });
        return;
      }

      if (problemType === 'none') {
        setAdvice({
          type: 'logic',
          msg: "The Consumer Guarantees Act does not cover 'Change of Mind'. The shop doesn't have to help you.",
          color: 'stone',
          title: "Not Covered"
        });
        return;
      }
    }

  }, [complaint]);

  const canProceed = isComplete && !isAngry && !isSad && (!advice || advice.type !== 'logic');

  return (
    <div className="space-y-6 animate-fade-in">

      <div className="soft-card p-6">
         <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl text-blue-600">
               📝
            </div>
            <div>
               <h3 className="font-semibold text-stone-800">Complaint Builder</h3>
               <p className="text-sm text-stone-500">Your headphones broke. Write an email.</p>
            </div>
         </div>

         <div className="bg-stone-50 border-2 border-stone-200 rounded-xl p-4 space-y-4">
            <p className="text-stone-400 text-xs uppercase font-bold tracking-wider">To: Manager@TechShop.co.nz</p>

            <div>
               <p className="text-stone-800 text-sm mb-2 font-medium">I bought headphones and...</p>
               <select
                  value={complaint.problem}
                  onChange={(e) => setComplaint({...complaint, problem: e.target.value})}
                  className="w-full p-3 bg-white border border-stone-300 rounded-lg text-sm text-stone-700 focus:border-emerald-500 outline-none"
               >
                  <option value="" disabled>Select the problem...</option>
                  {COMPLAINT_OPTIONS.problems.map(o => (
                     <option key={o.id} value={o.id}>{o.text}</option>
                  ))}
               </select>
            </div>

            <div>
               <p className="text-stone-800 text-sm mb-2 font-medium">Under the CGA, I would like...</p>
               <select
                  value={complaint.solution}
                  onChange={(e) => setComplaint({...complaint, solution: e.target.value})}
                  className="w-full p-3 bg-white border border-stone-300 rounded-lg text-sm text-stone-700 focus:border-emerald-500 outline-none"
               >
                  <option value="" disabled>Select solution...</option>
                  {COMPLAINT_OPTIONS.solutions.map(o => (
                     <option key={o.id} value={o.id}>{o.text}</option>
                  ))}
               </select>
            </div>

            <div>
               <p className="text-stone-800 text-sm mb-2 font-medium">Tone of voice:</p>
               <select
                  value={complaint.tone}
                  onChange={(e) => setComplaint({...complaint, tone: e.target.value})}
                  className="w-full p-3 bg-white border border-stone-300 rounded-lg text-sm text-stone-700 focus:border-emerald-500 outline-none"
               >
                  <option value="" disabled>Select tone...</option>
                  {COMPLAINT_OPTIONS.tones.map(o => (
                     <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
               </select>
            </div>

            <p className="text-stone-800 text-sm pt-2">Regards, <br/>A Customer</p>
         </div>
      </div>

      {/* Tone/Logic Advice Card */}
      {advice && (
         <div className={`p-5 rounded-2xl animate-slide-up bg-${advice.color}-500 shadow-lg`}>
            <div className="flex items-start gap-3">
               <span className="text-2xl">{advice.type === 'tone' ? '🛑' : '⚖️'}</span>
               <div>
                  <h4 className="font-bold text-white mb-1">
                     {advice.title}
                  </h4>
                  <p className="text-sm text-white/90">
                     {advice.msg}
                  </p>
               </div>
            </div>
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
          disabled={!canProceed}
          className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
             canProceed
               ? 'bg-emerald-600 text-white hover:bg-emerald-700'
               : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          Send Email
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: REALITY CHECK
// ═══════════════════════════════════════════════════════════════

function Phase3RealityCheck({ userLevel, onNext, onBack }) {
   const [scenarioIndex, setScenarioIndex] = useState(0);
   const [selectedOption, setSelectedOption] = useState(null);
   const [isCorrect, setIsCorrect] = useState(null);
   const [feedback, setFeedback] = useState(null);

   const currentScenario = SHOP_RESPONSES[scenarioIndex];

   const handleOptionClick = (option) => {
     setSelectedOption(option.id);
     setIsCorrect(option.correct);
     setFeedback(option.feedback);
   };

   const handleNextScenario = () => {
     if (scenarioIndex < SHOP_RESPONSES.length - 1) {
       setScenarioIndex(prev => prev + 1);
       setSelectedOption(null);
       setIsCorrect(null);
       setFeedback(null);
     } else {
       onNext();
     }
   };

   return (
     <div className="space-y-6 animate-fade-in">

       <div className="bg-stone-100 p-2 rounded-xl text-center text-xs font-bold text-stone-500 uppercase tracking-wider">
         Scenario {scenarioIndex + 1} of {SHOP_RESPONSES.length}
       </div>

       <div className="relative">
          {/* Shop Manager Bubble */}
          <div className="bg-stone-800 text-white p-5 rounded-2xl rounded-tl-none shadow-lg mb-6 relative">
             <div className="absolute -top-3 -left-2 text-4xl">👨‍💼</div>
             <p className="font-medium text-lg leading-snug">"{currentScenario.manager}"</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
             {currentScenario.options.map(option => {
                const isSelected = selectedOption === option.id;

                return (
                   <button
                     key={option.id}
                     onClick={() => !selectedOption && handleOptionClick(option)}
                     disabled={!!selectedOption}
                     className={`w-full p-4 rounded-xl text-left border-2 transition-all ${
                        isSelected
                          ? isCorrect
                             ? 'bg-emerald-50 border-emerald-500'
                             : 'bg-rose-50 border-rose-500'
                          : !!selectedOption
                             ? 'bg-stone-50 border-stone-100 opacity-50'
                             : 'bg-white border-stone-200 hover:border-emerald-300 hover:shadow-md'
                     }`}
                   >
                      <div className="font-medium text-stone-800">{option.text}</div>
                   </button>
                );
             })}
          </div>

          {/* Feedback & Continue */}
          {selectedOption && (
             <div className="mt-6 animate-slide-up">
                <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                   <div className="flex gap-2">
                      <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                      <div>
                         <p className="font-bold text-sm">{isCorrect ? 'Correct!' : 'Try again...'}</p>
                         <p className="text-sm opacity-90">{feedback}</p>
                      </div>
                   </div>
                </div>

                {isCorrect ? (
                   <button
                      onClick={handleNextScenario}
                      className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                   >
                      {scenarioIndex < SHOP_RESPONSES.length - 1 ? "Next Challenge" : "Finish"}
                      <ChevronRight className="w-5 h-5" />
                   </button>
                ) : (
                   <button
                      onClick={() => { setSelectedOption(null); setIsCorrect(null); setFeedback(null); }}
                      className="w-full py-3 rounded-xl bg-stone-200 text-stone-700 font-medium hover:bg-stone-300"
                   >
                      Try Again
                   </button>
                )}
             </div>
          )}
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
          <Brain className="w-12 h-12 rounded-xl bg-emerald-100 p-3 text-emerald-600" />
          <h2 className="text-xl font-bold text-stone-800">Final Thought</h2>
        </div>

        <p className="text-stone-600 mb-4 font-medium">
          Many people are too scared to complain when things break. How does knowing your rights change how you might shop in the future?
        </p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I realized that I don't need to buy extra warranties..."
          className="w-full p-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-32 text-stone-800 transition-colors"
        />
      </div>

      <div className="soft-card p-5">
        <h4 className="font-medium text-stone-800 mb-4">Skills Added</h4>
        <div className="space-y-3">
          {SHOPPING_MODULE_SKILLS.map(skillId => (
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
