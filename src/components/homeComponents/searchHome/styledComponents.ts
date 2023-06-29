import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const FormStyled = styled(Form)`
  width: 855px;
  margin-left: 1.375rem;
  margin-right: 5.25rem;
`;

export const Button = styled.button`
  background-color: transparent;
  height: 2.188rem;
  border: none;
  border-radius: 0.25rem;
  margin-left: -30px;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const ButtonClose = styled.button`
  background-color: #fff;
  height: 35px;
  width: 35px;
  border: none;
  padding: 0;
`;

export const RespBox = styled.div`
  position: absolute;
  top: 5.2rem;
  width: 53.125rem;
  z-index: 3;
  background-color: #fff;
  padding: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  max-height: 350px;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const Title = styled.div`
  padding-bottom: 5px;
`;

export const Text = styled.div`
  padding: 5px 3px;
  border-radius: 3px;

  &:hover {
    background-color: #5ec2b1;
  }
`;
