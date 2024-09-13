'use client';

import { Rnd } from "react-rnd"
import TerminalContent from "./TerminalContent"
import useScreenDimensions from "@/app/hooks/useScreenDimensions";
import TerminalTopPane from "./TerminalTopPane";
import { useRef, useState } from "react";
import { FaExpand } from "react-icons/fa6";
import { FileNavigationProvider } from "@/providers/FileNavigationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { UserInputProvider } from "@/providers/UserInputProvider";

export default function TerminalWindow({ onClose }: { onClose: () => void }) {
  const { width: screenWidth, height: screenHeight } = useScreenDimensions(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const rndRef = useRef<Rnd>(null);

  if (!screenWidth || !screenHeight) {
    return null;
  }

  if (isMinimized) {
    return (
      <div 
        className="fixed cursor-pointer bottom-0 right-0 w-24 h-10 bg-gray-200 rounded-t-md border border-gray-400 hover:bg-gray-300 transition-colors flex items-center justify-center"
        onClick={() => setIsMinimized(false)}
      >
        <span className='text-sm mr-2'>Collin OS</span> 
        <FaExpand className="cursor-pointer" size={12} />
      </div>
    )
  }

  return (
    <FileNavigationProvider>
      <ThemeProvider>
        <UserInputProvider>
          <Rnd
            ref={rndRef}
            bounds='body'
            dragHandleClassName='terminal-top-pane'
            onDragStart={() => setIsDragging(true)}
            onDragStop={() => setIsDragging(false)}
            default={{
              width: screenWidth * 0.5,
              height: screenHeight * 0.5,
              x: screenWidth * 0.1,
              y: screenHeight * 0.1,
            }}
          >
            <div className="w-full h-full shadow-2xl rounded-md border overflow-hidden border-gray-400 flex flex-col">
              <TerminalTopPane 
                className={`terminal-top-pane ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onClose={onClose} 
                onMinimize={() => setIsMinimized(true)}
                onFullScreen={() => {
                  rndRef.current?.updateSize({ width: screenWidth || 0, height: screenHeight || 0 });
                  rndRef.current?.updatePosition({ x: 0, y: 0 });
                }}
                onFullScreenExit={() => {
                  rndRef.current?.updateSize({ width: (screenWidth || 0) * 0.5, height: (screenHeight || 0) * 0.5 });
                  rndRef.current?.updatePosition({ x: (screenWidth || 0) * 0.1, y: (screenHeight || 0) * 0.1 });
                }}
                onDockBottom={() => {
                  rndRef.current?.updateSize({ width: (screenWidth || 0), height: (screenHeight || 0) * 0.25 });
                  rndRef.current?.updatePosition({ x: 0, y: (screenHeight || 0) * 0.75 });
                }}
                onDockRight={() => {
                  rndRef.current?.updateSize({ width: (screenWidth || 0) * 0.25, height: (screenHeight || 0) });
                  rndRef.current?.updatePosition({ x: (screenWidth || 0) * 0.75, y: 0 });
                }}
              />
              <TerminalContent />
            </div>
          </Rnd>
        </UserInputProvider>
      </ThemeProvider>
    </FileNavigationProvider>
  )
}