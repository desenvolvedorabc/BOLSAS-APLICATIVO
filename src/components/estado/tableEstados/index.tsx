import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Circle, Container, Status, TopContainer } from './styledComponents';
import {
  FilterSelectedContainer,
  Marker,
  InputSearch,
  IconSearch,
  TableCellBorder,
  Pagination,
  FormSelectStyled,
  ButtonPage,
  ButtonStyled,
  TableCellStyled,
  TableRowStyled,
  TableSortLabelStyled,
} from 'src/shared/styledTables';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  MdOutlineFilterAlt,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import Link from 'next/link';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ButtonMenu } from 'src/components/ButtonMenu';
import {
  getExportExcelPartnerState,
  getStates,
} from 'src/services/estados-parceiro.service';
import Image from 'next/image';
import { useGenearePdf } from 'src/utils/generatePdf';

interface Data {
  id: string;
  logo: string;
  estado: string;
  active: boolean;
}

function createData(
  id: string,
  logo: string,
  estado: string,
  active: boolean,
): Data {
  return {
    id,
    logo,
    estado,
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
    id: 'logo',
    numeric: false,
    label: 'LOGO',
  },
  {
    id: 'estado',
    numeric: false,
    label: 'ESTADO',
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
            {headCell.id === 'estado' ? (
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

export default function TableEstados({ url }) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy] = useState('estado');
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileList, setProfileList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [qntPage, setQntPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { componentRef, handlePrint } = useGenearePdf();

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSelectedColumn(property);
  };

  useEffect(() => {
    setDisablePrev(page === 1 ? true : false);
    setDisableNext(page === qntPage ? true : false);
  }, [qntPage, page]);

  const handleChangePage2 = (direction) => {
    if (direction === 'prev') {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  };
  const handleChangeLimit = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1);
  };

  useEffect(() => {
    loadEstados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, limit, order]);

  const [rows, setRows] = useState([]);
  const tableBody = useRef();

  async function loadEstados() {
    const resp = await getStates(
      search,
      page,
      limit,
      order.toUpperCase(),
      selectedStatus,
    );

    setQntPage(resp.data?.meta?.totalPages);

    const list = [];
    resp.data.items?.map((x) => {
      list.push(createData(x.id, x.logo, x.name, x.active));
    });

    setRows(list);
  }

  useEffect(() => {
    loadEstados();
  }, []);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSelectStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filterSelected = () => {
    loadEstados();
  };

  const changeShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const image = (row) => {
    const urlImage = `${url}/users/avatar/${row?.logo}`;
  };

  const setRow = (row, index) => {
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <Link href={`/estado-parceiro/editar/${row.id}`} key={row.id} passHref>
        <TableRowStyled role="checkbox" tabIndex={-1}>
          <TableCell
            component="th"
            id={labelId}
            scope="row"
            align="center"
            padding="normal"
          >
            {image(row)}
            {row.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                style={{ maxWidth: 100, border: '1px solid #000' }}
                src={`${url}/users/avatar/${row?.logo}`}
                alt="logo"
              />
            ) : (
              <Image
                src="/assets/images/img_state.png"
                width={45}
                height={45}
                alt="logo"
              />
            )}
          </TableCell>
          <TableCellBorder>{row.estado}</TableCellBorder>
          <TableCellBorder>
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
  };

  const downloadCsv = async () => {
    const resp = await getExportExcelPartnerState({
      page: 1,
      limit: 10,
      order: order?.toUpperCase(),
      search,
      status: selectedStatus,
    });
    saveAs(resp?.data, 'Estados Parceiro');
  };

  return (
    <>
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
                onChange={handleChangeSearch}
              />
              <IconSearch color={'#7C7C7C'} />
            </div>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: 30 }}>
              <ButtonMenu handlePrint={handlePrint} handleCsv={downloadCsv} />
            </div>
            <Link href="/estado-parceiro" passHref>
              <div style={{ width: 160 }}>
                <ButtonPadrao
                  onClick={() => {
                    /* TODO document why this arrow function is empty */
                  }}
                >
                  Adicionar Estado
                </ButtonPadrao>
              </div>
            </Link>
          </div>
        </TopContainer>
        {showFilter && (
          <FilterSelectedContainer>
            <div className="me-2">
              <FormControl
                fullWidth
                size="small"
                style={{ width: 142, backgroundColor: '#FFFFFF' }}
              >
                <InputLabel id="Status">Status</InputLabel>
                <Select
                  labelId="Status"
                  id="Status"
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => handleSelectStatus(e)}
                >
                  <MenuItem value={null}>Todos</MenuItem>
                  <MenuItem value={1}>Ativo</MenuItem>
                  <MenuItem value={0}>Inativo</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <ButtonStyled
                onClick={() => {
                  filterSelected();
                }}
              >
                Filtrar
              </ButtonStyled>
            </div>
          </FilterSelectedContainer>
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
                <TableBody id="tableBody" ref={tableBody}>
                  {rows.map((row, index) => {
                    return setRow(row, index);
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
      <GeneratedPdf componentRef={componentRef}>
        <Container>
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
                  <TableBody id="tableBody" ref={tableBody}>
                    {rows.map((row, index) => {
                      return setRow(row, index);
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
      </GeneratedPdf>
    </>
  );
}

function GeneratedPdf({ componentRef, children }) {
  return (
    <div className="pdf">
      <div ref={componentRef} className="print-container">
        <h3 style={{ margin: '8px' }}>Estados Parceiros</h3>
        <br />
        {children}
      </div>
    </div>
  );
}
