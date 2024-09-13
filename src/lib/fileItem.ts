export type FileItemType = 'file' | 'directory';

export class FileItem {
  private name: string;
  private type: FileItemType;
  private content?: string;
  private parent?: FileItem;
  private children: FileItem[];
  private editable: boolean;
  
  constructor(
    { name, type, content, parent, children = [], editable = true }: 
    { name: string, type: FileItemType, content?: string, parent?: FileItem, children?: FileItem[]; editable?: boolean }
  ) {
    this.name = name;
    this.type = type;
    this.content = content;
    this.parent = parent;
    this.children = children;
    this.editable = editable;
  }

  public traverseTo(path: string): FileItem | undefined {
    const parts = path.split('/').filter(Boolean);
    let current: FileItem | undefined = this;
    for (const part of parts) {
      if (part === '.') {
        continue;
      } else if (part === '..') {
        if (current?.isRoot()) {
          continue;
        }
        current = current?.parent;
      } else if (part === '~') {
        current = current?.getRoot();
      } else {
        current = current?.findChild(part);
      }
      if (!current) {
        return;
      }
    }
    return current;
  }

  public addChild(child: FileItem) {
    child.setParent(this);
    this.children.push(child);
  }

  public delete() {
    if (this.isRoot()) throw new Error('Cannot delete root directory');
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  public removeChild(child: FileItem) {
    if (!this.children.includes(child)) {
      throw new Error('Child not found');
    }
    this.children = this.children.filter(c => c !== child);
  }

  public findChild(name: string): FileItem | undefined {
    return this.children.find(c => c.name === name);
  }

  public getFullPath(): string {
    return this.parent ? `${this.parent.getFullPath()}/${this.name}` : this.name;
  }

  public getRoot(): FileItem {
    return this.parent ? this.parent.getRoot() : this;
  }

  public getChildren(): FileItem[] {
    return this.children;
  }

  public hasChildren(): boolean {
    return this.children.length > 0;
  }

  public isRoot(): boolean {
    return !this.parent;
  }

  public isDirectory(): boolean {
    return this.type === 'directory';
  }

  public isFile(): boolean {
    return this.type === 'file';
  }

  public getContent(): string | undefined {
    if (this.isDirectory()) {
      throw new Error('Directories do not have content');
    }
    return this.content;
  }

  public setContent(content: string) {
    if (this.isDirectory()) {
      throw new Error('Directories do not have content');
    } else if (!this.editable) {
      throw new Error('This file is not editable');
    }
    return this.content = content;
  }

  public getParent(): FileItem | undefined {
    return this.parent;
  }

  public setParent(parent: FileItem) {
    this.parent = parent;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getType(): FileItemType {
    return this.type;
  }

  public setType(type: FileItemType) {
    this.type = type;
  }
}

export default FileItem;