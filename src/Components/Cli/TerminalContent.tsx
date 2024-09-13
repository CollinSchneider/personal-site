'use client';

import ActiveLineBlock from "@/Components/Cli/ActiveLineBlock";
import { useTheme } from "@/providers/ThemeProvider";
import { useCallback, useRef, useState } from "react";
import { useFileNavigation } from "@/providers/FileNavigationProvider";
import OutputLineBlock from "./OutputLineBlock";
import { evaluateCommand, type OutputType } from "@/lib/commandEvaluator";
import { useUserInput } from "@/providers/UserInputProvider";
import { useHotkeys } from "react-hotkeys-hook";
import { evaluateTab } from "@/lib/tabEvaluator";

export default function TerminalContent() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { backgroundColor, flashBackgroundColor, setTheme, currentTheme } = useTheme();
  const { currentDirectory, setCurrentDirectory } = useFileNavigation();
  const { setUserInputValueAndCursor, userInputValue } = useUserInput();
  
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number>(-1);
  const [lineBlocks, setLineBlocks] = useState<{ directory: string, command: string, output: string, outputType: OutputType  }[]>([]);

  useHotkeys('ArrowUp', e => {
    e.preventDefault();
    const commandHistory = localStorage.getItem('commandHistory') ? JSON.parse(localStorage.getItem('commandHistory')!) : [];
    const commandValue = commandHistory[commandHistoryIndex + 1];
    if (commandValue !== undefined) {
      setUserInputValueAndCursor({ value: commandValue, cursorPosition: commandValue.length });
      setCommandHistoryIndex(commandHistoryIndex + 1);
    } else {
      flashBackgroundColor();
    }
  })

  useHotkeys('ArrowDown', e => {
    e.preventDefault();
    const commandHistory = localStorage.getItem('commandHistory') ? JSON.parse(localStorage.getItem('commandHistory')!) : [];
    if (commandHistoryIndex === -1) {
      flashBackgroundColor();
    } else {
      const commandValue = commandHistory[commandHistoryIndex - 1] || '';
      setUserInputValueAndCursor({ value: commandValue, cursorPosition: commandValue.length });
      setCommandHistoryIndex(commandHistoryIndex - 1);
    }
  });

  const handleInputSubmit = useCallback((command: string) => {
    setCommandHistoryIndex(-1);
    if (command.trim() !== '') {
      const commandHistory = localStorage.getItem('commandHistory') ? JSON.parse(localStorage.getItem('commandHistory')!) : [];
      commandHistory.unshift(command);
      localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
    }
    if (['clear', 'flush'].includes(command.trim())) {
      setLineBlocks([]);
    } else {
      const directoryAtTimeOfCommand = currentDirectory.getName();
      const { output, type } = evaluateCommand(command, currentDirectory, setCurrentDirectory, setTheme, currentTheme);
      setLineBlocks([...lineBlocks, { directory: directoryAtTimeOfCommand, command, output, outputType: type }]);
    }
    setTimeout(() => {
      contentRef.current?.scrollTo({ top: contentRef.current.scrollHeight });
    }, 0)
  }, [currentDirectory, setCurrentDirectory, lineBlocks]);

  useHotkeys('ctrl+c', () => {
    setCommandHistoryIndex(-1);
    setLineBlocks([...lineBlocks, { directory: currentDirectory.getName(), command: userInputValue, output: '', outputType: 'success' }]);
    setUserInputValueAndCursor({ value: '', cursorPosition: 0 });
    setTimeout(() => {
      contentRef.current?.scrollTo({ top: contentRef.current.scrollHeight });
    }, 0)
  })

  const handleTab = useCallback((currentUserInputValue: string) => {
    evaluateTab(currentUserInputValue, setUserInputValueAndCursor, currentDirectory, lineBlocks, setLineBlocks, flashBackgroundColor);
  }, [currentDirectory, lineBlocks]);

  return (
    <div 
      className="w-full h-full cursor-text overflow-y-scroll p-2 transition-colors duration-100 flex-1"
      style={{ backgroundColor }}
      ref={contentRef}
    >
      {lineBlocks.map((lineBlock, i) => <OutputLineBlock key={i} {...lineBlock} />)}
      <ActiveLineBlock onSubmit={handleInputSubmit} onTab={handleTab} />
    </div>
  )
}