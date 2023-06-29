import { Screen } from './styledComponents';
import ReactLoading from 'react-loading';
import { useContext } from 'react';
import { ThemeContext } from 'src/context/ThemeContext';
const LoadingScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Screen>
      <div className="m-auto">
        <ReactLoading
          type={'spin'}
          color={theme?.colors?.primary}
          height={70}
          width={70}
        />
      </div>
    </Screen>
  );
};

export default LoadingScreen;
