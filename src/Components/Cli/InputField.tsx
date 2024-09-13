'use client';

import { useTheme } from "@/providers/ThemeProvider";
import { useUserInput } from "@/providers/UserInputProvider";
import { useCallback, useEffect, useState } from "react";

export default function InputField(
  { onSubmit, onTab }: 
  { onSubmit: (cmd: string) => void; onTab: (currentValue: string) => void }
) {
  const { textColor, fontSize } = useTheme();
  // const [valueAndCursor, setUserInputValueAndCursor] = useState({ value: '', cursorPosition: 0 });
  const { userInputValueAndCursor, userInputValue, userInputCursorPosition, setUserInputValueAndCursor, setUserInputCursorPosition } = useUserInput();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(userInputValue);
      setUserInputValueAndCursor({ value: '', cursorPosition: 0 });
      return;
    } else if (e.key === 'Backspace') {
      if (e.altKey) {
        // The regex /[\w]+\W*$/ matches:
        // - [\w]+ : One or more word characters (letters, digits, underscores)
        // - \W*   : Zero or more non-word characters (anything other than letters, digits, underscores)
        // - $     : End of the string
        // This ensures that the entire word along with any trailing non-word characters (like punctuation) is removed.
        const newValue = userInputValue.slice(0, userInputCursorPosition).replace(/[\w]+\W*$/, '') + userInputValue.slice(userInputCursorPosition);
        setUserInputValueAndCursor({ value: newValue, cursorPosition: newValue.length });
      } else if (e.metaKey) {
        setUserInputValueAndCursor({ value: '', cursorPosition: 0 });
      } else {
        setUserInputValueAndCursor(prev => {
          const newValue = prev.value.slice(0, prev.cursorPosition - 1) + prev.value.slice(prev.cursorPosition);
          return { value: newValue, cursorPosition: Math.max(0, prev.cursorPosition - 1) };
        });
      }
      return;
    } else if (e.key === 'Tab') {
      e.preventDefault();
      onTab(userInputValue);
      return;
    } else if (e.key === 'ArrowLeft') {
      setUserInputCursorPosition(Math.max(0, userInputCursorPosition - 1));
      // setUserInputValueAndCursor(prev => ({ value: prev.value, cursorPosition: Math.max(0, prev.cursorPosition - 1) }));
      return;
    } else if (e.key === 'ArrowRight') {
      setUserInputCursorPosition(Math.min(userInputValue.length, userInputCursorPosition + 1));
      // setUserInputValueAndCursor(prev => ({ value: prev.value, cursorPosition: Math.min(prev.value.length, prev.cursorPosition + 1) }));
      return;
    } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      setUserInputValueAndCursor(prev => {
        const newValue = prev.value.slice(0, prev.cursorPosition) + e.key + prev.value.slice(prev.cursorPosition);
        return { value: newValue, cursorPosition: prev.cursorPosition + 1 };
      });
      return;
    }
  }, [userInputValueAndCursor, onSubmit]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [userInputValueAndCursor, onSubmit]);

  return (
    <>
      <div className="flex items-center font-mono h-full">
        <span 
          className="whitespace-pre cursor-text"
          style={{ color: textColor, fontSize }}
        >
          {userInputValue.slice(0, userInputCursorPosition)}
        </span>
        <span 
          className="border animate-blink h-full inline-flex items-center justify-center"
          style={{ backgroundColor: textColor, color: textColor, width: '1ch', fontSize }}
        >
          {userInputValue[userInputCursorPosition] || ''}
        </span>
        <span 
          className="whitespace-pre cursor-text"
          style={{ color: textColor, fontSize }}
        >
          {userInputValue.slice(userInputCursorPosition + 1)}
        </span>
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            background-color: ${textColor};
          }
          50% {
            background-color: transparent;
          }
        }
        .animate-blink {
          animation: blink 1s steps(1, end) infinite;
        }
      `}</style>
    </>
  )
}