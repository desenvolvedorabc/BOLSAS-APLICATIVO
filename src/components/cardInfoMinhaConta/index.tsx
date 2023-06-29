import { useState } from 'react';
import { CardStyled, Name, Role, Logo } from './styledComponents';
import Image from 'next/image';
import {
  MdOutlineEmail,
  MdOutlinePhoneAndroid,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import ButtonWhite from 'src/components/buttons/buttonWhite';
import ModalEditarMinhaConta from 'src/components/modalEditarMinhaConta';
import ModalTrocarSenha from 'src/components/modalTrocarSenha';
import { maskCPF, maskPhone } from 'src/utils/masks';
import { IconColor } from 'src/shared/styledComponents';

export default function CardInfoMinhaConta({ usuario, url }) {
  const [modalEditarMinhaConta, setModalEditarMinhaConta] = useState(false);
  const [modalTrocarSenha, setModalTrocarSenha] = useState(false);

  return (
    <>
      {usuario && (
        <>
          <CardStyled>
            <div className="d-flex justify-content-between col-12">
              <div className="d-flex align-items-center">
                <Logo className="rounded-circle">
                  {usuario?.image_profile ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${usuario?.image_profile_url}`}
                      className="rounded-circle"
                      width={160}
                      height={160}
                      alt={'avatar'}
                    />
                  ) : (
                    <Image
                      src="/assets/images/avatar.png"
                      className="rounded-circle"
                      width={160}
                      height={160}
                      alt={'avatar'}
                    />
                  )}
                </Logo>
                <div className="ms-4">
                  <Name>
                    <strong>{usuario?.name}</strong>
                  </Name>
                  <Role>{usuario?.access_profile?.name}</Role>
                  <div className="d-flex">
                    <div className="pe-4">
                      <div className="d-flex">
                        <IconColor>
                          <MdOutlineEmail size={24} />
                        </IconColor>
                        <div className="ms-2 mb-3">{usuario?.email}</div>
                      </div>
                      <div className="d-flex">
                        <IconColor>
                          <MdOutlinePhoneAndroid size={24} />
                        </IconColor>
                        <div className="ms-2 mb-3">
                          {maskPhone(usuario?.telephone)}
                        </div>
                      </div>
                      <div className="d-flex">
                        <IconColor>
                          <MdOutlineAccountCircle size={24} />
                        </IconColor>
                        <div className="ms-2 mb-3">{maskCPF(usuario.cpf)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-2 d-flex flex-column align-items-end justify-content-between">
                <div style={{ width: 140 }}>
                  <ButtonPadrao
                    onClick={() => {
                      setModalEditarMinhaConta(true);
                    }}
                  >
                    Editar
                  </ButtonPadrao>
                </div>
                <div style={{ width: 140 }}>
                  <ButtonWhite
                    onClick={() => {
                      setModalTrocarSenha(true);
                    }}
                  >
                    Redefinir Senha
                  </ButtonWhite>
                </div>
              </div>
            </div>
          </CardStyled>
          {usuario && (
            <ModalEditarMinhaConta
              show={modalEditarMinhaConta}
              onHide={() => {
                setModalEditarMinhaConta(false);
              }}
              usuario={usuario}
              url={url}
            />
          )}
          <ModalTrocarSenha
            show={modalTrocarSenha}
            onHide={() => {
              setModalTrocarSenha(false);
            }}
            usuario={usuario}
          />
        </>
      )}
    </>
  );
}
