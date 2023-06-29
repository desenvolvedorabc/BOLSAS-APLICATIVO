import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export const BoxPassword = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 25px;
`;
export const BoxItem = styled.div`
  text-align: start;
  flex-direction: row;
  font-size: 14px;
`;

export const IconEye = styled(AiOutlineEye)`
  position: 'absolute';
  margin-left: -35px;
  color: ${(props) => props.theme.colors.primary};
`;

export const IconEyeSlash = styled(AiOutlineEyeInvisible)`
  position: 'absolute';
  margin-left: -35px;
  color: ${(props) => props.theme.colors.primary};
`;

export const InputLogin = styled(Form.Control)`
  background-color: #f5f5f5;
  padding-right: 40px;
`;
export const TitlePassword = styled.div`
  text-align: start;
  font-size: 14px;
`;
