import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import {
  FormCheckLabel,
  CardBloco,
  TopoCard,
  CheckGroup,
  FormCheck,
} from './styledComponents';
import { Card, ButtonGroupBetween } from 'src/shared/styledForms';
import ButtonWhite from 'src/components/buttons/buttonWhite';
import ErrorText from 'src/components/ErrorText';
import ModalConfirmacao from 'src/components/modalConfirmacao';
import { useEffect, useState, useMemo } from 'react';
import Router from 'next/router';
import ModalPergunta from 'src/components/modalPergunta';
import { createPerfil, editPerfil } from 'src/services/perfis.service';
import { getAllAreas } from 'src/services/areas.service';
import ButtonVermelho from 'src/components/buttons/buttonVermelho';
import { TextField } from '@mui/material';
import { ADMINLINKS } from 'src/utils/menu';

type ValidationErrors = Partial<{ name: string; areas: string }>;

export default function FormEditPerfil({ perfil }) {
  const [ModalShowConfirm, setModalShowConfirm] = useState(false);
  const [modalStatus, setModalStatus] = useState(true);
  const [modalMessageError, setModalMessageError] = useState('');
  const [modalShowQuestion, setModalShowQuestion] = useState(false);
  const [modalShowConfirmQuestion, setModalShowConfirmQuestion] =
    useState(false);
  const [active, setActive] = useState(perfil?.active);
  const [listAreas, setListAreas] = useState([]);

  const getAreasName = () => {
    const list = [];
    if (perfil)
      perfil?.areas?.map((x) => {
        list.push(x?.tag);
      });
    return list;
  };
  const [oldAreas, setOldAreas] = useState(perfil?.areas);

  const validate = (values) => {
    const errors: ValidationErrors = {};
    if (!values?.name?.trim()) {
      errors.name = 'Campo obrigatório';
    } else if (values?.name?.trim().length < 6) {
      errors.name = 'Deve ter no minimo 6 caracteres';
    }
    if (values?.areas?.length === 0) {
      errors.areas = 'Deve conter no minimo uma função';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: perfil?.name,
      areas: getAreasName(),
      active: perfil?.active,
      role: 'PARC',
    },
    validate,
    onSubmit: async (values) => {
      const list = [];
      if (!perfil?.id) {
        const arrayHome = ['HOME'];

        arrayHome.forEach((x) => {
          listAreas.forEach((area) => {
            if (x === area.tag) list.push({ id: area.id });
          });
        });
      }

      values.areas.forEach((x) => {
        listAreas.forEach((area) => {
          if (x === area.tag) list.push({ id: area.id });
        });
      });

      values.areas = list;

      let response;
      if (perfil) {
        response = await editPerfil(perfil?.id, values);
      } else response = await createPerfil(values);

      if (response.status === 200 || response.status === 201) {
        setModalStatus(true);
        setModalShowConfirm(true);
      } else {
        setModalMessageError(response.data.message);
        setModalStatus(false);
        setModalShowConfirm(true);
      }
    },
  });

  async function changePerfil() {
    setModalShowQuestion(false);
    const data = perfil;
    data.active = !active;

    const list = [];
    data.areas.map((x) => {
      list.push({ id: x.id });
    });
    data.areas = list;

    const response = await editPerfil(perfil.id, data);
    if (response.status === 200 || response.status === 201) {
      setActive(!active);
      setModalShowConfirmQuestion(true);
      setModalStatus(true);
    } else {
      setModalMessageError(response.data.message);
      setModalStatus(false);
      setModalShowConfirmQuestion(true);
    }
  }

  const loadAreas = async () => {
    const resp = await getAllAreas();
    if (resp.data.length > 0) setListAreas(resp.data);
  };

  useEffect(() => {
    loadAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterLinks = useMemo(() => {
    const filter = ADMINLINKS.map((data) => {
      let isVerify = false;
      listAreas.forEach((area) => {
        if (area.tag === data.ARE_NOME) {
          isVerify = true;
        }
      });

      if (isVerify) {
        return data;
      } else {
        const options = data.items.filter((item) => {
          let verifyItem = false;

          listAreas.forEach((area) => {
            if (area.tag === item.ARE_NOME) {
              verifyItem = true;
            }
          });

          return verifyItem;
        });

        if (options.length) {
          return {
            grupo: data.grupo ? data.grupo : 'GERAL',
            items: options,
          };
        }
      }
    });

    return filter;
  }, [listAreas]);

  const verifyCheckAreas = (name) => {
    const check = oldAreas.find((x) => name === x.tag);
    if (check) return true;
    return false;
  };

  const selectAll = (grupo) => {
    filterLinks.forEach((link) => {
      const list = formik.values.areas;
      if (link?.grupo === grupo) {
        link?.items.forEach((item) => {
          if (!formik.values.areas.includes(item.ARE_NOME)) {
            document.getElementById(item.ARE_NOME).click();
            list.push(item.ARE_NOME);
          }
        });
      }
      formik.values.areas = list;
    });

    formik.validateForm();
  };

  return (
    <>
      <Card>
        <div className="mb-3">
          <strong>Novo Perfil de Usuário</strong>
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <div className="d-flex">
            <div className="col-4">
              <Form.Label>Nome do Perfil</Form.Label>
              <div className="mb-2">
                <TextField
                  fullWidth
                  label="Nome do Perfil"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  size="small"
                />
                {formik.errors.name ? (
                  <ErrorText>{formik.errors.name}</ErrorText>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <div className="mt-5 mb-3">Permissões:</div>
            <CardBloco>
              <TopoCard>
                <div style={{ fontWeight: 500 }}></div>
                <div style={{ width: 152 }}>
                  <ButtonPadrao
                    disable
                    onClick={() => {
                      null;
                    }}
                  >
                    Marcar Todos
                  </ButtonPadrao>
                </div>
              </TopoCard>
              <CheckGroup>
                <FormCheck className="col-11">
                  <Form.Check.Input
                    onChange={null}
                    value={'Home'}
                    name="areas"
                    type={'checkbox'}
                    disabled
                    defaultChecked={true}
                  />
                  <FormCheckLabel>
                    <div>Home</div>
                  </FormCheckLabel>
                </FormCheck>
                <FormCheck className="col-11">
                  <Form.Check.Input
                    onChange={null}
                    value={'Minha Conta'}
                    name="areas"
                    type={'checkbox'}
                    disabled
                    defaultChecked={true}
                  />
                  <FormCheckLabel>
                    <div>Minha Conta</div>
                  </FormCheckLabel>
                </FormCheck>
              </CheckGroup>
            </CardBloco>
            {filterLinks.map((link) => (
              <>
                {link && (
                  <CardBloco key={link?.grupo}>
                    <TopoCard>
                      <div style={{ fontWeight: 500 }}>{link?.grupo}</div>
                      <div style={{ width: 152 }}>
                        <ButtonPadrao
                          onClick={() => {
                            selectAll(link?.grupo);
                          }}
                        >
                          Marcar Todos
                        </ButtonPadrao>
                      </div>
                    </TopoCard>
                    <CheckGroup>
                      {link?.items.map((x) => (
                        <FormCheck key={x.name} id={x.name} className="col-11">
                          <Form.Check.Input
                            onChange={formik.handleChange}
                            value={x.ARE_NOME}
                            name="areas"
                            id={x.ARE_NOME}
                            type={'checkbox'}
                            disabled={
                              x.ARE_NOME === 'HOME' || x.ARE_NOME === 'MIN_CON'
                            }
                            defaultChecked={
                              x.ARE_NOME === 'HOME'
                                ? true
                                : x.ARE_NOME === 'MIN_CON'
                                ? true
                                : perfil?.id && verifyCheckAreas(x.ARE_NOME)
                            }
                          />
                          <FormCheckLabel>
                            <div>{x.name}</div>
                          </FormCheckLabel>
                        </FormCheck>
                      ))}
                    </CheckGroup>
                  </CardBloco>
                )}
              </>
            ))}
          </div>
          <ButtonGroupBetween style={{ marginTop: 30 }}>
            {perfil ? (
              <div style={{ width: 160 }}>
                {active ? (
                  <ButtonVermelho
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShowQuestion(true);
                    }}
                  >
                    Desativar
                  </ButtonVermelho>
                ) : (
                  <ButtonPadrao
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShowQuestion(true);
                    }}
                  >
                    Ativar
                  </ButtonPadrao>
                )}
              </div>
            ) : (
              <div></div>
            )}
            <div className="d-flex">
              <div style={{ width: 160 }}>
                <ButtonWhite
                  onClick={(e) => {
                    e.preventDefault();
                    Router.back();
                  }}
                >
                  Cancelar
                </ButtonWhite>
              </div>
              <div className="ms-3" style={{ width: 160 }}>
                <ButtonPadrao
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                  }}
                  disable={!formik.isValid}
                >
                  Salvar
                </ButtonPadrao>
              </div>
            </div>
          </ButtonGroupBetween>
        </Form>
      </Card>
      <ModalConfirmacao
        show={ModalShowConfirm}
        onHide={() => {
          setModalShowConfirm(false), modalStatus && Router.reload();
        }}
        text={
          modalStatus
            ? `Perfil ${formik.values.name} ${
                perfil ? 'alterado' : 'criado'
              } com sucesso!`
            : modalMessageError
        }
        status={modalStatus}
      />
      <ModalPergunta
        show={modalShowQuestion}
        onHide={() => setModalShowQuestion(false)}
        onConfirm={() => changePerfil()}
        buttonNo={!active ? 'Não Ativar' : 'Não Desativar'}
        buttonYes={'Sim, Tenho Certeza'}
        text={`Você está ${
          !active === true ? 'ativando' : 'desativando'
        } esse Perfil de Acesso. Tem certeza que deseja continuar?`}
        status={!active}
        size="lg"
      />
      <ModalConfirmacao
        show={modalShowConfirmQuestion}
        onHide={() => {
          setModalShowConfirmQuestion(false);
        }}
        text={
          modalStatus
            ? `${formik.values.name} ${
                active === true ? 'ativado' : 'desativado'
              } com sucesso!`
            : modalMessageError
        }
        status={modalStatus}
      />
    </>
  );
}
