import { OutputType } from "../commandEvaluator";

export const help = (args: string[]): { output: string; type: OutputType } => {
  if (args.length === 0) {
    return {
      output: `CollinOS available commands: 

  cd <directory>               change directory
  ls <?directory>              list directory contents (default: current directory)
  pwd                          print working directory
  cat <file>                   output file contents
  theme                        manage the terminal theme
  mkdir <directory-names>      create a new directory
  touch <file-name>            create a new file
  rm <file-name>               remove a file
  rm -r <directory-names>      remove a directory
  clear                        clear the terminal
  flush                        flush the terminal
  history                      display the command history
  help <?command>              display this help message, pass an optional command to get help for that specific command
      `,
      type: 'success'
    }
  } else if (args.length > 1) {
    return {
      output: `too many arguments supplied to help, expected 0 or 1, got ${args.length}`,
      type: 'error'
    }
  } else {
    const command = args[0];
    switch (command) {
      case 'cd':
        return {
          output: `cd <directory>    navigate between directory`,
          type: 'success'
        }
      case 'ls':
        return {
          output: `ls <?directory>    list directory contents. optionally provide the directory to list from, defaults to the current working directory.`,
          type: 'success'
        }
      case 'pwd':
        return {
          output: `pwd    print the current working directory`,
          type: 'success'
        }
      case 'cat':
        return {
          output: `cat <file>    print the content of the specified file`,
          type: 'success'
        }
      case 'theme':
        return {
          output: `theme set <theme-name>    change the terminal theme. Supported themes: \`light\`, \`dark\`, or \`solarized\`
theme list                list available themes
theme current             display the current theme`,
          type: 'success'
        }
      case 'mkdir':
        return {
          output: `mkdir <directory-name>    create one or many new directories`,
          type: 'success'
        }
      case 'touch':
        return {
          output: `touch <file-names>    create one or many new files`,
          type: 'success'
        }
      case 'rm':
        return {
          output: `rm <file-names>            remove one or many files
rm -r <directory-names>    remove one or many directories`,
          type: 'success'
        }
      case 'clear':
        return {
          output: `clear    clear the terminal`,
          type: 'success'
        }
      case 'flush':
        return {
          output: `flush    flush the terminal`,
          type: 'success'
        }
      case 'history':
        return {
          output: `history    display the command history`,
          type: 'success'
        }
      case 'help':
        return {
          output: `help    display this help message`,
          type: 'success'
        }
      default:
        return {
          output: `Unrecognized command: ${command}`,
          type: 'error'
        }
    }
  }
}