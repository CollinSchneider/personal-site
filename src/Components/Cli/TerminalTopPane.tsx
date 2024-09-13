import { useState } from "react";
import { FaExpand } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { MdMinimize } from "react-icons/md";
import { BiDockBottom, BiDockRight } from "react-icons/bi";
import { RiCollapseDiagonalLine } from "react-icons/ri";

export default function TerminalTopPane(
  { onClose, onMinimize, onFullScreen, onFullScreenExit, onDockRight, onDockBottom, className = '' }: 
  { onClose: () => void; onMinimize: () => void; onFullScreen: () => void; onFullScreenExit: () => void; onDockRight: () => void; onDockBottom: () => void; className?: string }
) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div  className={`flex items-center justify-between bg-gray-200 px-2 py-1 ${className || ''}`}>
      <div className='flex items-center space-x-2 group hover:children:text-gray-700'>
        <button 
          className='w-3 h-3 flex items-center justify-center rounded-full bg-red-500 active:bg-red-600 p-[1px]'
          onClick={onClose}
        >
          <IoIosClose className="hidden group-hover:block" />
        </button>
        <button 
          className='w-3 h-3 flex items-center justify-center rounded-full bg-yellow-400 active:bg-yellow-500 p-[3px]'
          onClick={onMinimize}
        >
          <MdMinimize className="hidden group-hover:block mt-[-3px]" />
        </button>

        <button 
          className='w-3 h-3 flex items-center justify-center rounded-full bg-green-500 active:bg-green-600'
          onClick={() => {
            if (isFullScreen) {
              setIsFullScreen(false);
              onFullScreen();
            } else {
              setIsFullScreen(true);
              onFullScreenExit();
            }
          }}
        >
          {isFullScreen ? <RiCollapseDiagonalLine className="hidden group-hover:block m-[1px]" /> : <FaExpand className="hidden group-hover:block m-[3px]" />}
        </button>
      </div>
      <div className='text-xs font-mono'>CollinOS</div>
      <div className='flex items-center justify-end space-x-2'>
        <button 
          className='w-3 h-3 flex items-center justify-center roundedp-[1px] hover:bg-gray-300 transition-colors'
          onClick={onDockBottom}
        >
          <BiDockBottom />
        </button>
        <button 
          className='w-3 h-3 flex items-center justify-center roundedp-[1px] hover:bg-gray-300 transition-colors'
          onClick={onDockRight}
        >
          <BiDockRight />
        </button>
      </div>
    </div>
  )

}