import { ReactNode, useEffect, useState } from 'react';
import { Box } from './styledComponents';
import { Autocomplete, TextField } from '@mui/material';
import { GraphScholars } from '../graphScholars';
import { GraphState } from '../graphStates';
import { GraphTimeScholarship } from '../graphTime';
import { GraphReportsDelivered } from '../graphReportsDelivered';
import { GraphValues } from '../graphValues';
import { GraphTeacher } from '../graphTeachers';

export interface IOptionsProps {
  id: number
  name: string
}

export const monthList: IOptionsProps[] = [
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

export function SelectGraph() {
  const date = new Date();
  const [type, setType] = useState('Quantidade de bolsistas cadastrados');
  const [year, setYear] = useState(date.getFullYear());
  const [yearList, setYearList] = useState([]);
  const [month, setMonth] = useState(null);

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

  interface IGraphProps {
    id: string;
    component: ReactNode;
  }

  const graphs: IGraphProps[] = [
    {
      id: 'Quantidade de bolsistas cadastrados',
      component: <GraphScholars year={year} />,
    },
    {
      id: 'Média de valores das bolsas',
      component: <GraphValues year={year} />,
    },
    {
      id: 'Tempo médio de permanência do bolsista',
      component: <GraphTimeScholarship year={year} />,
    },
    {
      id: 'Taxa de entrega do relatório',
      component: <GraphReportsDelivered year={year} month={month} />,
    },
    {
      id: 'Estados utilizando o Sistema',
      component: <GraphState />,
    },
    {
      id: 'Professores Formados Por Bolsista Formador',
      component: <GraphTeacher year={year} />,
    },
  ];

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
            'Professores Formados Por Bolsista Formador',
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
      {graphs.map((graph) => {
        if (graph.id === type) {
          return graph.component;
        } else {
          return <></>;
        }
      })}
    </>
  );
}
