'use client';

import { useTheme } from "@/providers/ThemeProvider";
import CollinOsLine from "./CollinOsDisplayItem";
import { FaArrowRightLong } from "react-icons/fa6";
import CurrentFileDisplayItem from "./CurrentFileDisplayItem";

type OutputType = 'success' | 'warning' | 'error';

export default function OutputLineBlock(
  { directory, command, output, outputType }: 
  Readonly<{ directory: string, command: string, output: string | JSX.Element; outputType: OutputType }>
) {
  const { textColor, fontSize, currentFileColor } = useTheme();
  let backgroundColor = '';
  if (outputType === 'warning') {
    backgroundColor = 'rgba(220, 200, 110, 0.5)';
  } else if (outputType === 'error') {
    backgroundColor = 'rgba(220, 110, 110, 0.5)';
  }

  return (
    <div style={{backgroundColor}} className='rounded'>
      <div className='h-6 w-full flex items-center'>
        <CollinOsLine />
        <CurrentFileDisplayItem directoryName={directory} />
        <span 
          className="font-mono"
          style={{ color: textColor, fontSize }}
        >
          {command}
        </span>
      </div>
      <div className="flex items-center">
        <span 
          className="px-1 whitespace-pre-wrap font-mono"
          style={{ color: textColor, fontSize }}
        >
          {output}
        </span>
      </div>
    </div>
  ) 
}