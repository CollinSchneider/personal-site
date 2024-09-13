import { OutputType } from "../commandEvaluator";
import FileItem from "../fileItem";

export const cat = (
  args: string[], 
  currentDirectory: InstanceType<typeof FileItem>
): { output: string; type: OutputType } => {
  if (args.length === 0) {
    return {
      output: 'supply a file name to display its contents: cat <file>',
      type: 'warning',
    }
  } else if (args.length > 1) {
    return {
      output: `too many arguments supplied to cat, expected 1, got ${args.length}`,
      type: 'error',
    }
  } else {
    const result = currentDirectory.traverseTo(args[0]);
    if (!result) {
      return {
        output: `no such file or directory: ${args[0]}`,
        type: 'error',
      }
    } else if (result.isDirectory()) {
      return {
        output: `not a file: ${args[0]}`,
        type: 'error',
      }
    } else {
      return {
        output: result.getContent() || '',
        type: 'success',
      }
    }
  }
}

export default cat;