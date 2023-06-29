import { CardStyled, Name, Role, Logo } from './styledComponents';
import Router from 'next/router';
import Image from 'next/image';
import {
  MdOutlineEmail,
  MdOutlinePhoneAndroid,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import ButtonWhite from 'src/components/buttons/buttonWhite';
import ModalConfirmacao from 'src/components/modalConfirmacao';
import { useState } from 'react';
import { resendEmailPassword } from 'src/services/usuarios.service';
import { maskCPF, maskPhone } from 'src/utils/masks';
import { IconColor } from 'src/shared/styledComponents';

export default function CardInfoUsuarioRelatorio({ usuario }) {
  const [ModalShowConfirm, setModalShowConfirm] = useState(false);
  const [modalStatus, setModalStatus] = useState(true);

  const sendEmail = async () => {
    const resp = await resendEmailPassword(usuario?.id);
    if (resp.status === 200) {
      setModalStatus(true);
    } else {
      setModalStatus(false);
    }

    setModalShowConfirm(true);
  };

  return (
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
                alt="avatar"
              />
            ) : (
              <Image
                src="/assets/images/avatar.png"
                className="rounded-circle"
                width={170}
                height={170}
                alt="avatar"
              />
            )}
          </Logo>
          <div className="ms-4">
            <Name>
              <strong>{usuario?.name}</strong>
            </Name>
            <Role>
              {usuario?.access_profile?.name} - {usuario?.role}
            </Role>
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
                  <div className="ms-2 mb-3">{maskCPF(usuario?.cpf)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" d-flex align-items-end justify-content-end">
          {!usuario?.isChangePasswordWelcome && (
            <div className="" style={{ width: 140 }}>
              <ButtonWhite
                onClick={() => {
                  sendEmail();
                }}
              >
                Reenviar Email
              </ButtonWhite>
            </div>
          )}
          <div className="ms-2" style={{ width: 140 }}>
            <ButtonPadrao
              onClick={() => {
                Router.push(`/usuario-admin/editar/${usuario?.id}`);
              }}
            >
              Editar
            </ButtonPadrao>
          </div>
        </div>
      </div>
      <ModalConfirmacao
        show={ModalShowConfirm}
        onHide={() => {
          setModalShowConfirm(false);
        }}
        text={
          modalStatus ? `Email enviado com sucesso` : `Erro ao enviar email`
        }
        status={modalStatus}
      />
    </CardStyled>
  );
}
