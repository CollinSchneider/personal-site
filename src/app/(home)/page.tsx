'use client';

import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import TerminalWindow from '@/Components/Cli/TerminalWindow';

export default function Home() {
  const [consoleIsOpen, setConsoleIsOpen] = useState(false);

  useHotkeys('mod+c', () => setConsoleIsOpen(true));
  useHotkeys('esc', () => setConsoleIsOpen(false));

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className="text-xl mb-4">Hey, I'm Collin.</h1>
        <button 
          className="rounded-md border border-gray-200 text-sm px-2 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
          onClick={() => setConsoleIsOpen(!consoleIsOpen)}
        >
          {consoleIsOpen && 'Close'} Console {!consoleIsOpen && '(⌘ + C)'}
        </button>
      </div>
      {consoleIsOpen && <TerminalWindow onClose={() => setConsoleIsOpen(false)} />}
    </div>
  );
}
