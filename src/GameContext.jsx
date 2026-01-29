import React, { createContext, useContext, useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// MIND OVER MONEY - Game Context (Shared State)
// Manages user level, Kete Pūtea skills, and module completion
// ═══════════════════════════════════════════════════════════════

const GameContext = createContext();

// Skills Definition (shared across all modules)
export const SKILLS = {
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
  prioritising: {
    id: 'prioritising',
    name: 'Prioritising',
    icon: '⭐',
    description: {
      '1-4': 'Picking what matters most',
      '5-8': 'Deciding what to spend first',
      '9-10': 'Ranking what matters most when resources are limited',
      '11-13': 'Strategic resource allocation under constraints'
    }
  }
};

export function GameProvider({ children }) {
  const [userLevel, setUserLevel] = useState('9-10');
  const [keteSkills, setKeteSkills] = useState({
    estimating: 0,
    calculating: 0,
    comparing: 0,
    forecasting: 0,
    reflecting: 0,
    researching: 0,
    prioritising: 0
  });
  const [completedModules, setCompletedModules] = useState([]);
  const [showKeteAnimation, setShowKeteAnimation] = useState(false);
  const [lastAddedSkills, setLastAddedSkills] = useState(null);

  const completeModule = (moduleId, skills) => {
    // Update skills
    setLastAddedSkills(skills);
    setKeteSkills(prev => {
      const updated = { ...prev };
      Object.entries(skills).forEach(([skill, weight]) => {
        updated[skill] = (updated[skill] || 0) + weight;
      });
      return updated;
    });

    // Mark complete
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }

    // Trigger animation
    setShowKeteAnimation(true);
    setTimeout(() => setShowKeteAnimation(false), 4000);
  };

  const resetProgress = () => {
    setKeteSkills({
      estimating: 0,
      calculating: 0,
      comparing: 0,
      forecasting: 0,
      reflecting: 0,
      researching: 0,
      prioritising: 0
    });
    setCompletedModules([]);
    setLastAddedSkills(null);
  };

  return (
    <GameContext.Provider value={{
      userLevel,
      setUserLevel,
      keteSkills,
      completedModules,
      completeModule,
      showKeteAnimation,
      lastAddedSkills,
      resetProgress,
      SKILLS
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameContext;
