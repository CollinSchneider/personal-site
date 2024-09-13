import type { ThemeName } from "@/providers/ThemeProvider";
import { cat } from "./commands/cat";
import { cd } from "./commands/cd";
import { ls } from "./commands/ls";
import { theme } from "./commands/theme";
import { mkdir } from "./commands/mkdir";
import FileItem from "./fileItem";
import { touch } from "./commands/touch";
import { rm } from "./commands/rm";
import { help } from "./commands/help";
import { history } from "./commands/history";

export type OutputType = 'success' | 'warning' | 'error';

export const evaluateCommand = (
  command: string, 
  currentDirectory: InstanceType<typeof FileItem>, 
  setCurrentDirectory: (fileItem: InstanceType<typeof FileItem>) => void,
  setTheme: (themeName: ThemeName) => void,
  currentTheme: ThemeName,
): { output: string; type: OutputType } => {
  const splitCommand = command.split(' ');
  const cmd = splitCommand[0];
  const args = splitCommand.slice(1);
  
  switch (cmd) {
    case '':
      return { output: '', type: 'success' };
    case 'cd': 
      return cd(args, currentDirectory, setCurrentDirectory);
    case 'ls': 
      return ls(args, currentDirectory);
    case 'pwd':
      return { output: currentDirectory.getFullPath(), type: 'success' };
    case 'cat':
      return cat(args, currentDirectory);
    case 'theme':
      return theme(args, currentTheme, setTheme);
    case 'mkdir':
      return mkdir(args, currentDirectory);
    case 'touch':
      return touch(args, currentDirectory);
    case 'rm':
      return rm(args, currentDirectory);
    case 'help':
      return help(args);
    case 'history':
      return history(args);
    default: 
      return {
        output: `Command not found: ${cmd}`,
        type: 'error',
      }
  }
}

export const SUPPORTED_COMMANDS = ['cd', 'ls', 'mkdir', 'touch', 'rm', 'pwd', 'cat', 'theme', 'clear', 'flush', 'help', 'history'];