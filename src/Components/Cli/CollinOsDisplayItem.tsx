'use client';

import { useTheme } from "@/providers/ThemeProvider";

export default function CollinOsLine() {
  const { collinOsColor, fontSize } = useTheme();

  return (
    <span 
      className="font-mono mr-1"
      style={{ color: collinOsColor, fontSize }}
    >
      [CollinOS]
    </span>
  )
}