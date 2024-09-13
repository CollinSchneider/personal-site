"use client"

import FileItem from '@/lib/fileItem';
import { rootDirectory } from '@/lib/fileSystem';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface FileNavigationContextType {
  currentDirectory: InstanceType<typeof FileItem>;
  setCurrentDirectory: (directory: InstanceType<typeof FileItem>) => void;
}

const FileNavigationContext = createContext<FileNavigationContextType>({
  currentDirectory: rootDirectory,
  setCurrentDirectory: () => {},
});

export const FileNavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentDirectory, setCurrentDirectory] = useState<InstanceType<typeof FileItem>>(rootDirectory);

  return (
    <FileNavigationContext.Provider value={{ currentDirectory, setCurrentDirectory }}>
      {children}
    </FileNavigationContext.Provider>
  );
};

export const useFileNavigation = () => {
  const context = useContext(FileNavigationContext);

  if (!context) {
    throw new Error('useFileNavigation must be used within a FileNavigationProvider');
  }

  return context;
}