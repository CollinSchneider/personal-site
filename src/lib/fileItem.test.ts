import { describe, it, expect } from '@jest/globals';
import { FileItem } from './fileItem';

describe('FileItem', () => {
  describe('getFullPath', () => {
    it('should return the full path of the file', () => {
      const root = new FileItem({ name: '~', type: 'directory' });
      const theme = new FileItem({ name: '.theme', type: 'file', content: 'BACKGROUND_COLOR=black"\nTEXT_COLOR=white' });
      root.addChild(theme);
      const guestbook = new FileItem({ name: 'guestbook.txt', type: 'file', content: 'Welcome to the guestbook!\nPlease leave a message below.\n\n\nCollin Schneider\n\n' });
      const guest = new FileItem({ name: 'Guest', type: 'directory' });
      guest.addChild(guestbook);
      root.addChild(guest);
      const about = new FileItem({ name: 'about.txt', type: 'file', content: 'I am a software engineer.' });
      const contact = new FileItem({ name: 'contact.txt', type: 'file', content: 'You can reach me at 555-555-5555' });
      const collin = new FileItem({ name: 'Collin', type: 'directory' });
      collin.addChild(about);
      collin.addChild(contact);
      root.addChild(collin);
      expect(root.getFullPath()).toBe('~');
      expect(theme.getFullPath()).toBe('~/.theme');
      expect(guestbook.getFullPath()).toBe('~/Guest/guestbook.txt');
      expect(about.getFullPath()).toBe('~/Collin/about.txt');
      expect(contact.getFullPath()).toBe('~/Collin/contact.txt');
    });
  });

  describe('traverseTo', () => {
    it('should return the file item at the given path', () => {
      const root = new FileItem({ name: '~', type: 'directory' });
      const theme = new FileItem({ name: '.theme', type: 'file', content: 'BACKGROUND_COLOR=black"\nTEXT_COLOR=white' });
      root.addChild(theme);
      const guestbook = new FileItem({ name: 'guestbook.txt', type: 'file', content: 'Welcome to the guestbook!\nPlease leave a message below.\n\n\nCollin Schneider\n\n' });
      const guest = new FileItem({ name: 'Guest', type: 'directory' });
      guest.addChild(guestbook);
      root.addChild(guest);
      const about = new FileItem({ name: 'about.txt', type: 'file', content: 'I am a software engineer.' });
      const contact = new FileItem({ name: 'contact.txt', type: 'file', content: 'You can reach me at 555-555-5555' });
      const collin = new FileItem({ name: 'Collin', type: 'directory' });
      collin.addChild(about);
      collin.addChild(contact);
      root.addChild(collin);

      expect(root.traverseTo('.theme')).toBe(theme);
      expect(root.traverseTo('./.theme')).toBe(theme);
      
      expect(root.traverseTo('Guest/guestbook.txt')).toBe(guestbook);
      expect(root.traverseTo('./Guest/guestbook.txt')).toBe(guestbook);
      
      expect(root.traverseTo('Collin/about.txt')).toBe(about);
      expect(root.traverseTo('./Collin/about.txt')).toBe(about);

      expect(root.traverseTo('Collin/contact.txt')).toBe(contact);
      expect(root.traverseTo('./Collin/contact.txt')).toBe(contact);

      expect(guest.traverseTo('..')).toBe(root);
      expect(guest.traverseTo('../..')).toBe(root);
      expect(guest.traverseTo('../../../.theme')).toBe(theme);

      expect(collin.traverseTo('~')).toBe(root);
    });
  });
});