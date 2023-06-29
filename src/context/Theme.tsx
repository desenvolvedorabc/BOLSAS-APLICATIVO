import { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from './ThemeContext';

const Theme = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
