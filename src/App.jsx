import React, { useState } from 'react';
import { GameProvider, useGame } from './GameContext.jsx';
import HubView from './HubView.jsx';

// Import all modules
import BankingModule from './modules/BankingModule.jsx';
import BudgetingModule from './modules/BudgetingModule.jsx';
import DebitDrillModule from './modules/DebitDrillModule.jsx';
import IncomeModule from './modules/IncomeModule.jsx';
import JobSimulatorModule from './modules/JobSimulatorModule.jsx';
import NeedsSorterModule from './modules/NeedsSorterModule.jsx';
import PrivacyDefenderModule from './modules/PrivacyDefenderModule.jsx';
import PsychologyModule from './modules/PsychologyModule.jsx';
import SavingsModule from './modules/SavingsModule.jsx';
import SavingsJarModule from './modules/SavingsJarModule.jsx';
import ShoppingModule from './modules/ShoppingModule.jsx';
import SupermarketModule from './modules/SupermarketModule.jsx';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - Master App Controller
// Main application that orchestrates modules and routing
// "Quiet Interface" Design System
// ═══════════════════════════════════════════════════════════════

function AppContent() {
  const [currentView, setCurrentView] = useState('hub');
  const { completeModule } = useGame();

  const handleModuleComplete = (moduleId, skills) => {
    completeModule(moduleId, skills);
    setCurrentView('hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const moduleProps = (moduleId) => ({
    onBack: () => setCurrentView('hub'),
    onComplete: (skills) => handleModuleComplete(moduleId, skills)
  });

  return (
    <div className="min-h-screen font-outfit" style={{ backgroundColor: '#1A2F23' }}>
      {currentView === 'hub' && (
        <HubView onStartModule={(id) => setCurrentView(id)} />
      )}

      {/* Deeper Learning Modules */}
      {currentView === 'psychology' && <PsychologyModule {...moduleProps('psychology')} />}
      {currentView === 'income' && <IncomeModule {...moduleProps('income')} />}
      {currentView === 'savings' && <SavingsModule {...moduleProps('savings')} />}
      {currentView === 'budgeting' && <BudgetingModule {...moduleProps('budgeting')} />}
      {currentView === 'banking' && <BankingModule {...moduleProps('banking')} />}
      {currentView === 'shopping' && <ShoppingModule {...moduleProps('shopping')} />}

      {/* Practice Drill Modules */}
      {currentView === 'jobsim' && <JobSimulatorModule {...moduleProps('jobsim')} />}
      {currentView === 'needs_sorter' && <NeedsSorterModule {...moduleProps('needs_sorter')} />}
      {currentView === 'supermarket' && <SupermarketModule {...moduleProps('supermarket')} />}
      {currentView === 'savings_jar' && <SavingsJarModule {...moduleProps('savings_jar')} />}
      {currentView === 'debit_drill' && <DebitDrillModule {...moduleProps('debit_drill')} />}
      {currentView === 'privacy_defender' && <PrivacyDefenderModule {...moduleProps('privacy_defender')} />}

      {/* Global Styles */}
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }

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

        /* Custom Range Slider */
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
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
