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
import {
  Container,
  TopContainer,
  Text,
  FilterStatusContainer,
  TableCellBorder,
} from './styledComponents';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  MdOutlineFilterAlt,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';
import ButtonWhite from '../../buttons/buttonWhite';
import Link from 'next/link';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import { isValidDate } from 'src/utils/validate';
import { getExportLog, getLogs } from 'src/services/logs.service';
import { format } from 'date-fns';
import { entities_mock } from 'src/utils/mocks/entities';
import {
  ButtonPage,
  FormSelectStyled,
  IconSearch,
  InputSearch,
  Marker,
  Pagination,
  TableCellStyled,
  TableRowStyled,
  TableSortLabelStyled,
} from 'src/shared/styledTables';
import { ButtonMenu } from 'src/components/ButtonMenu';
import { saveAs } from 'file-saver';
import { useGenearePdf } from 'src/utils/generatePdf';

interface Data {
  id: string;
  createdAt: string;
  origin: string;
  user: string;
  nameEntity: string;
  method: string;
  stateInitial: string;
  stateFinal: string;
}

function createData(
  id: string,
  createdAt: string,
  origin: string,
  user: string,
  nameEntity: string,
  method: string,
  stateInitial: string,
  stateFinal: string,
): Data {
  return {
    id,
    createdAt,
    origin,
    user,
    nameEntity,
    method,
    stateInitial,
    stateFinal,
  };
}

interface DataExport {
  createdAt: string;
  origin: string;
  user: string;
  nameEntity: string;
  method: string;
  stateInitial: string;
  stateFinal: string;
}

function createDataExport(
  createdAt: string,
  origin: string,
  user: string,
  nameEntity: string,
  method: string,
  stateInitial: string,
  stateFinal: string,
): DataExport {
  return {
    createdAt,
    origin,
    user,
    nameEntity,
    method,
    stateInitial,
    stateFinal,
  };
}

interface HeadCell {
  id: keyof Data;
  label: string;
  status: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'createdAt',
    status: false,
    label: 'DATA/HORA',
  },
  {
    id: 'origin',
    status: false,
    label: 'ORIGEM',
  },
  {
    id: 'user',
    status: false,
    label: 'USUÁRIO',
  },
  {
    id: 'nameEntity',
    status: false,
    label: 'ENTIDADE',
  },
  {
    id: 'method',
    status: false,
    label: 'MÉTODO',
  },
  {
    id: 'stateInitial',
    status: true,
    label: 'ESTADO ANTES',
  },
  {
    id: 'stateFinal',
    status: true,
    label: 'ESTADO DEPOIS',
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
            align={headCell.status ? 'center' : 'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabelStyled
              active={orderBy === headCell.id}
              direction={order === 'asc' ? 'desc' : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabelStyled>
          </TableCellStyled>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableLogs({ url }) {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('data');
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [page, setPage] = useState(1);
  const [qntPage, setQntPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [inicioFilter, setInicioFilter] = useState(null);
  const [fimFilter, setFimFilter] = useState(null);
  const [metodoFilter, setMetodoFilter] = useState(null);
  const [entidadeFilter, setEntidadeFilter] = useState(null);
  const [originFilter, setOriginFilter] = useState(null);
  const [listEntity, setListEntity] = useState(entities_mock);
  // const [csv, setCsv] = useState([]);
  // const csvLink = useRef(undefined);

  const { componentRef, handlePrint } = useGenearePdf();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = order === 'asc';
    const loadOrder = isAsc ? 'desc' : 'asc';
    setOrder(loadOrder);
    setSelectedColumn(property);
    loadLogs(
      search,
      page,
      limit,
      property,
      loadOrder,
      inicioFilter,
      fimFilter,
      metodoFilter,
      entidadeFilter,
      originFilter,
    );
  };

  useEffect(() => {
    setDisablePrev(page === 1 ? true : false);
    setDisableNext(page === qntPage ? true : false);
  }, [qntPage, page]);

  const handleChangePage2 = (direction) => {
    if (direction === 'prev') {
      setPage(page - 1);
      loadLogs(
        search,
        page - 1,
        limit,
        selectedColumn,
        order,
        inicioFilter,
        fimFilter,
        metodoFilter,
        entidadeFilter,
        originFilter,
      );
    } else {
      setPage(page + 1);
      loadLogs(
        search,
        page + 1,
        limit,
        selectedColumn,
        order,
        inicioFilter,
        fimFilter,
        metodoFilter,
        entidadeFilter,
        originFilter,
      );
    }
  };

  const handleChangeLimit = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1);
    loadLogs(
      search,
      1,
      Number(event.target.value),
      selectedColumn,
      order,
      inicioFilter,
      fimFilter,
      metodoFilter,
      entidadeFilter,
      originFilter,
    );
  };

  const getLogName = (value) => {
    let name = value;
    listEntity.map((entity) => {
      if (entity.value === value) name = entity.name;
    });

    return name;
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadLogs(
      search,
      1,
      limit,
      selectedColumn,
      order,
      inicioFilter,
      fimFilter,
      metodoFilter,
      entidadeFilter,
      originFilter,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function loadLogs(
    search: string,
    page: number,
    limit: number,
    selectedColumn: string,
    order: string,
    inicioFilter: string,
    fimFilter: string,
    metodoFilter: string,
    entidadeFilter: string,
    originFilter: string,
  ) {
    const respLogs = await getLogs(
      search,
      page,
      limit,
      selectedColumn,
      order.toUpperCase(),
      inicioFilter,
      fimFilter,
      metodoFilter,
      entidadeFilter,
      originFilter,
    );
    setQntPage(respLogs?.data?.meta?.totalPages);

    const list = [];

    respLogs?.data?.items?.map((x) => {
      list.push(
        createData(
          x.id,
          x.createdAt && format(new Date(x.createdAt), 'dd/MM/yyyy - HH:mm:ss'),
          x.user?.role,
          x.user?.name,
          getLogName(x.nameEntity),
          x.method,
          x.stateInitial,
          x.stateFinal,
        ),
      );
    });
    setRows(list);
  }

  useEffect(() => {
    loadLogs(
      search,
      page,
      limit,
      selectedColumn,
      order,
      inicioFilter,
      fimFilter,
      metodoFilter,
      entidadeFilter,
      originFilter,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadCsv = async () => {
    const resp = await getExportLog({
      search,
      page,
      limit,
      column: selectedColumn,
      order: order?.toUpperCase(),
      initialDate: inicioFilter,
      finalDate: fimFilter,
      method: metodoFilter,
      entity: entidadeFilter,
      origin: originFilter,
    });
    saveAs(resp?.data, 'Logs do sistema');
  };

  const FilterStatus = () => {
    loadLogs(
      search,
      page,
      limit,
      selectedColumn,
      order,
      inicioFilter,
      fimFilter,
      metodoFilter,
      entidadeFilter,
      originFilter,
    );
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const changeShowFilter = (e) => {
    setShowFilter(!showFilter);
  };

  const ResetFilter = () => {
    setInicioFilter(null);
    setFimFilter(null);
    setMetodoFilter(null);
    setEntidadeFilter(null);
    setOriginFilter(null);
  };

  return (
    <Container style={{ maxWidth: 'calc(100vw - 20.625rem)' }}>
      <TopContainer>
        <div className="d-flex mb-2">
          <OverlayTrigger
            key={'toolTip'}
            placement={'top'}
            overlay={<Tooltip id={`tooltip-top`}>Filtro Avançado</Tooltip>}
          >
            <Marker onClick={changeShowFilter}>
              <MdOutlineFilterAlt color="#FFF" size={24} />
            </Marker>
          </OverlayTrigger>
          <div className="d-flex flex-row-reverse align-items-center ">
            <InputSearch
              size={16}
              type="text"
              placeholder="Pesquise"
              name="searchTerm"
              onChange={handleChangeSearch}
            />
            <IconSearch color={'#7C7C7C'} />
          </div>
        </div>
        <div style={{ marginRight: 30 }}>
          <ButtonMenu handlePrint={handlePrint} handleCsv={downloadCsv} />
        </div>
      </TopContainer>
      {showFilter && (
        <FilterStatusContainer>
          <div style={{ width: 164 }} className="pe-3">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={brLocale}
            >
              <DatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                label="Data Inicio"
                value={inicioFilter}
                onChange={(val) => {
                  if (isValidDate(val)) {
                    setInicioFilter(val);
                    return;
                  }
                  setInicioFilter('');
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={{ backgroundColor: '#FFF' }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div
            style={{ width: 164 }}
            className="pe-3 me-3 border-end border-white"
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={brLocale}
            >
              <DatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                label="Data Fim"
                value={fimFilter}
                onChange={(val) => {
                  if (isValidDate(val)) {
                    setFimFilter(val);
                    return;
                  }
                  setFimFilter('');
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={{ backgroundColor: '#FFF' }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: 142 }} className="pe-2 me-2">
            <FormControl fullWidth size="small">
              <InputLabel id="originFilter">Origem:</InputLabel>
              <Select
                labelId="originFilter"
                id="originFilter"
                name="originFilter"
                value={originFilter}
                label="Origem"
                onChange={(e) => setOriginFilter(e.target.value)}
                sx={{
                  backgroundColor: '#fff',
                }}
              >
                <MenuItem value={null}>Todos</MenuItem>
                <MenuItem value={'PARC'}>PARC</MenuItem>
                <MenuItem value={'ESTADO'}>Estado</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: 142 }} className="pe-2 me-2">
            <FormControl fullWidth size="small">
              <InputLabel id="metodoFilter">Método:</InputLabel>
              <Select
                labelId="metodoFilter"
                id="metodoFilter"
                name="metodoFilter"
                value={metodoFilter}
                label="Método:"
                onChange={(e) => setMetodoFilter(e.target.value)}
                sx={{
                  backgroundColor: '#fff',
                }}
              >
                <MenuItem value={null}>Todos</MenuItem>
                <MenuItem value="POST">POST</MenuItem>
                <MenuItem value="PUT">PUT</MenuItem>
                <MenuItem value="DELETE">DELETE</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            style={{ width: 142 }}
            className="pe-3 me-3 border-end border-white"
          >
            <FormControl fullWidth size="small">
              <InputLabel id="entidadeFilter">Entidade:</InputLabel>
              <Select
                labelId="entidadeFilter"
                id="entidadeFilter"
                name="entidadeFilter"
                value={entidadeFilter}
                label="Entidade"
                onChange={(e) => setEntidadeFilter(e.target.value)}
                sx={{
                  backgroundColor: '#fff',
                }}
              >
                <MenuItem value={null}>Todos</MenuItem>
                {listEntity.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: 83 }}>
            <ButtonWhite
              onClick={() => {
                FilterStatus();
              }}
            >
              Filtrar
            </ButtonWhite>
          </div>
          <div style={{ marginLeft: 15, width: 83 }}>
            <ButtonWhite
              onClick={() => {
                ResetFilter();
              }}
            >
              Resetar
            </ButtonWhite>
          </div>
        </FilterStatusContainer>
      )}
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
                {rows.length > 0 ? (
                  rows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <Link href={`/log/${row.id}`} key={row.id} passHref>
                        <TableRowStyled role="checkbox" tabIndex={-1}>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                          >
                            {row.createdAt}
                          </TableCell>
                          <TableCellBorder>{row.origin}</TableCellBorder>
                          <TableCellBorder>{row.user}</TableCellBorder>
                          <TableCellBorder>{row.nameEntity}</TableCellBorder>
                          <TableCellBorder>{row.method}</TableCellBorder>
                          <TableCellBorder align="center">
                            <Text>{row.stateInitial}</Text>
                          </TableCellBorder>
                          <TableCellBorder align="center">
                            <Text>{row.stateFinal}</Text>
                          </TableCellBorder>
                        </TableRowStyled>
                      </Link>
                    );
                  })
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination>
            <span style={{ marginRight: '20px' }}>
              {' '}
              Total páginas: <b>{qntPage}</b>
            </span>
            Linhas por página:
            <FormSelectStyled value={limit} onChange={handleChangeLimit}>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </FormSelectStyled>
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
      <GeneratePdfPage
        componentRef={componentRef}
        changeShowFilter={changeShowFilter}
        showFilter={showFilter}
        inicioFilter={inicioFilter}
        fimFilter={fimFilter}
        originFilter={originFilter}
        metodoFilter={metodoFilter}
        entidadeFilter={entidadeFilter}
        listEntity={listEntity}
        order={order}
        orderBy={orderBy}
        rows={rows}
        qntPage={qntPage}
        limit={limit}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />
    </Container>
  );
}

function GeneratePdfPage({
  componentRef,
  changeShowFilter,
  showFilter,
  inicioFilter,
  fimFilter,
  originFilter,
  metodoFilter,
  entidadeFilter,
  listEntity,
  order,
  orderBy,
  rows,
  qntPage,
  limit,
  disablePrev,
  disableNext,
}) {
  return (
    <div className="pdf">
      <div ref={componentRef} className="print-container">
        <Container>
          <TopContainer>
            <div className="d-flex mb-2">
              <OverlayTrigger
                key={'toolTip'}
                placement={'top'}
                overlay={<Tooltip id={`tooltip-top`}>Filtro Avançado</Tooltip>}
              >
                <Marker onClick={changeShowFilter}>
                  <MdOutlineFilterAlt color="#FFF" size={24} />
                </Marker>
              </OverlayTrigger>
              <div className="d-flex flex-row-reverse align-items-center ">
                <InputSearch
                  size={16}
                  type="text"
                  placeholder="Pesquise"
                  name="searchTerm"
                  onChange={() => {
                    null;
                  }}
                />
                <IconSearch color={'#7C7C7C'} />
              </div>
            </div>
          </TopContainer>
          {showFilter && (
            <FilterStatusContainer>
              <div style={{ width: 164 }} className="pe-3">
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={brLocale}
                >
                  <DatePicker
                    openTo="year"
                    views={['year', 'month', 'day']}
                    label="Data Inicio"
                    value={inicioFilter}
                    onChange={(val) => {
                      null;
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        {...params}
                        sx={{ backgroundColor: '#FFF' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div
                style={{ width: 164 }}
                className="pe-3 me-3 border-end border-white"
              >
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={brLocale}
                >
                  <DatePicker
                    openTo="year"
                    views={['year', 'month', 'day']}
                    label="Data Fim"
                    value={fimFilter}
                    onChange={(val) => {
                      null;
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        {...params}
                        sx={{ backgroundColor: '#FFF' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ width: 142 }} className="pe-2 me-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="originFilter">Origem:</InputLabel>
                  <Select
                    labelId="originFilter"
                    id="originFilter"
                    name="originFilter"
                    value={originFilter}
                    label="Origem"
                    onChange={(e) => null}
                    sx={{
                      backgroundColor: '#fff',
                    }}
                  >
                    <MenuItem value={null}>Todos</MenuItem>
                    <MenuItem value={'PARC'}>PARC</MenuItem>
                    <MenuItem value={'Estado'}>Estado</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: 142 }} className="pe-2 me-2">
                <FormControl fullWidth size="small">
                  <InputLabel id="metodoFilter">Método:</InputLabel>
                  <Select
                    labelId="metodoFilter"
                    id="metodoFilter"
                    name="metodoFilter"
                    value={metodoFilter}
                    label="Método:"
                    onChange={(e) => null}
                    sx={{
                      backgroundColor: '#fff',
                    }}
                  >
                    <MenuItem value={null}>Todos</MenuItem>
                    <MenuItem value="POST">POST</MenuItem>
                    <MenuItem value="PUT">PUT</MenuItem>
                    <MenuItem value="DELETE">DELETE</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div
                style={{ width: 142 }}
                className="pe-3 me-3 border-end border-white"
              >
                <FormControl fullWidth size="small">
                  <InputLabel id="entidadeFilter">Entidade:</InputLabel>
                  <Select
                    labelId="entidadeFilter"
                    id="entidadeFilter"
                    name="entidadeFilter"
                    value={entidadeFilter}
                    label="Entidade"
                    onChange={(e) => null}
                    sx={{
                      backgroundColor: '#fff',
                    }}
                  >
                    <MenuItem value={null}>Todos</MenuItem>
                    {listEntity.map((item) => (
                      <MenuItem key={item.id} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: 83 }}>
                <ButtonWhite
                  onClick={() => {
                    null;
                  }}
                >
                  Filtrar
                </ButtonWhite>
              </div>
              <div style={{ marginLeft: 15, width: 83 }}>
                <ButtonWhite
                  onClick={() => {
                    null;
                  }}
                >
                  Resetar
                </ButtonWhite>
              </div>
            </FilterStatusContainer>
          )}
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
                    onRequestSort={null}
                    rowCount={rows.length}
                  />

                  <TableBody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <Link href={`/log/${row.id}`} key={row.id} passHref>
                            <TableRowStyled role="checkbox" tabIndex={-1}>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="normal"
                              >
                                {row.createdAt}
                              </TableCell>
                              <TableCellBorder>{row.origin}</TableCellBorder>
                              <TableCellBorder>{row.user}</TableCellBorder>
                              <TableCellBorder>
                                {row.nameEntity}
                              </TableCellBorder>
                              <TableCellBorder>{row.method}</TableCellBorder>
                              <TableCellBorder align="center">
                                <Text>{row.stateInitial}</Text>
                              </TableCellBorder>
                              <TableCellBorder align="center">
                                <Text>{row.stateFinal}</Text>
                              </TableCellBorder>
                            </TableRowStyled>
                          </Link>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination>
                <span style={{ marginRight: '20px' }}>
                  {' '}
                  Total páginas: <b>{qntPage}</b>
                </span>
                Linhas por página:
                <FormSelectStyled value={limit} onChange={null}>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </FormSelectStyled>
                <ButtonPage onClick={() => null} disabled={disablePrev}>
                  <MdNavigateBefore size={24} />
                </ButtonPage>
                <ButtonPage onClick={() => null} disabled={disableNext}>
                  <MdNavigateNext size={24} />
                </ButtonPage>
              </Pagination>
            </Paper>
          </Box>
        </Container>
      </div>
    </div>
  );
}
