import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, ChevronLeft,
  Shield, Lock, Brain, FileText, Eye,
  AlertTriangle, Check,
  ShieldAlert, ShieldCheck,
  Clapperboard, Music, Search, Smartphone, Wallet, Landmark, Camera, Package,
  AlertCircle, XCircle, CheckCircle2, Ghost, Zap
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// PRIVACY DEFENDER MODULE - Standalone Child Component
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// SKILLS ENGINE
// ═══════════════════════════════════════════════════════════════

const SKILLS = {
  tracking: { id: 'tracking', name: 'Tracking', icon: '👀', description: 'Knowing exactly where your money is going' },
  managing: { id: 'managing', name: 'Managing', icon: '🕹️', description: 'Taking action to keep things under control' },
  estimating: { id: 'estimating', name: 'Estimating', icon: '🎯', description: 'Making a reasonable guess before you have all the facts' },
  comparing: { id: 'comparing', name: 'Comparing', icon: '⚖️', description: 'Weighing up your options before choosing' },
  calculating: { id: 'calculating', name: 'Calculating', icon: '🧮', description: 'Working out totals and checking they\'re right' },
  forecasting: { id: 'forecasting', name: 'Forecasting', icon: '📈', description: 'Thinking ahead about future costs and surprises' },
  reflecting: { id: 'reflecting', name: 'Reflecting', icon: '🪞', description: 'Looking back at your choices and what you\'d do differently' },
  protecting: { id: 'protecting', name: 'Protecting', icon: '🛡️', description: 'Guarding your personal data and wealth' }
};

// Module Skill Weights
const moduleSkillWeights = {
  protecting: 3,
  tracking: 1
};

// ═══════════════════════════════════════════════════════════════
// MAIN MODULE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function PrivacyDefenderModule({ onBack, onComplete }) {
  // Internal state
  const [phase, setPhase] = useState(0);
  const [userLevel, setUserLevel] = useState('9-10');
  const [prediction, setPrediction] = useState(2.0);
  const [finalReflection, setFinalReflection] = useState('');
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const phases = [
    { num: 0, name: 'Check', icon: Eye },
    { num: 1, name: 'Setup', icon: Shield },
    { num: 2, name: 'Defend', icon: Lock },
    { num: 3, name: 'Report', icon: FileText },
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
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Privacy Defender</span>
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
            onGameOver={(result) => {
              setGameResult(result);
              setPhase(3);
            }}
          />
        )}
        {phase === 3 && (
          <Phase3Harvest
            result={gameResult}
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

        /* Module Specific Animations */
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-glitch { animation: glitch 0.3s linear; }

        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); }
        }
        .animate-pulse-red { animation: pulse-red 2s infinite; }

        @keyframes slam {
          0% { transform: scale(2) rotate(-10deg); opacity: 0; }
          50% { transform: scale(0.9) rotate(-10deg); opacity: 1; }
          75% { transform: scale(1.05) rotate(-10deg); }
          100% { transform: scale(1) rotate(-10deg); }
        }
        .animate-slam { animation: slam 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 0: THE ANCHOR (Prediction)
// ═══════════════════════════════════════════════════════════════

function Phase0Anchor({ prediction, setPrediction, onNext }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="soft-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-emerald-600 shadow-sm relative overflow-hidden">
            <Shield size={24} className="relative z-10" />
            <AlertTriangle size={24} className="absolute right-1 bottom-1 text-stone-300 rotate-12" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-800">Spot the Fake</h2>
            <p className="text-sm text-stone-500">Impulse Control</p>
          </div>
        </div>

        <p className="text-stone-700 text-lg mb-6 leading-relaxed">
          Scammers are experts at <strong>mimicry</strong>. They dress up like your bank, your school, or your favorite apps.
          <br/><br/>
          <strong>How fast do you think you can spot a fake login screen?</strong>
        </p>

        {!revealed ? (
          <div className="flex flex-col items-center gap-4 mb-4">
            <span className="text-5xl font-bold text-emerald-600">{prediction}s</span>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={prediction}
              onChange={(e) => setPrediction(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between w-full text-xs text-stone-400">
              <span>Super Fast (0.5s)</span>
              <span>Slow (5s)</span>
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
              <p className="text-stone-600 font-medium mb-2">The Reality:</p>
              <p className="text-2xl font-bold text-stone-800 mb-4">Scammers count on you being fast.</p>
              <p className="text-sm text-stone-500 italic">
                "When we rush, our brain switches to auto-pilot. We see the logo, not the typo."
              </p>
            </div>
            <button
              onClick={onNext}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Train My Brain <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="skill-check-box animate-fade-in">
        <p>
          <span className="text-lg mr-2">🛡️</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Protecting</strong> — building a mental firewall against manipulation.
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
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-700 shadow-xl z-10 relative">
          <Lock size={40} />
        </div>
        <div className="absolute top-0 right-0 animate-pulse-red rounded-full w-6 h-6 bg-rose-500 flex items-center justify-center text-white">
          <AlertCircle size={14} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#F5F1E6] text-center">You are the Firewall</h2>

      <div className="soft-card p-6 w-full space-y-4">
        <h3 className="font-semibold text-center text-stone-800 mb-2">Incoming Feed</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-rose-50 p-4 rounded-xl border-2 border-rose-200 text-center">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <ShieldAlert size={20} />
            </div>
            <p className="font-bold text-rose-700 mb-1">SCAM</p>
            <p className="text-xs text-rose-600 mb-2">Red icons, typos, "Urgent"</p>
            <div className="bg-rose-600 text-white text-xs py-1 px-3 rounded-full inline-block font-bold">
              TAP TO BLOCK
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-200 text-center">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <ShieldCheck size={20} />
            </div>
            <p className="font-bold text-emerald-700 mb-1">SAFE</p>
            <p className="text-xs text-emerald-600 mb-2">Correct names, normal colors</p>
            <div className="bg-stone-400 text-white text-xs py-1 px-3 rounded-full inline-block font-bold">
              IGNORE IT
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-stone-500 pt-2">
          <p>Don't block your friends. Only block the fakes.</p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Start Scanning <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2: THE GAME LOOP
// ═══════════════════════════════════════════════════════════════

const BRAND_DB = [
  // Streaming
  { id: 'net', real: 'Netflix', fake: 'Netflux', icon: Clapperboard, color: 'text-rose-600' },
  { id: 'spot', real: 'Spotify', fake: 'Spotlfy', icon: Music, color: 'text-emerald-500' },
  // Tech
  { id: 'goog', real: 'Google', fake: 'Goggle', icon: Search, color: 'text-blue-500' },
  { id: 'app', real: 'Apple', fake: 'AppIe', icon: Smartphone, color: 'text-stone-600' },
  // Money
  { id: 'pay', real: 'PayPal', fake: 'PayPaI', icon: Wallet, color: 'text-blue-700' },
  { id: 'bank', real: 'BankNZ', fake: 'BánkNZ', icon: Landmark, color: 'text-emerald-700' },
  // Social
  { id: 'insta', real: 'Insta', fake: 'lnsta', icon: Camera, color: 'text-rose-500' },
  // Delivery
  { id: 'post', real: 'NZPost', fake: 'NZP0st', icon: Package, color: 'text-rose-600' },
];

function Phase2GameLoop({ onGameOver }) {
  const GRID_SIZE = 9; // 3x3

  const [gameState, setGameState] = useState({
    health: 100,
    score: 0,
    timeLeft: 60,
    items: [], // { id, index, type: 'scam'|'safe', label, icon, color, timeLeft, maxTime }
    gameOver: false
  });

  const [feedback, setFeedback] = useState(null); // { type: 'good'|'bad'|'miss', text, x, y }

  const requestRef = useRef();
  const lastTimeRef = useRef();
  const nextSpawnRef = useRef(0);
  const difficultyRef = useRef(1); // 1 to 5 (increases speed)

  // Initialization
  useEffect(() => {
    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Check Game Over
  useEffect(() => {
    if ((gameState.timeLeft <= 0 || gameState.health <= 0) && !gameState.gameOver) {
      setGameState(prev => ({ ...prev, gameOver: true }));
      // Slight delay to show final state
      setTimeout(() => {
        cancelAnimationFrame(requestRef.current);
        onGameOver({
          score: gameState.score,
          health: gameState.health,
          scamsBlocked: Math.floor(gameState.score / 10), // Approx
        });
      }, 1000);
    }
  }, [gameState.timeLeft, gameState.health]);

  const spawnItem = (currentItems) => {
    // Find empty slots
    const occupied = currentItems.map(i => i.index);
    const available = Array.from({length: GRID_SIZE}, (_, i) => i).filter(i => !occupied.includes(i));

    if (available.length === 0) return null;

    const index = available[Math.floor(Math.random() * available.length)];
    const isScam = Math.random() > 0.4; // 60% chance of scam
    const template = BRAND_DB[Math.floor(Math.random() * BRAND_DB.length)];

    // Difficulty logic
    const duration = Math.max(1200, 2500 - (difficultyRef.current * 300));

    // Visual Generation
    let label = template.real;
    let icon = template.icon;
    let color = template.color;
    let subType = 'safe';

    if (isScam) {
      const scamType = Math.random();
      if (scamType > 0.5) {
        // Mimicry Scam (Typo)
        label = template.fake;
        subType = 'mimic';
      } else {
        // Obvious Scam
        label = "URGENT!";
        icon = ShieldAlert;
        color = 'text-rose-600';
        subType = 'obvious';
      }
    }

    return {
      uid: Date.now() + Math.random(),
      index,
      type: isScam ? 'scam' : 'safe',
      subType,
      label,
      Icon: icon,
      color,
      timer: duration,
      maxTime: duration
    };
  };

  const gameLoop = (time) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setGameState(prev => {
      if (prev.gameOver) return prev;

      // Update Time
      const newTimeLeft = Math.max(0, prev.timeLeft - (deltaTime / 1000));

      // Update Difficulty based on time elapsed
      difficultyRef.current = 1 + ((60 - newTimeLeft) / 15); // Increases every 15s

      // Update Items
      let healthChange = 0;
      let newItems = prev.items.map(item => ({
        ...item,
        timer: item.timer - deltaTime
      }));

      // Check expired items
      const expiredItems = newItems.filter(i => i.timer <= 0);
      newItems = newItems.filter(i => i.timer > 0);

      // Handle Missed Scams (Health Damage)
      expiredItems.forEach(item => {
        if (item.type === 'scam') {
          healthChange -= 10;
          showFeedback('miss', "Breach!", item.index);
        }
      });

      // Spawning
      nextSpawnRef.current -= deltaTime;
      if (nextSpawnRef.current <= 0) {
        const newItem = spawnItem(newItems);
        if (newItem) newItems.push(newItem);

        // Next spawn time decreases with difficulty
        const spawnDelay = Math.max(600, 1500 - (difficultyRef.current * 200));
        nextSpawnRef.current = spawnDelay;
      }

      return {
        ...prev,
        timeLeft: newTimeLeft,
        health: Math.max(0, prev.health + healthChange),
        items: newItems
      };
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const showFeedback = (type, text, index) => {
    // Global feedback text shown in center
    setFeedback({ type, text, id: Date.now() });
    setTimeout(() => setFeedback(null), 800);
  };

  const handleTap = (item) => {
    if (gameState.gameOver) return;

    // Remove item immediately
    setGameState(prev => ({
      ...prev,
      items: prev.items.filter(i => i.uid !== item.uid)
    }));

    if (item.type === 'scam') {
      // Good job
      setGameState(prev => ({ ...prev, score: prev.score + 10 }));
      showFeedback('good', 'BLOCKED!', item.index);
    } else {
      // Mistake
      setGameState(prev => ({ ...prev, health: Math.max(0, prev.health - 15) }));
      showFeedback('bad', 'Mistake!', item.index);
    }
  };

  // Render Helpers
  const getHealthColor = () => {
    if (gameState.health > 50) return 'bg-emerald-500';
    if (gameState.health > 20) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="h-[70vh] flex flex-col pt-2">
      {/* HUD */}
      <div className="flex justify-between items-end mb-4 px-1">
        <div className="flex flex-col gap-1 w-1/3">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-bold">Firewall</span>
          <div className="h-4 w-full bg-stone-800 rounded-full overflow-hidden border border-stone-600">
            <div
              className={`h-full transition-all duration-300 ${getHealthColor()}`}
              style={{ width: `${gameState.health}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
           <div className="text-3xl font-bold text-white font-mono leading-none">
             {Math.ceil(gameState.timeLeft)}
           </div>
           <span className="text-[10px] text-stone-500 uppercase">Seconds</span>
        </div>

        <div className="w-1/3 text-right">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-bold">Blocked</span>
          <div className="text-xl font-bold text-emerald-400">
             {Math.floor(gameState.score / 10)}
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 bg-stone-900/50 rounded-2xl border border-stone-700/50 p-3 relative overflow-hidden backdrop-blur-sm">

        {/* Feedback Overlay */}
        {feedback && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className={`text-4xl font-black uppercase tracking-widest animate-slam rotate-[-10deg] ${
              feedback.type === 'good' ? 'text-emerald-400' :
              feedback.type === 'bad' ? 'text-rose-500' :
              'text-amber-500' // Miss
            }`}>
              {feedback.text}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
          {Array.from({length: GRID_SIZE}).map((_, idx) => {
            const item = gameState.items.find(i => i.index === idx);
            return (
              <div key={idx} className="relative w-full h-full rounded-xl bg-stone-800/50 border border-stone-700/30 flex items-center justify-center">
                {item && (
                  <button
                    onPointerDown={() => handleTap(item)}
                    className={`w-full h-full absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 animate-pop-in border-2 ${
                      item.type === 'scam'
                        ? 'bg-stone-100 hover:bg-white border-rose-500/20' // Scams look enticingly clean but might have red border
                        : 'bg-stone-100 hover:bg-white border-transparent'
                    }`}
                  >
                    {/* Progress Bar (Time to live) */}
                    <div className="absolute bottom-0 left-0 h-1 bg-stone-200 w-full rounded-b-xl overflow-hidden">
                      <div
                        className={`h-full ${item.type === 'scam' ? 'bg-rose-400' : 'bg-stone-400'}`}
                        style={{ width: `${(item.timer / item.maxTime) * 100}%` }}
                      />
                    </div>

                    <div className={`text-3xl ${item.color}`}>
                      <item.Icon size={32} />
                    </div>
                    <span className={`text-sm font-bold ${item.subType === 'mimic' ? 'font-mono' : 'font-sans'} text-stone-800`}>
                      {item.label}
                    </span>

                    {/* Visual Glitch for Mimics (Subtle) */}
                    {item.subType === 'mimic' && (
                       <div className="absolute inset-0 opacity-10 bg-rose-500 mix-blend-overlay pointer-events-none" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-center">
         <p className="text-xs text-stone-500">Tap <span className="text-rose-400 font-bold">Red/Typos</span>. Ignore <span className="text-emerald-400 font-bold">Real</span>.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: HARVEST
// ═══════════════════════════════════════════════════════════════

function Phase3Harvest({ result, onNext }) {
  if (!result) return null;

  const passed = result.health > 0;

  return (
    <div className="space-y-6 animate-fade-in pt-6">
      <div className="text-center">
        <div className={`inline-block p-8 rounded-full mb-6 shadow-xl ${passed ? 'bg-emerald-100' : 'bg-rose-100'}`}>
          {passed ? (
            <ShieldCheck size={80} className="text-emerald-600" />
          ) : (
            <Ghost size={80} className="text-rose-500" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-[#F5F1E6] mb-2">
          {passed ? "Firewall Secure" : "System Breached"}
        </h2>
        <p className="text-[#F5F1E6]/70">
          {passed
            ? "You filtered out the noise and kept the data safe."
            : "Too many scams slipped through the cracks."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="soft-card p-4 text-center border-b-4 border-emerald-500">
          <p className="text-xs font-bold text-stone-400 uppercase">Scams Blocked</p>
          <p className="text-3xl font-bold text-emerald-600">{result.scamsBlocked}</p>
        </div>
        <div className="soft-card p-4 text-center border-b-4 border-stone-400">
          <p className="text-xs font-bold text-stone-400 uppercase">System Integrity</p>
          <p className={`text-3xl font-bold ${result.health > 50 ? 'text-emerald-600' : 'text-rose-500'}`}>
            {result.health}%
          </p>
        </div>
      </div>

      <div className="forest-card p-6">
        <h3 className="font-semibold text-white mb-2 text-lg">Security Report</h3>
        <ul className="space-y-3 text-sm text-white/80">
          <li className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 mt-1 shrink-0" />
            <span>Scammers use "social engineering" (urgency) to bypass your logic.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 mt-1 shrink-0" />
            <span>Mimicry works because your brain uses shortcuts (heuristics) to read fast.</span>
          </li>
        </ul>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Analysis <Brain size={20} />
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
          The "Pause" Button
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          In the game, you made mistakes when you moved too fast.
          Real life is the same. Scammers want you to act <strong>now</strong>.
          <br/><br/>
          Your best defense isn't an antivirus — it's taking one second to breathe.
        </p>
      </div>

      <div className="soft-card p-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          What was the hardest thing to spot when the speed increased?
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="I kept confusing..."
          className="w-full p-3 border-2 border-stone-200 rounded-xl text-stone-700 resize-none focus:border-emerald-500 focus:outline-none focus:ring-0 transition-colors"
          rows={3}
        />
      </div>

      <div className="skill-check-box">
        <p>
          <span className="text-lg mr-2">🛡️</span>
          <span className="opacity-80">Skill check:</span> You're practicing <strong>Protecting</strong> — guarding your attention from threats.
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
          You've earned points in Protecting and Tracking.
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
