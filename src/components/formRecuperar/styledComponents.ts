import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { MdMailOutline } from 'react-icons/md';

export const InputLogin = styled(Form.Control)`
  background-color: #f5f5f5;
  padding-right: 40px;
  border: none;
`;
export const IconMail = styled(MdMailOutline)`
  position: 'absolute';
  margin-left: -35px;
`;

export const A = styled.a`
  color: ${(props) => props.theme.colors.dark} !important;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;

  &:hover {
    text-decoration: none !important;
    color: ${(props) => props.theme.colors.dark} !important;
  }
`;
