import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const ButtonStyled = styled(Button)`
  background-color: ${(props) => props.theme.buttons.alert};
  width: 100%;
  border: none;
  font-size: 12px;
  min-height: 40px;

  &:hover {
    background-color: ${(props) => props.theme.buttons.alertActive};
  }
  &:active {
    background-color: ${(props) => props.theme.buttons.alertActive};
  }
  &:focus {
    background-color: ${(props) => props.theme.buttons.alertActive};
  }
`;
