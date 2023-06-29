import { Autocomplete, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { ColorPicker } from 'material-ui-color';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ErrorText from 'src/components/ErrorText';
import InputFile from 'src/components/InputFile';
import { Preview } from 'src/components/Preview';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import ButtonVermelho from 'src/components/buttons/buttonVermelho';
import ButtonWhite from 'src/components/buttons/buttonWhite';
import ModalConfirmacao from 'src/components/modalConfirmacao';
import ModalPergunta from 'src/components/modalPergunta';
import {
  IState,
  createState,
  editState,
} from 'src/services/estados-parceiro.service';
import { ButtonGroupBetween, Card, InputGroup3 } from 'src/shared/styledForms';
import { loadUf } from 'src/utils/combos';
import { parseCookies } from 'src/utils/cookies';
import { formatLink } from 'src/utils/masks';

type ValidationErrors = Partial<{
  name: string;
  cod_ibge: string;
  abbreviation: string;
  color: string;
  logo: string;
}>;

export default function FormEditEstado({ url = null, url_estado, estado }) {
  const [modalShowConfirm, setModalShowConfirm] = useState(false);
  const [modalShowQuestion, setModalShowQuestion] = useState(false);
  const [modalShowWarning, setModalShowWarning] = useState(false);
  const [modalShowConfirmQuestion, setModalShowConfirmQuestion] =
    useState(false);
  const [active, setActive] = useState(estado?.active);
  const [modalStatus, setModalStatus] = useState(true);
  const [logo, setLogo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [listUf, setListUf] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [link, setLink] = useState(
    `${url_estado}/painel/${
      estado?.name ? formatLink(estado?.name) : 'nome-do-estado'
    }/login`,
  );
  const [selectedColor, setSelectedColor] = useState(
    estado?.color ? estado?.color : '#FFFFFF',
  );

  const validate = (values) => {
    const errors: ValidationErrors = {};
    if (!values.name) {
      errors.name = 'Campo obrigatório';
    }
    if (!values.cod_ibge) {
      errors.cod_ibge = 'Campo obrigatório';
    }
    if (!values.abbreviation) {
      errors.abbreviation = 'Campo obrigatório';
    }
    if (!values.color) {
      errors.color = 'Campo obrigatório';
    }
    // if (values?.color?.length < 4 && values.color[0] != '#') {
    //   errors.color = 'Valor inválido';
    // }
    if (!logo && !estado?.logo) {
      errors.logo = 'Campo obrigatório';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: estado?.name,
      cod_ibge: estado?.cod_ibge,
      abbreviation: estado?.abbreviation,
      active: estado?.active,
      logo: estado?.logo,
      color: estado?.color,
    },
    validate,
    onSubmit: async (values) => {
      let file = null;
      if (logo) {
        file = new FormData();
        file.append('avatar', logo);
      }

      let response;
      if (estado) {
        response = await editState(estado?.id, values, file);
      } else response = await createState(values, file);
      if (response.status === 200 || response.status === 201) {
        const cookies = parseCookies();

        setModalStatus(true);
        setModalShowConfirm(true);
        setErrorMessage('');
      } else {
        setModalStatus(false);
        setModalShowConfirm(true);
        setErrorMessage(response?.data?.message);
      }
    },
  });

  useEffect(() => {
    async function fetchAPI() {
      const ufs = await loadUf();
      setListUf(ufs);

      if (estado) {
        setSelectedState(ufs.find((state) => state.id == estado?.cod_ibge));
      }
    }
    fetchAPI();
  }, []);

  async function changeState() {
    setModalShowQuestion(false);
    const data: IState = {
      name: estado?.name,
      cod_ibge: estado?.cod_ibge,
      abbreviation: estado?.abbreviation,
      active: !estado?.active,
      logo: estado?.logo,
      color: estado?.color,
    };

    const response = await editState(estado?.id, data, null);
    if (response.status === 200 && response.data.name === estado?.name) {
      setActive(estado?.active);
      setModalShowConfirmQuestion(true);
    } else {
      setModalStatus(false);
      setModalShowConfirmQuestion(true);
      setErrorMessage(response?.data?.message);
    }
  }

  const onFileChange = (e) => {
    setLogo(e.target.value);
  };

  function hideConfirm() {
    setModalShowConfirm(false);
    if (!errorMessage?.trim()) {
      formik.resetForm();
      Router.back();
      return true;
    }
    // if (modalStatus) Router.reload();
  }

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  const handleSelectState = (newValue) => {
    setSelectedState(newValue);
    formik.setFieldValue('cod_ibge', newValue?.id);
    formik.setFieldValue('abbreviation', newValue?.sigla);
    formik.setFieldValue('name', newValue?.nome);

    if (newValue?.nome) {
      setLink(`${url_estado}/painel/${formatLink(newValue?.nome)}/login`);
    } else {
      setLink(`${url_estado}/painel/nome-do-estado/login`);
    }
  };

  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState, logo]);

  const handleColor = (e) => {
    setSelectedColor('#' + e.hex);
    formik.setFieldValue('color', '#' + e.hex);
  };

  return (
    <>
      <Card>
        <div className="mb-3">
          <strong>{estado ? 'Editar Estado' : 'Novo Estado'}</strong>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onKeyDown={onKeyDown}
        >
          <InputGroup3>
            <div>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                noOptionsText="Estado"
                value={selectedState}
                options={listUf}
                getOptionLabel={(option) => option.nome}
                onChange={(_event, newValue) => {
                  handleSelectState(newValue);
                }}
                renderInput={(params) => (
                  <TextField size="small" {...params} label="Estado" />
                )}
              />
              {formik.errors.name ? (
                <ErrorText>{formik.errors.name}</ErrorText>
              ) : null}
            </div>
            <div>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                noOptionsText="Sigla UF"
                value={selectedState}
                options={listUf}
                getOptionLabel={(option) => option.sigla}
                onChange={(_event, newValue) => {
                  handleSelectState(newValue);
                }}
                renderInput={(params) => (
                  <TextField size="small" {...params} label="Sigla UF" />
                )}
              />
              {formik.errors.abbreviation ? (
                <ErrorText>{formik.errors.abbreviation}</ErrorText>
              ) : null}
            </div>
            <div>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                noOptionsText="Código IBGE"
                value={selectedState}
                options={listUf}
                getOptionLabel={(option) => option.id}
                onChange={(_event, newValue) => {
                  handleSelectState(newValue);
                }}
                renderInput={(params) => (
                  <TextField size="small" {...params} label="Código IBGE" />
                )}
              />
              {formik.errors.cod_ibge ? (
                <ErrorText>{formik.errors.cod_ibge}</ErrorText>
              ) : null}
            </div>
          </InputGroup3>
          <InputGroup3>
            <div style={{ marginTop: 30 }}>
              <div style={{ marginBottom: 20 }}>Logo do Estado</div>
              <InputFile
                label="Foto"
                onChange={(e) => onFileChange(e)}
                error={formik.touched.image_profile}
                acceptFile={'image/*'}
              />
              {formik.errors.logo ? (
                <ErrorText>{formik.errors.logo}</ErrorText>
              ) : null}
            </div>
            <div style={{ marginTop: 30 }}>
              <div style={{ marginBottom: 20 }}>Link do site</div>
              <TextField
                fullWidth
                size="small"
                value={link}
                label="Link do site"
                disabled
                sx={{
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#7C7C7C',
                  },
                }}
              />
            </div>
            <div style={{ marginTop: 30 }}>
              <div style={{ marginBottom: 20 }}>Cor do site</div>
              <ColorPicker
                value={selectedColor}
                defaultValue="#FFFFFF"
                onChange={handleColor}
                disableTextfield
                // inputFormats={['hex']}
              />
              {formik.errors.color ? (
                <ErrorText>{formik.errors.color}</ErrorText>
              ) : null}
            </div>
          </InputGroup3>
          <InputGroup3>
            <div style={{ marginTop: 30 }}>
              <div style={{ marginBottom: 20 }}>Preview Final</div>
              <Preview
                url={url}
                newLogo={logo}
                logo={estado?.logo}
                color={selectedColor ? selectedColor : estado?.color}
              />
            </div>
          </InputGroup3>
          <ButtonGroupBetween style={{ marginTop: 30 }}>
            {estado ? (
              <div>
                {formik.values.active ? (
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
                    setModalShowWarning(true);
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
        show={modalShowConfirm}
        onHide={() => {
          hideConfirm();
        }}
        text={
          modalStatus
            ? estado
              ? `Estado Parceiro ${formik.values.name} alterado com sucesso!`
              : `Estado Parceiro ${formik.values.name} criado com sucesso!`
            : errorMessage
        }
        status={modalStatus}
      />
      <ModalPergunta
        show={modalShowQuestion}
        onHide={() => setModalShowQuestion(false)}
        onConfirm={() => changeState()}
        buttonNo={'Não Remover'}
        buttonYes={'Sim, Tenho Certeza'}
        text={`Você está ${
          !active === true ? 'ativando' : 'desativando'
        } o(a) “${formik.values.name}”. \nVocê pode pode ${
          active === true ? 'ativar' : 'desativar'
        } novamente a qualquer momento.`}
        status={!active}
        size="lg"
      />
      <ModalConfirmacao
        show={modalShowConfirmQuestion}
        onHide={() => {
          setModalShowConfirmQuestion(false);
          modalStatus && Router.reload();
        }}
        text={
          modalStatus
            ? `${formik.values.name} ${
                active === true ? 'desativado' : 'ativado'
              } com sucesso!`
            : errorMessage
            ? errorMessage
            : `Erro ao ${active === true ? 'ativar' : 'desativar'} ${
                formik.values.name
              }`
        }
        status={modalStatus}
      />
      <ModalPergunta
        show={modalShowWarning}
        onHide={() => setModalShowWarning(false)}
        onConfirm={() => Router.back()}
        buttonNo={'Não Descartar'}
        buttonYes={'Descartar'}
        text={`Atenção! Se voltar sem salvar, todas as suas modificações serão descartadas.`}
        status={!active}
        warning={true}
        size="md"
      />
    </>
  );
}
