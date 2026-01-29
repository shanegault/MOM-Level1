import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { useGame, SKILLS } from './GameContext.jsx';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - Hub View (Dashboard)
// Central dashboard showing Kete Pūtea and module grid
// "Quiet Interface" Design System
// ═══════════════════════════════════════════════════════════════

export default function HubView({ onStartModule }) {
  const {
    userLevel,
    setUserLevel,
    keteSkills,
    completedModules,
    showKeteAnimation,
    lastAddedSkills
  } = useGame();

  const levels = [
    { id: '1-4', label: 'Year 1-4', age: '5-8 yrs' },
    { id: '5-8', label: 'Year 5-8', age: '9-12 yrs' },
    { id: '9-10', label: 'Year 9-10', age: '13-14 yrs' },
    { id: '11-13', label: 'Year 11-13', age: '15-18 yrs' }
  ];

  // Deeper Learning (Flagship modules)
  const flagshipModules = [
    { id: 'psychology', name: 'The Psychology of Money', emoji: '🧠', desc: 'Why we spend', active: true },
    { id: 'income', name: 'Income & The Pay Slip', emoji: '💸', desc: 'Gross vs Net Pay', active: true },
    { id: 'budgeting', name: 'Budgeting Basics', emoji: '📝', desc: 'The Golden Rule', active: true },
    { id: 'banking', name: 'Banking 101', emoji: '🏦', desc: 'Accounts & Interest', active: true },
    { id: 'shopping', name: 'Smart Shopping & Rights', emoji: '🛍️', desc: 'Rights & Returns', active: true },
    { id: 'savings', name: 'Intro to Saving', emoji: '⏳', desc: 'The Time Machine', active: true },
  ];

  // Practice Drills
  const practiceModules = [
    { id: 'jobsim', name: 'Job Simulator', emoji: '💼', desc: 'Gig economy & admin', active: true },
    { id: 'needs_sorter', name: 'Needs Sorter', emoji: '⚖️', desc: 'Survival vs Fun', active: true },
    { id: 'supermarket', name: 'Virtual Supermarket', emoji: '🛒', desc: 'Price of being poor', active: true },
    { id: 'savings_jar', name: 'The Savings Jar', emoji: '🌱', desc: 'Growing your future', active: true },
    { id: 'debit_drill', name: 'Debit Card Drill', emoji: '💳', desc: 'Surviving overdraft', active: true },
    { id: 'privacy_defender', name: 'Privacy Defender', emoji: '🛡️', desc: "Don't take the bait", active: true }
  ];

  const totalKetePoints = Object.values(keteSkills).reduce((sum, val) => sum + val, 0);

  return (
    <div className="relative min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10" style={{ backgroundColor: '#1A2F23' }}>
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-14 h-14 flex-shrink-0">
              <svg viewBox="0 0 61.28 61.28" className="w-full h-full">
                <rect fill="#1A2F23" x="1.5" y="1.5" width="58.28" height="58.28" rx="12.01" ry="12.01"/>
                <path fill="#F5F1E6" d="M47.77,3c5.8,0,10.51,4.7,10.51,10.51v34.26c0,5.8-4.7,10.51-10.51,10.51H13.51c-5.8,0-10.51-4.7-10.51-10.51V13.51C3,7.7,7.7,3,13.51,3h34.26M47.77,0H13.51C6.06,0,0,6.06,0,13.51v34.26c0,7.45,6.06,13.51,13.51,13.51h34.26c7.45,0,13.51-6.06,13.51-13.51V13.51c0-7.45-6.06-13.51-13.51-13.51h0Z"/>
                <path fill="#F5F1E6" d="M29.91,27.75L12.49,10.32c-.65-.65-1.75-.19-1.75.73v38.86c0,.57.46,1.03,1.03,1.03h1.57c.57,0,1.03-.46,1.03-1.03v-12.03c0-.91,1.1-1.37,1.75-.73l13.81,13.81c.4.4,1.05.4,1.45,0l13.81-13.81c.65-.65,1.75-.19,1.75.73v12.03c0,.57.46,1.03,1.03,1.03h1.57c.57,0,1.03-.46,1.03-1.03V11.05c0-.91-1.1-1.37-1.75-.73l-17.42,17.42c-.4.4-1.05.4-1.45,0ZM29.91,45.84l-15.26-15.26c-.19-.19-.3-.45-.3-.73v-10.07c0-.91,1.1-1.37,1.75-.73l13.81,13.81c.4.4,1.05.4,1.45,0l13.81-13.81c.65-.65,1.75-.19,1.75.73v10.07c0,.27-.11.53-.3.73l-15.26,15.26c-.4.4-1.05.4-1.45,0Z"/>
              </svg>
            </div>
            {/* Title */}
            <h1 className="text-2xl tracking-wide" style={{ color: '#F5F1E6' }}>
              <span className="font-medium">MIND</span>
              <span className="font-extralight mx-1">OVER</span>
              <span className="font-medium">MONEY</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 space-y-8">
        {/* Level Selector */}
        <section className="animate-fade-in">
          <label className="text-xs font-medium uppercase tracking-wider mb-3 block" style={{color: 'rgba(245, 241, 230, 0.8)'}}>
            Your Level
          </label>
          <div className="grid grid-cols-4 gap-2">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setUserLevel(level.id)}
                className={`py-3 px-2 rounded-xl text-center transition-all duration-200 ${
                  userLevel === level.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                    : 'bg-white/80 text-stone-600 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="text-sm font-medium">{level.label}</div>
                <div className="text-xs opacity-70">{level.age}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Kete Pūtea (Skills Basket) */}
        <section
          className={`rounded-3xl p-5 animate-fade-in transition-all duration-500 ${showKeteAnimation ? 'ring-4 ring-emerald-400 ring-opacity-50' : ''}`}
          style={{animationDelay: '0.2s', background: 'linear-gradient(145deg, #2D4A3E, #3A5D4D)', boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'}}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-500 ${showKeteAnimation ? 'scale-125' : ''}`} style={{background: 'rgba(245, 241, 230, 0.15)'}}>
              🧺
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#F5F1E6]">Kete Pūtea</h3>
              <p className="text-xs text-[#F5F1E6]/60">Your Basket of Financial Skills</p>
            </div>
            {totalKetePoints > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-[#B7D9B1]">{totalKetePoints}</p>
                <p className="text-xs text-[#F5F1E6]/50">skill points</p>
              </div>
            )}
          </div>

          {totalKetePoints > 0 ? (
            <div className="mt-4 space-y-2">
              {Object.entries(keteSkills)
                .filter(([_, value]) => value > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([skillId, value]) => {
                  const skill = SKILLS[skillId];
                  if (!skill) return null;
                  const isNewlyAdded = lastAddedSkills && lastAddedSkills[skillId] > 0;
                  return (
                    <div key={skillId} className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ${isNewlyAdded && showKeteAnimation ? 'bg-emerald-500/30' : 'bg-white/5'}`}>
                      <span className="text-lg">{skill.icon}</span>
                      <span className="flex-1 text-sm text-[#F5F1E6]">{skill.name}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full transition-all duration-1000"
                            style={{width: `${Math.min(value / 10 * 100, 100)}%`}}
                          />
                        </div>
                        <span className="text-xs font-medium w-6 text-right text-[#B7D9B1]">
                          {value}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="mt-4 p-4 rounded-xl text-center bg-[#F5F1E6]/5">
              <p className="text-sm text-[#F5F1E6]/60">
                Complete a module to start filling your kete with financial skills!
              </p>
            </div>
          )}
        </section>

        {/* Deeper Learning Section (Flagship) */}
        <section className="animate-fade-in" style={{animationDelay: '0.3s'}}>
          <h2 className="text-xs font-medium uppercase tracking-wider mb-4" style={{color: 'rgba(245, 241, 230, 0.8)'}}>
            Deeper Learning
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {flagshipModules.map((module, idx) => (
              <ModuleCard
                key={module.id}
                module={module}
                onClick={() => onStartModule(module.id)}
                isCompleted={completedModules.includes(module.id)}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Practice Drills Section */}
        <section className="animate-fade-in" style={{animationDelay: '0.4s'}}>
          <h2 className="text-xs font-medium uppercase tracking-wider mb-4 pt-4 border-t border-white/10" style={{color: 'rgba(245, 241, 230, 0.8)'}}>
            Practice Drills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {practiceModules.map((module, idx) => (
              <ModuleCard
                key={module.id}
                module={module}
                onClick={() => onStartModule(module.id)}
                isCompleted={completedModules.includes(module.id)}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ModuleCard({ module, isCompleted, onClick, delay }) {
  // Determine style based on state
  let containerClass = "bg-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]";
  let opacityClass = "opacity-100";
  let statusText = "Start";
  let StatusIcon = ChevronRight;
  let statusColor = "text-emerald-600";

  if (isCompleted) {
    containerClass = "bg-white shadow-sm";
    opacityClass = "opacity-50 grayscale";
    statusText = "Completed";
    StatusIcon = Check;
    statusColor = "text-stone-400";
  } else if (!module.active) {
    containerClass = "bg-stone-50 opacity-60";
    statusText = "Locked";
    StatusIcon = null; // No icon for locked
    statusColor = "text-stone-400";
  }

  return (
    <button
      onClick={onClick}
      disabled={!module.active}
      className={`relative overflow-hidden rounded-3xl p-5 text-left transition-all duration-300 animate-slide-up ${containerClass}`}
      style={{animationDelay: `${0.3 + delay}s`}}
    >
      <div className={`relative ${opacityClass} transition-opacity duration-300`}>
        {/* Icon Container: Matches Kete Pūtea basket size (w-12 h-12) and cream background */}
        <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-3xl bg-[#F5F1E6]">
          {module.emoji}
        </div>

        <h3 className="font-semibold mb-1 leading-tight text-stone-800">{module.name}</h3>
        <p className="text-xs text-stone-500">{module.desc}</p>

        <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${statusColor}`}>
          {statusText} {StatusIcon && <StatusIcon className="w-4 h-4" />}
        </div>
      </div>
    </button>
  );
}
