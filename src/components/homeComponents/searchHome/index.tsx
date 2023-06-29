import { useEffect, useState } from 'react';
import useDebounce from '../../../utils/use-debounce';
import { Form } from 'react-bootstrap';
import { MdSearch, MdClose } from 'react-icons/md';
import { getUsers, IGetUser } from 'src/services/usuarios.service';
import {
  Button,
  RespBox,
  Title,
  Text,
  ButtonClose,
  FormStyled,
} from './styledComponents';
import Link from 'next/link';
import { IconColor } from 'src/shared/styledComponents';
import { getPerfis } from 'src/services/perfis.service';
import { getStates } from 'src/services/estados-parceiro.service';

export default function SearchHome() {
  const [isRespOpen, setIsRespOpen] = useState(false);

  const handleRespOpen = () => {
    setIsRespOpen(!isRespOpen);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosState, setUsuariosState] = useState([]);
  const [perfils, setPerfils] = useState([]);
  const [states, setStates] = useState([]);
  const [resultCount, setResultCount] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      setResultCount(0);

      if (debouncedSearchTerm) {
        setUsuarios([]);
        searchCharacters(debouncedSearchTerm);
        if (!isRespOpen) handleRespOpen();
      } else {
        setResultCount(0);
        setUsuarios([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm],
  );

  // API search function
  async function searchCharacters(search) {
    let count = 0;

    const dataParc: IGetUser = {
      search: search,
      page: 1,
      limit: 9999999,
      order: 'ASC',
      status: null,
      profile: null,
    };

    const dataState: IGetUser = {
      search: search,
      page: 1,
      limit: 9999999,
      order: 'ASC',
      status: null,
      profile: null,
      role: 'ESTADO',
    };

    const respUsersParc = await getUsers(dataParc);
    count += respUsersParc.data?.items?.length;

    const respUsersState = await getUsers(dataState);
    count += respUsersState.data?.items?.length;

    const respPerfil = await getPerfis(search, 1, 99999, 'ASC');
    count += respPerfil.data?.items?.length;

    const respState = await getStates(search, 1, 99999, 'ASC', null);
    count += respState.data?.items?.length;

    setResultCount(count);
    setUsuarios(respUsersParc?.data?.items ? respUsersParc?.data?.items : []);
    setUsuariosState(
      respUsersState?.data?.items ? respUsersState?.data?.items : [],
    );
    setPerfils(respPerfil?.data?.items ? respPerfil?.data?.items : []);
    setStates(respState?.data?.items ? respState?.data?.items : []);
  }

  return (
    <FormStyled className="col">
      <Form.Group controlId="formBasicEmail">
        <div className="d-flex align-items-center">
          <Form.Control
            className="pe-5"
            type="text"
            name="search"
            placeholder="Faça uma busca no sistema"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="button" onClick={handleRespOpen}>
            <IconColor>
              <MdSearch />
            </IconColor>
          </Button>
        </div>
        <div className="col-12">
          {isRespOpen && (
            <RespBox className="col-7">
              <div className="d-flex justify-content-between align-items-center">
                <div>Resultados Encontrados ({resultCount})</div>
                <ButtonClose type="button" onClick={handleRespOpen}>
                  <MdClose color={'#3E8277'} />
                </ButtonClose>
              </div>
              {usuarios.length > 0 && (
                <>
                  <hr />
                  <Title>
                    <strong>Usuários</strong>
                  </Title>
                  {usuarios.map((result) => (
                    <div key={result.id}>
                      <Link href={`usuario-admin/${result.id}`} passHref>
                        <Text>{result.name}</Text>
                      </Link>
                    </div>
                  ))}
                </>
              )}
              {usuariosState.length > 0 && (
                <>
                  <hr />
                  <Title>
                    <strong>Usuários do Estado</strong>
                  </Title>
                  {usuariosState.map((result) => (
                    <div key={result.id}>
                      <Link href={`usuario-estado/${result.id}`} passHref>
                        <Text>{result.name}</Text>
                      </Link>
                    </div>
                  ))}
                </>
              )}
              {perfils.length > 0 && (
                <>
                  <hr />
                  <Title>
                    <strong>Perfil de Acesso</strong>
                  </Title>
                  {perfils.map((result) => (
                    <div key={result.id}>
                      <Link
                        href={`perfil-de-usuario/editar/${result.id}`}
                        passHref
                      >
                        <Text>{result.name}</Text>
                      </Link>
                    </div>
                  ))}
                </>
              )}
              {states.length > 0 && (
                <>
                  <hr />
                  <Title>
                    <strong>Estados Parceiros</strong>
                  </Title>
                  {states.map((result) => (
                    <div key={result.id}>
                      <Link
                        href={`estado-parceiro/editar/${result.id}`}
                        passHref
                      >
                        <Text>{result.name}</Text>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </RespBox>
          )}
        </div>
      </Form.Group>
    </FormStyled>
  );
}
