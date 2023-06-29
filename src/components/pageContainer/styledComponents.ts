import styled from 'styled-components';

export const PageContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 25px;
  background-color: #f6f6f6;
  width: 100%;
  min-height: 100vh;
  height: '100% !important';
  section {
    width: 100%;
    > header {
      padding-top: 10px;
      padding-right: 22px;
      background: #ffffff;
      width: 100%;
      display: flex;
      justify-content: space-between;

      > div {
        padding-top: 0;
      }

      /* align-items: center; */
    }
  }
`;

export const Saev = styled.div`
  display: flex;
  align-self: end;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 10px;
  color: #7c7c7c;
  margin-right: 3px;
`;
