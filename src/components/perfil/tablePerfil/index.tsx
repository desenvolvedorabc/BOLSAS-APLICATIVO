import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Container, TopContainer } from './styledComponents';
import {
  InputSearch,
  IconSearch,
  TableCellBorder,
  Pagination,
  FormSelectStyled,
  ButtonPage,
  TableCellStyled,
  TableRowStyled,
  TableSortLabelStyled,
  Status,
  Circle,
} from 'src/shared/styledTables';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';

import Router from 'next/router';
import Link from 'next/link';
import { getPerfis } from 'src/services/perfis.service';

interface Data {
  id: string;
  createdByUser: string;
  name: string;
  areas: string;
  active: boolean;
}

function createData(
  id: string,
  createdByUser: string,
  name: string,
  areas: string,
  active: boolean,
): Data {
  return {
    id,
    createdByUser,
    name,
    areas,
    active,
  };
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'PERFIL',
  },
  {
    id: 'createdByUser',
    numeric: false,
    label: 'CRIADO POR',
  },
  {
    id: 'areas',
    numeric: false,
    label: 'ÁREAS HABILITADAS',
  },
  {
    id: 'active',
    numeric: false,
    label: 'STATUS',
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCellStyled
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'name' ? (
              <TableSortLabelStyled
                active={orderBy === headCell.id}
                direction={order === 'asc' ? 'desc' : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabelStyled>
            ) : (
              <div style={{ fontWeight: 600 }}>{headCell.label}</div>
            )}
          </TableCellStyled>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TablePerfil() {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(1);
  const [qntPage, setQntPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = order === 'asc';
    const formattedOrder = isAsc ? 'desc' : 'asc';
    setOrder(formattedOrder);
    loadPerfis(search, page, limit, formattedOrder);
  };

  useEffect(() => {
    setDisablePrev(page === 1 ? true : false);
    setDisableNext(page === qntPage ? true : false);
  }, [qntPage, page]);

  const handleChangePage2 = (direction) => {
    if (direction === 'prev') {
      setPage(page - 1);
      loadPerfis(search, page - 1, limit, order);
    } else {
      setPage(page + 1);
      loadPerfis(search, page + 1, limit, order);
    }
  };
  const handleChangeLimit = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1);
    loadPerfis(search, 1, Number(event.target.value), order);
  };

  useEffect(() => {
    loadPerfis(search, page, limit, order);
  }, [search]);

  const [rows, setRows] = useState([]);

  const getAreas = (areasList) => {
    let list = '';
    areasList.map((x, index) => {
      if (index != areasList.length - 1) list = list.concat(x.name, ', ');
      else list = list.concat(x.name);
    });

    return list;
  };

  async function loadPerfis(
    search: string,
    page: number,
    limit: number,
    order: string,
  ) {
    const respSubPerfis = await getPerfis(
      search,
      page,
      limit,
      order.toUpperCase(),
    );

    const list = [];
    setQntPage(respSubPerfis.data.meta?.totalPages);

    const areas = '';

    respSubPerfis.data.items?.map((x) => {
      list.push(
        createData(
          x.id,
          x.createdByUser?.name,
          x.name,
          getAreas(x.areas),
          x.active,
        ),
      );
    });
    setRows(list);
  }

  useEffect(() => {
    loadPerfis(search, page, limit, order);
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * limit - rows.length) : 0;

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <TopContainer>
        <div className="d-flex flex-row-reverse align-items-center ms-2">
          <InputSearch
            size={16}
            type="text"
            placeholder="Pesquise"
            name="searchTerm"
            onChange={handleChangeSearch}
          />
          <IconSearch color={'#7C7C7C'} />
        </div>
        <div>
          <ButtonPadrao
            onClick={() => {
              Router.push('/perfil-de-usuario');
            }}
          >
            Adicionar Perfil
          </ButtonPadrao>
        </div>
      </TopContainer>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
        >
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />

              <TableBody>
                {rows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Link
                      href={`/perfil-de-usuario/editar/${row.id}`}
                      key={row.id}
                      passHref
                    >
                      <TableRowStyled role="checkbox" tabIndex={-1}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                        >
                          {row.name}
                        </TableCell>
                        <TableCellBorder>{row.createdByUser}</TableCellBorder>
                        <TableCellBorder>{row.areas}</TableCellBorder>
                        <TableCellBorder style={{ minWidth: 250 }}>
                          {row.active ? (
                            <Status status={row.active}>
                              <Circle color={row.active} />
                              <div>Ativo</div>
                              <div />
                            </Status>
                          ) : (
                            <Status>
                              <Circle color={row.active} />
                              <div>Inativo</div>
                              <div />
                            </Status>
                          )}
                          {row.active}
                        </TableCellBorder>
                      </TableRowStyled>
                    </Link>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination>
            Linhas por página:
            <FormSelectStyled value={limit} onChange={handleChangeLimit}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </FormSelectStyled>
            <p
              style={{
                marginLeft: '25px',
              }}
            ></p>
            {page} - {qntPage}
            <p
              style={{
                marginRight: '25px',
              }}
            ></p>
            <ButtonPage
              onClick={() => handleChangePage2('prev')}
              disabled={disablePrev}
            >
              <MdNavigateBefore size={24} />
            </ButtonPage>
            <ButtonPage
              onClick={() => handleChangePage2('next')}
              disabled={disableNext}
            >
              <MdNavigateNext size={24} />
            </ButtonPage>
          </Pagination>
        </Paper>
      </Box>
    </Container>
  );
}
