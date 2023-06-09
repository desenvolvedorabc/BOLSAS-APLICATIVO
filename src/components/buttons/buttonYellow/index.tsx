import { ButtonStyled } from './styledComponents';

export default function ButtonYellow({
  children,
  onClick,
  disable = false,
  type = 'button',
}) {
  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disable}>
      {children}
    </ButtonStyled>
  );
}
