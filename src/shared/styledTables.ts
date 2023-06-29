import styled from 'styled-components';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
// import { Button } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { TableRow } from '@mui/material';

export const Pagination = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 0.9rem;
  background-color: #f4f2ff !important;
  color: ${(props) => props.theme.colors.primary} !important;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 16px 10px;
`;

export const TableCellStyled = styled(TableCell)`
  background-color: #f4f2ff !important;
  color: ${(props) => props.theme.colors.primary} !important;
  font-weight: 600;
`;

export const TableSortLabelStyled = styled(TableSortLabel)`
  background-color: #f4f2ff !important;
  color: ${(props) => props.theme.colors.primary} !important;
  font-weight: 600;
`;

// export const Container = styled.div`
//   background-color: #fff;
//   border-bottom-right-radius: 50px;
//   border-bottom-left-radius: 50px;
//   border-top-right-radius: 10px;
//   border-top-left-radius: 10px;
//   box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
// `;

// export const TopContainer = styled.div`
//   //margin-top: 40px;
//   padding: 15px 10px 5px 10px;
//   display: flex;
//   justify-content: space-between;
// `;

export const FilterSelectedContainer = styled.div`
  background-color: #f2f0f9;
  display: flex;
  padding: 10px;
  align-items: end;
`;

export const ButtonStyled = styled.button`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  margin-left: 10px;
  border-radius: 6px;
  width: 83px;
  height: 40px;

  &:active,
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.dark} !important;
    border: 1px solid ${(props) => props.theme.colors.dark};

    color: #fff;
  }
`;

export const Marker = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 6px;
  padding: 0;
  min-width: 42px;
  max-width: 42px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  margin-right: 20px;

  &:active,
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.dark} !important;
  }
`;

export const InputSearch = styled(Form.Control)`
  background-color: #f4f2ff;
  padding-left: 30px;
  width: 392px;
`;

export const IconSearch = styled(MdSearch)`
  position: 'absolute';
  margin-right: -25px;
`;

export const TableCellBorder = styled(TableCell)`
  border-left: 1px solid #d4d4d4;
`;

export const FormSelectStyled = styled.select`
  background-color: #f4f2ff !important;
  color: ${(props) => props.theme.colors.primary} !important;
  border: none;
  width: 50px;
  font-size: 0.9rem;
  text-align: center;
  margin: 0 15px 0 10px;
`;

export const ButtonPage = styled.button`
  background-color: #f4f2ff !important;
  color: ${(props) => props.theme.colors.primary} !important;
  border: none;
  border-radius: 50%;

  &:disabled {
    color: #9dc79f !important;
  }
`;

export const TableRowStyled = styled(TableRow)`
  &:not(.disable-hover) {
    &:hover {
      background-color: #fdd3ea;
    }
  }
`;

export const Status = styled.div<{ status?: boolean }>`
  background-color: ${(props) => (props.status ? '#E6E6F2' : '#FFE0E0')};
  color: ${(props) => (props.status ? '#4A4AFF' : '#D30000')};
  border-radius: 10px;
  text-align: center;
  padding: 2px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Circle = styled.div`
  background-color: ${(props) => (props.color ? '#4A4AFF' : '#D30000')};
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;
