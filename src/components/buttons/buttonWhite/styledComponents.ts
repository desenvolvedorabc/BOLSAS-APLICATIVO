import { Button } from 'react-bootstrap';
import styled, { css } from 'styled-components';

type Props = {
  border: boolean;
};

export const ButtonStyled = styled(Button)<Props>`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.buttons.default};
  color: ${(props) => props.theme.buttons.default};
  min-height: 40px;
  font-size: 12px;
  width: 100%;
  line-height: 15px;

  ${(props) =>
    !props.border &&
    css`
      border: 0;
    `}

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.buttons.defaultActive};
    border: 1px solid ${(props) => props.theme.buttons.defaultActive};
  }

  &:disabled {
    background-color: #fff;
    color: ${(props) => props.theme.buttons.defaultDisable};
    border: 1px solid ${(props) => props.theme.buttons.defaultDisable};
  }
`;
