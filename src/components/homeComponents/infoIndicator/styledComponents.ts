import styled from 'styled-components';

export const Box = styled.div<{ border: boolean }>`
  // margin-right: 15px;
  border-right: ${(props) => (props.border ? '1px solid #d5d5d5' : 'none')};
`;
