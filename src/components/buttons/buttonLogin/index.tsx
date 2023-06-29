import { ButtonStyled } from './styledComponents';

export function ButtonLogin({
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
