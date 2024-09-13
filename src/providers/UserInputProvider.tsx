"use client"

import { createContext, useContext, useState, type ReactNode, Dispatch, SetStateAction } from 'react';

interface UserInputContextType {
  userInputValueAndCursor: { value: string; cursorPosition: number };
  userInputValue: string;
  userInputCursorPosition: number;
  setUserInputValueAndCursor: Dispatch<SetStateAction<{ value: string; cursorPosition: number }>>;
  setUserInputValue: (value: string) => void;
  setUserInputCursorPosition: (cursorPosition: number) => void;
}

const UserInputContext = createContext<UserInputContextType>({
  userInputValueAndCursor: { value: '', cursorPosition: 0 },
  userInputValue: '',
  userInputCursorPosition: 0,
  setUserInputValueAndCursor: () => {},
  setUserInputValue: () => {},
  setUserInputCursorPosition: () => {},
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
