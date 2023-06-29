import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { MdMailOutline } from 'react-icons/md';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export const InputLogin = styled(Form.Control)`
  background-color: #f3f2f2;
  padding-right: 40px;
  border: none;
`;

export const IconEye = styled(AiOutlineEye)`
  position: 'absolute';
  margin-left: -50.5px;
  color: ${(props) => props.theme.colors.primary};
`;

export const IconEyeSlash = styled(AiOutlineEyeInvisible)`
  position: 'absolute';
  margin-left: -50.5px;
  color: ${(props) => props.theme.colors.primary};
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
