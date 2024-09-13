'use client';

import { useFileNavigation } from "@/providers/FileNavigationProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CurrentFileDisplayItem({ directoryName }: Readonly<{ directoryName?: string }>) {
  const { currentDirectory } = useFileNavigation();
  const { currentFileColor, fontSize } = useTheme();

  return (
    <div 
      className="mr-2 font-medium inline-flex items-center"
      style={{ fontSize }}
    >
      <span style={{ color: currentFileColor }}>{directoryName || currentDirectory.getName()}</span>
      <span className="text-yellow-300"><FaArrowRightLong className="inline-block ml-1" size={10} /></span>
    </div>
  )
}