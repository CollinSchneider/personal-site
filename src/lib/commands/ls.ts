import { OutputType } from "../commandEvaluator";
import FileItem from "../fileItem";

export const ls = (
  args: string[], 
  currentDirectory: InstanceType<typeof FileItem>
): { output: string; type: OutputType } => {
  if (args.length > 1) {
    return {
      output: `too many arguments supplied to ls, expected 0 or 1, got ${args.length}`,
      type: 'error',
    }
  } else if (args.length === 1) {
    const result = currentDirectory.traverseTo(args[0]);
    if (!result) {
      return {
        output: `no such file or directory: ${args[0]}`,
        type: 'error',
      }
    } else if (result.isFile()) {
      return {
        output: `not a directory: ${args[0]}`,
        type: 'error',
      }
    } else {
      return {
        output: result.getChildren().map(child => child.getName()).join('\n'),
        type: 'success',
      }
    }
  } else {
    return {
      output: currentDirectory.getChildren().map(child => child.getName()).join('\n'),
      type: 'success',
    }
  }
}

export default ls;