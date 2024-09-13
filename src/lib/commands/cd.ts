import { OutputType } from "../commandEvaluator";
import FileItem from "../fileItem";

export const cd = (
  args: string[], 
  currentDirectory: InstanceType<typeof FileItem>,
  setCurrentDirectory: (fileItem: InstanceType<typeof FileItem>) => void
): { output: string; type: OutputType } => {
  if (args.length === 0) { 
    return { 
      output: 'supply a directory path to change to that directory: cd <directory>',
      type: 'warning',
    }
  } else if (args.length > 1) {
    return {
      output: `too many arguments supplied to cd, expected 1, got ${args.length}`,
      type: 'error',
    }
  } else {
    const result = currentDirectory.traverseTo(args[0]);
    if (!result) {
      return {
        output: `directory not found: ${args[0]}`,
        type: 'error',
      }
    } else if (!result.isDirectory()) {
      return {
        output: `not a directory: ${args[0]}`,
        type: 'error',
      }
    } else {
      setCurrentDirectory(result);
      return { output: '', type: 'success' };
    }
  }
}

export default cd;