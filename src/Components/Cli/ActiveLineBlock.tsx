'use client'

import InputField from "./InputField";
import CollinOsLine from "./CollinOsDisplayItem";
import CurrentFileDisplayItem from "./CurrentFileDisplayItem";

export default function ActiveLineBlock(
  { onSubmit, onTab }: 
  Readonly<{ onSubmit: (cmd: string) => void; onTab: (currentValue: string) => void }>
) {

  return (
    <div className="h-6 w-fit flex items-center">
      <CollinOsLine />
      <CurrentFileDisplayItem />
      <InputField onSubmit={onSubmit} onTab={onTab} />
    </div>
  )
}