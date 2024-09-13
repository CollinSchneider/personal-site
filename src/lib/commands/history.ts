import { OutputType } from "../commandEvaluator";

export const history = (args: string[]): { output: string, type: OutputType } => {
  // if (args.length === 0) {
    const commands = localStorage.getItem('commandHistory') ? JSON.parse(localStorage.getItem('commandHistory')!) : [];
    return {
      output: commands.length > 50 
        ? `[+${commands.length - 50} more]\n` + commands.slice(0, 50).reverse().join('\n') 
        : commands.reverse().join('\n'),
      type: 'success',
    }
  // }
}