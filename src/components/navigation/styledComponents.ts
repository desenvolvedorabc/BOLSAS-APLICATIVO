import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

export const Nav = styled.div`
  min-width: 270px !important;
  width: 270px;
  min-height: 100vh;
  border-right: 1px solid ${(props) => props.theme.colors.primary};
`;

export const SubTitle = styled.div`
  color: white;
  font-size: 11px;
  margin-left: 5px;
  margin-top: 2px;
  line-height: 1;
`;

export const UserWrapper = styled.div`
  background: ${(props) => props.theme.gradients.gradientHorizontal};
  padding: 8px;
  margin-right: -1px;
`;

export const UserInfo = styled.div`
  color: white;
`;

export const ButtonLogout = styled.button`
  background-color: transparent;
  border: none;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Active = styled.div`
  background-color: #f4f2ff;
  color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid rgb(246, 246, 246, 0.15);
  display: flex;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export const ButtonLink = styled.button`
  color: ${(props) => props.theme.colors.dark};
  border: none;
  border-bottom: 1px solid rgb(246, 246, 246, 0.15);
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0.7rem 1rem;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }

  &:focus {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const ImageStyled = styled(Image)`
  cursor: pointer;
`;

export const TitleGroup = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 12px;
  border-bottom: 1px solid rgb(246, 246, 246, 0.15);
  padding: 20px 0px 3px 17px;
`;
