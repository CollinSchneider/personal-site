import { OutputType } from "../commandEvaluator";
import FileItem from "../fileItem"

export const mkdir = (dirNames: string[], currentDirectory: InstanceType<typeof FileItem>): { output: string; type: OutputType } => {
  if (dirNames.length === 0) {
    return {
      output: 'Please provide a directory name\n Usage: mkdir <directory-name>',
      type: 'warning'
    }
  }
  const parentDirectoryPaths = dirNames.map(dirName => dirName.split('/').slice(0, -1).join('/') || '.');
  const parentDirectories = parentDirectoryPaths.map(parentDirectoryPath => currentDirectory.traverseTo(parentDirectoryPath));
  
  const nonExistentParentDirectoryIndex = parentDirectories.findIndex(parentDirectory => !parentDirectory);
  if (nonExistentParentDirectoryIndex !== -1) {
    return {
      output: `no such directory: ${parentDirectoryPaths[nonExistentParentDirectoryIndex]}`,
      type: 'error',
    }
  }
  const nonDirectoryParentDirectoryIndex = parentDirectories.findIndex(parentDirectory => parentDirectory?.isFile());
  if (nonDirectoryParentDirectoryIndex !== -1) {
    return {
      output: `not a directory: ${parentDirectoryPaths[nonDirectoryParentDirectoryIndex]}`,
      type: 'error',
    }
  }

  const preExistingDirectoryIndex = dirNames.findIndex(dirName => currentDirectory.traverseTo(dirName));
  if (preExistingDirectoryIndex !== -1) {
    return {
      output: `directory already exists: ${dirNames[preExistingDirectoryIndex]}`,
      type: 'error',
    }
  }

  dirNames.forEach((dirName, index) => {
    const parentDirectory = parentDirectories[index];
    const newDirectoryName = dirName.split('/').pop() || '';
    const newDirectory = new FileItem({ name: newDirectoryName, type: 'directory' });
    if (!parentDirectory) {
      throw new Error('Parent directory not found? This should not happen as we have completed all validations at this point.');
    }
    parentDirectory.addChild(newDirectory);
  });
  
  return { output: '', type: 'success' }
}

export default mkdir;