import { createContext, useState } from 'react';
import { parc } from 'src/styles/themes';

const ThemeContext = createContext(null); // line A - creating the context

const ThemeStore = ({ children }) => {
  const [theme, setTheme] = useState(parc); // line B - setting the initial theme

  const changeTheme = (theme) => setTheme(theme); // line C - changing the theme

  return (
    <ThemeContext.Provider value={{ changeTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeStore, ThemeContext };
