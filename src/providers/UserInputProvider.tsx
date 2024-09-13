"use client"

import { createContext, useContext, useState, type ReactNode } from 'react';

const UserInputContext = createContext({
  userInputValueAndCursor: { value: '', cursorPosition: 0 },
  userInputValue: '',
  userInputCursorPosition: 0,
  setUserInputValueAndCursor: (_userInputValueAndCursor: { value: string, cursorPosition: number } | ((previousState: { value: string, cursorPosition: number}) => void)) => {},
  setUserInputValue: (_value: string) => {},
  setUserInputCursorPosition: (_cursorPosition: number) => {},
});

export const UserInputProvider = ({ children }: { children: ReactNode }) => {
  const [userInputValueAndCursor, setUserInputValueAndCursor] = useState({ value: '', cursorPosition: 0 });

  return (
    <UserInputContext.Provider value={{ 
      userInputValueAndCursor, 
      userInputValue: userInputValueAndCursor.value,
      userInputCursorPosition: userInputValueAndCursor.cursorPosition,
      setUserInputValueAndCursor, 
      setUserInputValue: (value: string) => setUserInputValueAndCursor(prev => ({ ...prev, value })),
      setUserInputCursorPosition: (cursorPosition: number) => setUserInputValueAndCursor(prev => ({ ...prev, cursorPosition })),
    }}>
      {children}
    </UserInputContext.Provider>
  );
};

export const useUserInput = () => {
  const context = useContext(UserInputContext);

  if (!context) {
    throw new Error('useUserInput must be used within a UserInputProvider');
  }

  return context;
}
