import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';

export const Container = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;
`;
export const ButtonVoltar = styled.button`
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.primary};
  margin-right: 7px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconArrowBack = styled(MdArrowBack)`
  color: ${(props) => props.theme.colors.primary};
`;
