import { OutputType } from "../commandEvaluator"
import FileItem from "../fileItem"

export const rm = (args: string[], currentDirectory: InstanceType<typeof FileItem>): { output: string, type: OutputType } => {
  const fileOrDirectoryPaths = args.filter(arg => arg !== '-r');
  if (fileOrDirectoryPaths.length === 0) {
    return {
      output: 'Please provide a file name\n Usage: rm <file-name>',
      type: 'warning'
    }
  }

  const nonExistentFileOrDirectoryIndex = fileOrDirectoryPaths.findIndex(filePath => !currentDirectory.traverseTo(filePath));
  if (nonExistentFileOrDirectoryIndex !== -1) {
    return {
      output: `no such file or directory: ${fileOrDirectoryPaths[nonExistentFileOrDirectoryIndex]}`,
      type: 'error',
    }
  }

  const hasRecursiveFlag = args.includes('-r');
  const filesAndDirectoriesToRemove = fileOrDirectoryPaths.map(filePath => currentDirectory.traverseTo(filePath));
  if(!hasRecursiveFlag && filesAndDirectoriesToRemove.some(fileOrDirectory => fileOrDirectory?.isDirectory())) {
    return {
      output: 'cannot remove directory, use -r flag to remove directories',
      type: 'error',
    }
  }

  filesAndDirectoriesToRemove.forEach(fileOrDirectory => {
    if (!fileOrDirectory) {
      throw new Error('File or directory not found? This should not happen as we have completed all validations at this point.');
    }
    fileOrDirectory.delete();
  });
  return { output: '', type: 'success' }
}