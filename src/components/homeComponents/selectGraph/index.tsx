import { useEffect, useState } from 'react';
import { Box } from './styledComponents';
import { Autocomplete, TextField } from '@mui/material';
import { GraphScholars } from '../graphScholars';
import { GraphState } from '../graphStates';
import { GraphTimeScholarship } from '../graphTime';
import { GraphReportsDelivered } from '../graphReportsDelivered';
import { GraphValues } from '../graphValues';

export function SelectGraph() {
  const date = new Date();
  const [type, setType] = useState('Quantidade de bolsistas cadastrados');
  const [year, setYear] = useState(date.getFullYear());
  const [yearList, setYearList] = useState([]);
  const [month, setMonth] = useState(null);
  const monthList = [
    {
      id: 1,
      name: 'Janeiro',
    },
    {
      id: 2,
      name: 'Fevereiro',
    },
    {
      id: 3,
      name: 'Março',
    },
    {
      id: 4,
      name: 'Abril',
    },
    {
      id: 5,
      name: 'Maio',
    },
    {
      id: 6,
      name: 'Junho',
    },
    {
      id: 7,
      name: 'Julho',
    },
    {
      id: 8,
      name: 'Agosto',
    },
    {
      id: 9,
      name: 'Setembro',
    },
    {
      id: 10,
      name: 'Outubro',
    },
    {
      id: 11,
      name: 'Novembro',
    },
    {
      id: 12,
      name: 'Dezembro',
    },
  ];

  const getYears = () => {
    const list = [];

    for (let i = 2019; i <= date.getFullYear(); i++) {
      list.push(i);
    }
    setYearList(list);
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <>
      <Box>
        <Autocomplete
          id="size-small-outlined"
          size="small"
          noOptionsText=" "
          value={type}
          options={[
            'Quantidade de bolsistas cadastrados',
            'Média de valores das bolsas',
            'Tempo médio de permanência do bolsista',
            'Estados utilizando o Sistema',
            'Taxa de entrega do relatório',
          ]}
          onChange={(_event, newValue) => {
            setType(newValue);
          }}
          renderInput={(params) => (
            <TextField size="small" {...params} label=" " />
          )}
        />
        {type !== 'Estados utilizando o Sistema' && (
          <Autocomplete
            id="size-small-outlined"
            size="small"
            noOptionsText="Ano Calendário"
            value={year}
            options={yearList}
            onChange={(_event, newValue) => {
              setYear(Number(newValue));
            }}
            renderInput={(params) => (
              <TextField size="small" {...params} label="Ano Calendário" />
            )}
          />
        )}
        {type === 'Taxa de entrega do relatório' && (
          <Autocomplete
            id="size-small-outlined"
            size="small"
            noOptionsText="Mês"
            value={month}
            options={monthList}
            getOptionLabel={(option) => option?.name}
            onChange={(_event, newValue) => {
              setMonth(newValue);
            }}
            renderInput={(params) => (
              <TextField size="small" {...params} label="Mês" />
            )}
          />
        )}
      </Box>
      {type === 'Quantidade de bolsistas cadastrados' ? (
        <GraphScholars year={year} />
      ) : type === 'Média de valores das bolsas' ? (
        <GraphValues year={year} />
      ) : type === 'Tempo médio de permanência do bolsista' ? (
        <GraphTimeScholarship year={year} />
      ) : type === 'Taxa de entrega do relatório' ? (
        <GraphReportsDelivered year={year} month={month} />
      ) : (
        type === 'Estados utilizando o Sistema' && <GraphState />
      )}
    </>
  );
}
