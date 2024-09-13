import { FileItem } from "./fileItem";

const rootDirectory = new FileItem({ name: '~', type: 'directory' })
const themeFile = new FileItem({ name: '.theme',type: 'file', content: 'BACKGROUND_COLOR=black"\nTEXT_COLOR=white' })

const usersDirectory = new FileItem({ name: 'Users', type: 'directory' })
const guestDirectory = new FileItem({ name: 'Guest', type: 'directory' })
const collinDirectory = new FileItem({ name: 'Collin', type: 'directory' })

const aboutFile = new FileItem({ name: 'about.txt', type: 'file', content: 'I am a software engineer.' })
const contactFile = new FileItem({ name: 'contact.txt', type: 'file', content: 'collinschneider3@gmail.com' })
const guestbookFile = new FileItem({ name: 'guestbook.txt', type: 'file', content: 'Welcome to the guestbook!\nPlease leave a message below.\n\n\nCollin waz here\n\n' })

rootDirectory.addChild(themeFile);
rootDirectory.addChild(usersDirectory);

usersDirectory.addChild(guestDirectory);
usersDirectory.addChild(collinDirectory);

guestDirectory.addChild(guestbookFile);

collinDirectory.addChild(aboutFile);
collinDirectory.addChild(contactFile);

export { rootDirectory };