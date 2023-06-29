import Image from 'next/image';
import {
  A,
  BodyStyled,
  ButtonPreview,
  CardStyled,
  Container,
  HeaderStyled,
  IconEye,
  IconMail,
  ImageBox,
  InputLogin,
  LoginContentStyled,
} from './styledComponents';

export function Preview({ url, newLogo, logo, color }) {
  return (
    <Container color={color}>
      <LoginContentStyled>
        <CardStyled>
          <HeaderStyled color={color}>
            <ImageBox>
              {newLogo ? (
                <Image
                  src={URL.createObjectURL(newLogo)}
                  width={35}
                  height={25}
                  alt="Logo"
                />
              ) : (
                logo && (
                  <img
                    src={`${url}/users/avatar/${logo}`}
                    width={35}
                    height={25}
                  />
                )
              )}
            </ImageBox>
          </HeaderStyled>
          <BodyStyled>
            <div>
              <InputLogin>
                <div>Email</div>
                <div>
                  <IconMail color={'#7C7C7C'} size={8} />
                </div>
              </InputLogin>
            </div>
            <div style={{ marginTop: 3 }}>
              <InputLogin>
                <div>Senha</div>
                <div>
                  <IconEye color={'#7C7C7C'} size={8} />
                </div>
              </InputLogin>
            </div>
            <div>
              <ButtonPreview color={color}>Entrar</ButtonPreview>
            </div>
            <div>
              <A color={color}>Esqueci Minha Senha</A>
            </div>
            {/* <div style={{ transform: 'scale(0.8)' }}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <div className="d-flex align-items-center">
                    <InputLogin
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={() => null}
                      disabled
                    />
                    
                  </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <div className="d-flex align-items-center">
                    <InputLogin
                      name="password"
                      placeholder="Senha"
                      onChange={() => null}
                      disabled
                    />
                    <button type="button" onClick={() => null}>
                      <IconEye size={22} />
                    </button>
                  </div>
                </Form.Group>
                <div>
                  <ButtonLogin
                    type="submit"
                    onClick={(e) => null}
                    disable={true}
                  >
                    Entrar
                  </ButtonLogin>
                </div>
              </Form>
              <div className="mt-3">
                <Link href="/recuperar-senha" passHref>
                  <A>Esqueci Minha Senha</A>
                </Link>
              </div>
            </div> */}
          </BodyStyled>
        </CardStyled>
      </LoginContentStyled>
    </Container>
  );
}
