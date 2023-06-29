import { Card, Form } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdMailOutline } from 'react-icons/md';
import styled from 'styled-components';
const image = '/assets/images/imageLogin2.png';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  width: 21.688rem;
  height: 15.375rem;
  background: linear-gradient(
    180deg,
    ${(props) => (props.color ? darken(0.1, props.color) : '#fff')} 0%,
    ${(props) => (props.color ? lighten(0.2, props.color) : '#fff')} 100%
  );
`;

export const LoginContentStyled = styled.div`
  background-image: url(${image});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const CardStyled = styled(Card)`
  text-align: center;
  border: none;
  border-radius: 15px 15px 10px 10px;
  width: 7rem;
`;
export const HeaderStyled = styled(Card.Header)`
  background: ${(props) => props.color};
  color: white;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4.5px;
  padding-bottom: 4.5px;
  height: 45px;
`;
export const BodyStyled = styled(Card.Body)`
  // padding: 35px;
`;

export const ImageBox = styled.div`
  margin: auto;
  // margin-top: 3px;
  // margin-bottom: 3px;
`;

export const InputLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e9f1f4;
  border: none;
  width: 5.125rem;
  // height: 0.625rem;
  font-size: 7px;
  padding: 4px;
  color: #8a7982;
  border-radius: 3px;
`;

export const ButtonPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  color: #fff;
  width: 5.125rem;
  // height: 0.625rem;
  font-size: 6px;
  border-radius: 3px;
  padding: 2px 0;
  margin-top: 4px;
`;

export const IconEye = styled(AiOutlineEye)`
  position: 'absolute';
  margin-left: -15px;
  color: ${(props) => props.theme.colors.primary};
`;

export const IconMail = styled(MdMailOutline)`
  position: 'absolute';
  margin-left: -15px;
`;

export const A = styled.a`
  color: ${(props) =>
    props.color ? darken(0.2, props.color) : '#000'} !important;
  font-size: 6px;
  font-weight: 500;
`;
