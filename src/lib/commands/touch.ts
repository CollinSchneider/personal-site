import { OutputType } from "../commandEvaluator";
import FileItem from "../fileItem"

export const touch = (filenames: string[], currentDirectory: InstanceType<typeof FileItem>): { output: string; type: OutputType } => {
  if (filenames.length === 0) {
    return {
      output: 'Please provide a file name\n Usage: touch <directory-name>',
      type: 'warning'
    }
  }
  const parentDirectoryPaths = filenames.map(dirName => dirName.split('/').slice(0, -1).join('/') || '.');
  const parentDirectories = parentDirectoryPaths.map(parentDirectoryPath => currentDirectory.traverseTo(parentDirectoryPath));

  const nonExistentParentDirectoryIndex = parentDirectories.findIndex(parentDirectory => !parentDirectory);
  if (nonExistentParentDirectoryIndex !== -1) {
    return {
      output: `no such directory: ${parentDirectoryPaths[nonExistentParentDirectoryIndex]}`,
      type: 'error',
    }
  }
  const nonDirectoryParentDirectoryIndex = parentDirectories.findIndex(parentDirectory => parentDirectory.isFile());
  if (nonDirectoryParentDirectoryIndex !== -1) {
    return {
      output: `not a directory: ${parentDirectoryPaths[nonDirectoryParentDirectoryIndex]}`,
      type: 'error',
    }
  }

  const preExistingFileIndex = filenames.findIndex(filename => currentDirectory.traverseTo(filename));
  if (preExistingFileIndex !== -1) {
    return {
      output: `file already exists: ${filenames[preExistingFileIndex]}`,
      type: 'error',
    }
  }

  filenames.forEach((filename, index) => {
    const parentDirectory = parentDirectories[index];
    const newFilename = filename.split('/').pop() || '';
    const newDirectory = new FileItem({ name: newFilename, type: 'file' });
    if (!parentDirectory) {
      throw new Error('Parent directory not found? This should not happen as we have completed all validations at this point.');
    }
    parentDirectory.addChild(newDirectory);
  });
  
  return { output: '', type: 'success' }
}

export default touch;