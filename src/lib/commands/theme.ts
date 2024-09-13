import { ThemeName, VALID_THEME_NAMES } from "@/providers/ThemeProvider";
import { OutputType } from "../commandEvaluator";

export const theme = (args: string[], currentTheme: ThemeName, setTheme: (themeName: ThemeName) => void): { output: string, type: OutputType } => {
  if (args.length === 0) {
    return {
      output: `Please provide a theme name\nUsage: theme set <theme-name>\nSupported themes are: ${VALID_THEME_NAMES.join(', ')}.`,
      type: 'success'
    }
  } else {
    const themeCommand = args[0];
    if (themeCommand === 'set') {
      const themeName = args[1];
      if (!themeName) {
        return {
          output: `Please provide a theme name\nUsage: theme set <theme-name>\nSupported themes are: ${VALID_THEME_NAMES.join(', ')}.`,
          type: 'error'
        }
      } else if(VALID_THEME_NAMES.includes(themeName)) {
        setTheme(themeName);
        return { output: 'theme updated', type: 'success' };
      } else {
        return {
          output: `Unsupported theme name: ${themeName}. Supported themes are: ${VALID_THEME_NAMES.join(', ')}.`,
          type: 'error'
        }
      }
    } else if (themeCommand === 'current') {
      return { output: `Current theme: ${currentTheme}`, type: 'success' };
    } else if (themeCommand === 'list') {
      return { output: VALID_THEME_NAMES.join('\n'), type: 'success' };
    } else {
      return {
        output: `Unsupported theme command: ${themeCommand}. Supported commands: set, current, list`,
        type: 'error'
      }
    }
  }
}

export default theme;