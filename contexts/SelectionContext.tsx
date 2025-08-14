'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SelectionContextType {
  selectedCount: number;
  selectedItems: any[];
  setSelectedCount: (count: number) => void;
  setSelectedItems: (items: any[]) => void;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const clearSelection = useCallback(() => {
    setSelectedCount(0);
    setSelectedItems([]);
  }, []);

  return (
    <SelectionContext.Provider value={{
      selectedCount,
      selectedItems,
      setSelectedCount,
      setSelectedItems,
      clearSelection
    }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
};