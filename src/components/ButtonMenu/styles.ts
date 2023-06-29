import styled from 'styled-components';
import { Button, MenuItem } from '@mui/material';

export const ButtonMenu = styled(Button)`
  font-family: 'Inter', sans-serif;
  color: ${(props) => props.theme.colors.primary} !important;
  font-weight: 400;
  text-transform: none !important;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  font-style: italic;
  height: 40px;

  &:hover {
    background-color: #fff;
  }
`;

export const MenuItemStyled = styled(MenuItem)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  margin: 0 14px;
`;
