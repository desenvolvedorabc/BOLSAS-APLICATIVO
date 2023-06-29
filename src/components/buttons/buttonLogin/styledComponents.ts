import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const ButtonStyled = styled(Button)`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  border: none;
  font-size: 13px;
  min-height: 40px;

  &:hover {
    background-color: ${(props) => props.theme.buttons.defaultActive};
  }
  &:active {
    background-color: ${(props) => props.theme.buttons.defaultActive};
  }
  &:focus {
    background-color: ${(props) => props.theme.buttons.defaultActive};
  }
  &:disabled {
    background-color: ${(props) => props.theme.buttons.defaultDisable};
  }
`;
