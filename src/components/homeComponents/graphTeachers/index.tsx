import Highcharts, { Options as HighchartsOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { Box } from './styledComponents';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import { monthList } from '../selectGraph';
import { MultiAutoComplete } from 'src/components/MultiAutoComplete';
import { getStates } from 'src/services/estados-parceiro.service';
import { IDataIndicatorsProps, IUseGetProfessoresResponseProps, useGetProfessores } from 'src/services/professores.service';
import { Loading } from 'src/components/Loading';
import { MissingDataWarning } from 'src/components/MissingDataWarning';

export function GraphTeacher({ year }) {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ update, setUpdate ] = useState<boolean>(false)

  const [ indicators, setIndicators ] = useState<IUseGetProfessoresResponseProps>({} as IUseGetProfessoresResponseProps);

  const [ meses, setMeses ] = useState([]);

  const [ estados, setEstados ] = useState([]);
  const [ stateList, setStateList ] = useState([]);

  const [ regionais, setRegionais ] = useState([]);

  const [ municipios, setMunicipios ] = useState([]);
  const [ cityList, setCityList ] = useState([]);

  const [ statusFormacao, setStatusFormacao ] = useState<string>('');

  const paramsData = {
    year: year,
    partnerStateIds: getElementInArray(estados, 'id'),
    regionalPartnerIds: getElementInArray(regionais, 'id'),
    cities: getElementInArray(municipios, 'name'),
    months: getElementInArray(meses, 'id')
  }

  async function loadStates() {
    const resp = await getStates(null, 1, 99999999, 'ASC', '1');

    if (resp?.data?.items?.length) {
      setStateList(resp.data.items);
    }
  }

  const handleChangeRegional = (newValue) => {        
    setRegionais(newValue);
    setMunicipios([]);
    setStatusFormacao('')
    setUpdate(true)
  };

  function getElementInArray(data: any[], key: string, transformInt?: boolean): any[] {
    if (!data) return

    let newArray: any[] = []
    
    data.map((currentData) => {
      if (transformInt) currentData[key] = parseInt(currentData[key])
      newArray.push(currentData[key])
    })

    return newArray
  }

  function verifyIfIsEmpty(key: any[]): boolean {
    return (!key || key.length === 0) ? true : false
  }

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    setLoading(true)
    useGetProfessores(paramsData).then((res: IUseGetProfessoresResponseProps) => {
      setIndicators(res)

      const citiesList: object[] = []
      let count: number = 1

      res.citiesByRegionalPartner.map((currentCity) => {
        currentCity.cities.split(',').map((city) => {
            citiesList.push({
            id: count,
            name: city
          })
          count += 1
        })
      })

      setCityList(citiesList)
      
    }).finally(() => {
      setLoading(false)
      setUpdate(false)
    })
  }, [update, year, meses])

  return (
    <>
    <Box>
      <MultiAutoComplete
        name='Mês'
        options={monthList}
        handleSelect={(_event, newValue) => {
          setMeses(newValue)
          setEstados([])
          setRegionais([])
          setMunicipios([])
          setStatusFormacao('')
        }}
      />
      <MultiAutoComplete
        name='Estado'
        options={stateList}
        value={estados}
        handleSelect={(_event, newValue) => {
          setEstados(newValue)
          setUpdate(true)
          setRegionais([])
          setMunicipios([])
          setStatusFormacao('')
        }}
      />
      <MultiAutoComplete
        name='Regional'
        options={indicators && indicators?.regionalPartner}
        value={regionais}
        handleSelect={(_event, newValue) => {          
          handleChangeRegional(newValue)
        }}
        disabled={verifyIfIsEmpty(estados)}
      />
      <MultiAutoComplete
        name='Município'
        options={cityList}
        value={municipios}
        handleSelect={(_event, newValue) => {
          setMunicipios(newValue)
          setStatusFormacao('')
          setUpdate(true)
        }}
        disabled={verifyIfIsEmpty(estados) || verifyIfIsEmpty(regionais)}
      />
      <Autocomplete
        id="size-small-outlined"
        size="small"
        noOptionsText="Status de Formação"
        value={statusFormacao}
        onChange={(_event, newValue) => {
          setStatusFormacao(newValue)
          setUpdate(true)
        }}
        options={['Professores previstos', 'Professores formados']}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Status de Formação" />
        )}
      />
    </Box>
    {
      loading ?
      (
        <Loading />
      ) :
      (
        <GraphTeachers indicators={indicators} getElementInArray={getElementInArray} statusFormacao={statusFormacao} meses={meses} />
      )
    }
    </>
  );
}

interface IGraphTeachersProps {
  indicators: IUseGetProfessoresResponseProps
  getElementInArray: (data: any[], key: string, transformInt?: boolean) => any[]
  statusFormacao: string
  meses: string[]
}

function GraphTeachers({ indicators, getElementInArray, statusFormacao, meses }: IGraphTeachersProps) {
  
  let totalExpectedGraduates = getElementInArray(indicators?.data, 'totalExpectedGraduates', true)
  let totalFormedGifts = getElementInArray(indicators?.data, 'totalFormedGifts', true)

  if (statusFormacao === 'Professores previstos') {
    totalFormedGifts = [0]
  } else if (statusFormacao === 'Professores formados') {
    totalExpectedGraduates = [0]
  }

  function getAverage(dataList: IDataIndicatorsProps[]): number {
    const qtdMonths = meses?.length === 0 ? 12 : meses?.length
    
    const total: number = getTotal(dataList)

    return total/qtdMonths
  }

  function getTotal(dataList: IDataIndicatorsProps[]): number {
    if (!dataList) return

    let total: number = 0

    dataList?.forEach((currentData) => {
      total += statusFormacao === 'Professores formados' || statusFormacao === '' ? parseInt(currentData.totalFormedGifts) : parseInt(currentData.totalExpectedGraduates)
    })

    return total
  }

  const average = getAverage(indicators.data)
  
  const options: HighchartsOptions = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Inter',
        fontWeight: '600',
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat:
        '<table><tr><th style="text-align: center" colspan="2">Professores</th></tr>',
      pointFormat:
        '<td><br/></td>' +
        `<tr>
          <td>
            <div style="width: 100%; display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: {point.series.color};"></div>
                {point.series.name}
              </div>
              <b style="align-self: center; margin-top: 8px;">{point.y}</b>
            </div>
          </td>
          </tr>`,
      footerFormat: '</table>',
      valueDecimals: 0,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        events: {
          legendItemClick: function () {
            return false;
          },
        },
      },
    },
    yAxis: [
      {
        min: 0,
        title: {
          text: '',
        },
        stackLabels: {
          enabled: false
        },
        plotLines: [
          {
            color: 'black',
            value: average,
            dashStyle: 'ShortDash',
            width: 3,
          },
        ]
      },
    ],
    legend: {
      squareSymbol: true,
      symbolHeight: 12,
      symbolRadius: 0,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: indicators?.data?.map((month) => month.month_extense),
      crosshair: true,
    },
    series: [
      {
        name: 'Previstos',
        type: 'column',
        data: totalExpectedGraduates,
        visible: true,
        color: '#893866',
      },
      {
        name: 'Formados',
        type: 'column',
        data: totalFormedGifts,
        visible: true,
        color: '#FC87C9'
      },
      {
        name: "Média Formação Realizada",
        type: 'line',
        dashStyle: 'ShortDash',
        color: 'black',
      }
    ],
  }

  if (getTotal(indicators.data) > 0) {
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    )
  } else {
    return <MissingDataWarning />
  }


}