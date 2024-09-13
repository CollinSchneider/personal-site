import { type OutputType, SUPPORTED_COMMANDS } from "./commandEvaluator";
import FileItem from "./fileItem";

export const evaluateTab = (
  currentUserInputValue: string, 
  setUserInputValueAndCursor: ({ value, cursorPosition }: { value: string; cursorPosition: number }) => void, 
  currentDirectory: InstanceType<typeof FileItem>, 
  lineBlocks: { directory: string; command: string; output: string; outputType: OutputType }[], 
  setLineBlocks: (lineBlocks: { directory: string; command: string; output: string; outputType: OutputType }[]) => void,
  onNoResults: () => void,
) => {
  const splitCommand = currentUserInputValue.split(' ');
  const cmd = splitCommand[0];
  const args = splitCommand.slice(1);
  if (!cmd) return;
  if (args.length === 0) {
    const matchingCommands = SUPPORTED_COMMANDS.filter(command => command.toLowerCase().startsWith(cmd.toLowerCase()));
    if (matchingCommands.length === 1) {
      setUserInputValueAndCursor({ value: `${matchingCommands[0]} `, cursorPosition: matchingCommands[0].length + 1 });
    } else if (matchingCommands.length > 1) {
      const output = matchingCommands.join(' ');
      setLineBlocks([...lineBlocks, { directory: currentDirectory.getName(), command: currentUserInputValue, output, outputType: 'success' }]);
    } else {
      onNoResults();
    }
  } else {
    const directoryNameToSearchFrom = args[args.length - 1].split('/').slice(0, -1).join('/') || '.';
    const fileOrDirectoryToAutoComplete = args[args.length - 1].split('/').pop() || '';
    const directoryToSearchFrom = currentDirectory.traverseTo(directoryNameToSearchFrom);
    if (!directoryToSearchFrom) {
      onNoResults();
      return;
    }
    const matchingChildren = directoryToSearchFrom.getChildren().filter(item => item.getName().toLowerCase().startsWith((fileOrDirectoryToAutoComplete).toLowerCase()));
    if (matchingChildren.length === 1) {
      const matchingFileOrDirectoryName = matchingChildren[0].getName();
      const newValue = currentUserInputValue.split(' ');
      newValue[newValue.length - 1] = (directoryNameToSearchFrom === '.' ? '' : (directoryNameToSearchFrom + '/')) 
                                        + matchingFileOrDirectoryName 
                                        + (matchingChildren[0].isDirectory() ? '/' : '');
      setUserInputValueAndCursor({ value: newValue.join(' '), cursorPosition: newValue.join(' ').length });
    } else if (matchingChildren.length > 1) {
      const output = matchingChildren.map(item => item.getName()).join(' ');
      setLineBlocks([...lineBlocks, { directory: currentDirectory.getName(), command: currentUserInputValue, output, outputType: 'success' }]);
    } else {
      onNoResults();
    }
  }
}