import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RoadmapContextType {
  selectedRoadmapId: string | null;
  selectedRoadmap: any | null;
  setSelectedRoadmap: (roadmapId: string | null, roadmapData?: any) => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const useRoadmapContext = () => {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmapContext must be used within a RoadmapProvider');
  }
  return context;
};

interface RoadmapProviderProps {
  children: ReactNode;
}

export const RoadmapProvider: React.FC<RoadmapProviderProps> = ({ children }) => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);
  const [selectedRoadmap, setSelectedRoadmapData] = useState<any | null>(null);

  const setSelectedRoadmap = (roadmapId: string | null, roadmapData?: any) => {
    setSelectedRoadmapId(roadmapId);
    setSelectedRoadmapData(roadmapData || null);
  };

  return (
    <RoadmapContext.Provider value={{
      selectedRoadmapId,
      selectedRoadmap,
      setSelectedRoadmap
    }}>
      {children}
    </RoadmapContext.Provider>
  );
};