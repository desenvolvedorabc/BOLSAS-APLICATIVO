import styled from 'styled-components';
import ReactLoading from 'react-loading';

export const Screen = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  opacity: 0;
  animation: fade 0.4s ease-in forwards;
  //background: #FFF;
  display: flex;
  align-items: center;
  jsutify-content: center;

  @keyframes fade {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Loading = styled(ReactLoading)`
  color= ${(props) => props.theme.colors.secondary}
`;
