import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase, ChevronRight, ChevronLeft,
  Check, X, Wallet, Clock, Scale, Target,
  BarChart3, LineChart, MessageCircle, HelpCircle,
  DollarSign, FileText,
  AlertCircle, Timer, XCircle, CheckCircle2, Brain
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// JOB SIMULATOR MODULE - Standalone Child Component
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
      '1-4': 'Having a go at guessing',
      '5-8': 'Making a reasonable guess before you have all the facts',
      '9-10': 'Forming educated estimates based on limited information',
      '11-13': 'Developing informed hypotheses prior to detailed analysis'
    }
  },
  researching: {
    id: 'researching',
    name: 'Researching',
    icon: '🔍',
    description: {
      '1-4': 'Finding things out',
      '5-8': 'Finding reliable information to help you decide',
      '9-10': 'Locating and evaluating sources of information',
      '11-13': 'Critically assessing information quality and relevance'
    }
  },
  comparing: {
    id: 'comparing',
    name: 'Comparing',
    icon: '⚖️',
    description: {
      '1-4': 'Looking at what\'s different',
      '5-8': 'Weighing up your options before choosing',
      '9-10': 'Analysing trade-offs between alternatives',
      '11-13': 'Evaluating opportunity costs and relative value'
    }
  },
  calculating: {
    id: 'calculating',
    name: 'Calculating',
    icon: '🧮',
    description: {
      '1-4': 'Adding up the numbers',
      '5-8': 'Working out totals and checking they\'re right',
      '9-10': 'Computing costs accurately across time periods',
      '11-13': 'Applying mathematical models to financial scenarios'
    }
  },
  forecasting: {
    id: 'forecasting',
    name: 'Forecasting',
    icon: '📈',
    description: {
      '1-4': 'Thinking about what might happen',
      '5-8': 'Thinking ahead about future costs and surprises',
      '9-10': 'Projecting future financial outcomes and risks',
      '11-13': 'Modelling probabilistic scenarios and long-term implications'
    }
  },
  reflecting: {
    id: 'reflecting',
    name: 'Reflecting',
    icon: '🪞',
    description: {
      '1-4': 'Thinking about what you learned',
      '5-8': 'Looking back at your choices and what you\'d do differently',
      '9-10': 'Evaluating decisions and identifying improvements',
      '11-13': 'Critically analysing decision-making processes and outcomes'
    }
  }
};

const JOB_SIM_SKILLS = ['estimating', 'calculating', 'reflecting', 'forecasting'];

const moduleSkillWeights = {
  estimating: 1,
  calculating: 3,
  reflecting: 3,
  forecasting: 2
};

// ═══════════════════════════════════════════════════════════════
// MAIN MODULE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function JobSimulatorModule({ onBack, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');

  // Job Simulator State
  const [initialGuess, setInitialGuess] = useState(null);
  const [batchId] = useState(`NZ${Math.floor(1000 + Math.random() * 9000)}`);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [invoiceData, setInvoiceData] = useState({ id: '', count: '', rate: 4.50, total: '' });
  const [invoiceStatus, setInvoiceStatus] = useState(null); // 'approved' | 'rejected'
  const [reflection, setReflection] = useState('');

  // Timer for the work phase
  const [workTime, setWorkTime] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  // Scroll to top when phase changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Intro', icon: Target },
    { num: 1, name: 'Work', icon: Briefcase },
    { num: 2, name: 'Invoice', icon: FileText },
    { num: 3, name: 'Result', icon: DollarSign },
    { num: 4, name: 'Review', icon: Brain }
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
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-stone-800">Job Simulator</span>
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
          <Phase0Intro
            userLevel={userLevel}
            initialGuess={initialGuess}
            setInitialGuess={setInitialGuess}
            onNext={() => setPhase(1)}
          />
        )}
        {phase === 1 && (
          <Phase1TheHustle
            batchId={batchId}
            tasksCompleted={tasksCompleted}
            setTasksCompleted={setTasksCompleted}
            workTime={workTime}
            setWorkTime={setWorkTime}
            isWorking={isWorking}
            setIsWorking={setIsWorking}
            onComplete={() => setPhase(2)}
          />
        )}
        {phase === 2 && (
          <Phase2TheInvoice
            userLevel={userLevel}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            onNext={(status) => {
              setInvoiceStatus(status);
              setPhase(3);
            }}
            realBatchId={batchId}
            realCount={tasksCompleted}
          />
        )}
        {phase === 3 && (
          <Phase3TheConsequence
            invoiceStatus={invoiceStatus}
            tasksCompleted={tasksCompleted}
            rate={invoiceData.rate}
            userTotal={parseFloat(invoiceData.total)}
            onNext={() => setPhase(4)}
          />
        )}
        {phase === 4 && (
          <Phase4Reflection
            userLevel={userLevel}
            initialGuess={initialGuess}
            workTime={workTime}
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }

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
          background: linear-gradient(145deg, #FF6F61, #E6635A);
          cursor: pointer;
          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
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
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

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
// PHASE 0: INTRO & ANCHOR
// ═══════════════════════════════════════════════════════════════

function Phase0Intro({ userLevel, initialGuess, setInitialGuess, onNext }) {
  const [localGuess, setLocalGuess] = useState(10);
  const [showSkills, setShowSkills] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {!showSkills ? (
        <div className="soft-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-2xl shadow-lg">
              💼
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-800">Job Simulator</h2>
              <p className="text-sm text-stone-500">The Gig Economy</p>
            </div>
          </div>

          <p className="text-stone-600 mb-6">
            Being your own boss sounds great until you realize you're also the admin, the accountant, and the debt collector.
            <br/><br/>
            In this simulation, you'll feel what it's really like to work for yourself.
          </p>

          <button
            onClick={() => setShowSkills(true)}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Start briefing
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : !initialGuess ? (
        <>
          <div className="soft-card p-6">
            <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              The Anchor Question
            </h3>

            <p className="text-stone-600 mb-6">
              Contractors don't get paid for "Unpaid Admin"—invoicing, fixing errors, chasing payments.
              <br/><br/>
              <strong>What % of a gig worker's time do you think is unpaid admin?</strong>
            </p>

            <div className="flex flex-col items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-emerald-600">{localGuess}%</span>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={localGuess}
                onChange={(e) => setLocalGuess(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between w-full text-xs text-stone-400">
                <span>0% (Perfect)</span>
                <span>50% (Half your life)</span>
              </div>
            </div>

            <button
              onClick={() => setInitialGuess(localGuess)}
              className="w-full mt-4 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Lock in my guess
              <Check className="w-5 h-5" />
            </button>
          </div>

          {/* Skill Check */}
          <div className="skill-check-box animate-fade-in">
            <p>
              <span className="text-lg mr-2">🎯</span>
              <span className="opacity-80">Skill check:</span> You're practicing <strong>Estimating</strong> — making a guess about hidden costs.
            </p>
          </div>
        </>
      ) : (
        <div className="soft-card p-6 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Estimate locked!</h3>
            <p className="text-3xl font-bold text-emerald-600">{initialGuess}%</p>
            <p className="text-sm text-stone-500 mt-2">unpaid time</p>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Start the job
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 1: THE HUSTLE (Minigame)
// ═══════════════════════════════════════════════════════════════

function Phase1TheHustle({ batchId, tasksCompleted, setTasksCompleted, workTime, setWorkTime, isWorking, setIsWorking, onComplete }) {

  // Timer effect
  useEffect(() => {
    let interval;
    if (isWorking) {
      interval = setInterval(() => {
        setWorkTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorking]);

  const handleTaskClick = () => {
    if (!isWorking) setIsWorking(true);
    const newCount = tasksCompleted + 1;
    setTasksCompleted(newCount);

    if (newCount >= 10) {
      setIsWorking(false);
      setTimeout(onComplete, 800);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Batch Header */}
      <div className="soft-card p-4 flex flex-col items-center">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Current Batch ID</h2>
        <div className="bg-stone-100 text-stone-800 font-mono text-3xl px-6 py-3 rounded-xl border border-stone-200 mb-2">
          {batchId}
        </div>
        <p className="text-xs text-rose-500 font-medium flex items-center gap-1 animate-pulse">
          <AlertCircle size={12} />
          MEMORIZE THIS ID
        </p>
      </div>

      <div className="soft-card p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="flex justify-between w-full mb-8 text-stone-500 text-sm font-medium">
          <span className="flex items-center gap-1"><Timer size={16}/> {workTime}s</span>
          <span className="flex items-center gap-1"><FileText size={16}/> {tasksCompleted}/10</span>
        </div>

        <button
          onClick={handleTaskClick}
          className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-xl shadow-xl active:scale-95 transition-transform flex flex-col items-center justify-center gap-2 border-4 border-white ring-4 ring-indigo-100"
        >
          <span>Tap to Process</span>
          <span className="text-sm font-normal opacity-80">Task #{tasksCompleted + 1}</span>
        </button>

        <p className="text-stone-400 text-sm mt-8">
          Rate: $4.50 per task
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE INVOICE (Friction)
// ═══════════════════════════════════════════════════════════════

function Phase2TheInvoice({ userLevel, invoiceData, setInvoiceData, onNext, realBatchId, realCount }) {

  const handleSubmit = () => {
    // Determine status
    const userBatch = invoiceData.id.trim().toUpperCase();
    const userCount = parseInt(invoiceData.count);
    const userTotal = parseFloat(invoiceData.total);
    const correctTotal = realCount * invoiceData.rate;

    let status = 'approved';

    // Logic: If batch ID wrong OR count wrong OR total calculation wrong (>10c)
    if (userBatch !== realBatchId) status = 'rejected';
    else if (userCount !== realCount) status = 'rejected';
    else if (Math.abs(userTotal - correctTotal) > 0.1) status = 'rejected';

    onNext(status);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-5 border-l-4 border-emerald-500">
        <h3 className="font-semibold text-stone-800 mb-1">Submit Invoice</h3>
        <p className="text-sm text-stone-500">
          The work is done. Now you have to bill for it.
          <br/>
          <span className="text-rose-500 font-medium">Warning: Mistakes mean you don't get paid.</span>
        </p>
      </div>

      <div className="space-y-4">
        {/* Field 1: Batch ID */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">Batch ID</label>
          <input
            type="text"
            placeholder="e.g. NZ0000"
            className="w-full font-mono uppercase"
            value={invoiceData.id}
            onChange={(e) => setInvoiceData({...invoiceData, id: e.target.value})}
          />
        </div>

        {/* Field 2: Count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">Tasks Done</label>
            <input
              type="number"
              placeholder="0"
              value={invoiceData.count}
              onChange={(e) => setInvoiceData({...invoiceData, count: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">Rate</label>
            <div className="w-full p-4 bg-stone-100 border-2 border-transparent rounded-xl font-bold text-stone-500 flex justify-between items-center h-[58px]">
              <span>${invoiceData.rate.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Field 3: Total */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">Total Amount</label>
          <div className="flex items-center gap-2 bg-white border-2 border-stone-200 rounded-xl p-0 overflow-hidden focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
            <span className="text-xl font-bold text-stone-400 pl-4">$</span>
            <input
              type="number"
              placeholder="0.00"
              className="flex-1 bg-transparent border-none text-xl font-bold text-stone-800 p-4 pl-1 focus:ring-0 focus:border-none focus:outline-none"
              style={{boxShadow: 'none'}}
              value={invoiceData.total}
              onChange={(e) => setInvoiceData({...invoiceData, total: e.target.value})}
            />
          </div>
          <p className="text-xs text-stone-400 mt-2 text-right">
            *You are responsible for calculation accuracy.
          </p>
        </div>
      </div>

      {/* Skill Check */}
      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">🧮</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Calculating</strong> — doing the admin math manually.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Send Invoice
        <FileText className="w-5 h-5" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: THE CONSEQUENCE
// ═══════════════════════════════════════════════════════════════

function Phase3TheConsequence({ invoiceStatus, tasksCompleted, rate, userTotal, onNext }) {
  const isApproved = invoiceStatus === 'approved';
  const actualPay = isApproved ? tasksCompleted * rate : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`soft-card p-6 text-center border-2 ${isApproved ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 ${isApproved ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {isApproved ? <CheckCircle2 size={40}/> : <XCircle size={40}/>}
        </div>

        <h4 className={`text-xl font-semibold mb-2 ${isApproved ? 'text-emerald-800' : 'text-rose-800'}`}>
          {isApproved ? 'Invoice Approved' : 'Invoice Rejected'}
        </h4>

        <p className="text-stone-600 mb-6">
          {isApproved
            ? "Your admin was perfect. Payment has been released."
            : "Details didn't match our records. In the real world, this means weeks of delays or no pay at all."}
        </p>

        <div className="text-3xl font-bold text-stone-800">
          ${actualPay.toFixed(2)}
        </div>
        <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Money in your pocket</p>
      </div>

      <div className="forest-card p-5">
        <h4 className="font-semibold text-white mb-3">Admin Reality</h4>
        <p className="text-white/90 text-sm">
          You did the work (clicking buttons), but the <strong>value</strong> was locked behind the admin (the invoice).
          <br/><br/>
          If the admin fails, the work counts for nothing.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Analyze efficiency
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 4: REFLECTION
// ═══════════════════════════════════════════════════════════════

function Phase4Reflection({ userLevel, initialGuess, workTime, reflection, setReflection, onComplete }) {
  const adminTime = 30; // Assumed admin time
  const totalTime = workTime + adminTime;
  const adminPercent = Math.round((adminTime / totalTime) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-5">
        <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-600" />
          The Breakdown
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-stone-50 rounded-xl">
            <p className="text-sm text-stone-500 mb-1">You guessed</p>
            <p className="text-2xl font-bold text-stone-600">{initialGuess}%</p>
            <p className="text-xs text-stone-400">admin time</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <p className="text-sm text-emerald-600 mb-1">Actual</p>
            <p className="text-2xl font-bold text-emerald-700">{adminPercent}%</p>
            <p className="text-xs text-emerald-500">admin time</p>
          </div>
        </div>

        <p className="text-sm text-stone-600">
          You spent {workTime}s working and about {adminTime}s on the invoice.
          That means <strong>{adminPercent}%</strong> of your time was unpaid admin friction.
        </p>
      </div>

      <div className="soft-card p-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          How does knowing about "unpaid admin" change how you view a high hourly rate for contractors?
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I think..."
          className="w-full p-3 border-2 border-stone-200 rounded-xl text-stone-700 resize-none focus:border-emerald-500 focus:outline-none"
          rows={3}
        />
      </div>

      {/* Skill check */}
      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">🪞</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Reflecting</strong> — connecting the simulation to real world value.
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
          You've earned new skills in Estimating, Calculating, and Reflecting.
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
