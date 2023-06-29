import { useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Box } from './styledComponents';
import { getStates } from 'src/services/estados-parceiro.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ThemeContext } from 'src/context/ThemeContext';
import { useGetRegionais } from 'src/services/regionais';
import { useGetIndicatorsScholars } from 'src/services/indicadores';
import { Loading } from 'src/components/Loading';

export function GraphScholars({ year }) {
  const [state, setState] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [regional, setRegional] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [seriesData, setSeriesData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const { data: listRegionais, isLoading: isLoadingRegionais } =
    useGetRegionais(
      {
        search: null,
        page: 1,
        limit: 9999999,
        order: 'ASC',
        status: 1,
        partnerState: state?.id,
      },
      !!state,
    );

  const { data: indicators, isLoading: isLoadingIndicators } =
    useGetIndicatorsScholars(
      {
        year: year,
        partnerStateId: state?.id,
        regionalPartnerId: regional?.id,
        cities: cities,
      },
      true,
    );

  const getDataSeries = () => {
    const series = [];
    let empty = true;
    if (indicators?.data?.length > 0) {
      indicators.data?.forEach((indicator) => {
        if (indicator.totalScholars > 0) {
          empty = false;
        }
        if (regional) {
          series.push({
            name: indicator.city,
            y: indicator.totalScholars,
            drilldown: indicator.city,
            color: theme.colors.primary,
          });
        } else {
          series.push({
            name: indicator.name,
            y: indicator.totalScholars,
            drilldown: indicator.name,
            color: theme.colors.primary,
          });
        }
      });
    }
    setIsEmpty(empty);
    setSeriesData(series);
  };

  useEffect(() => {
    getDataSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicators]);

  async function loadStates() {
    const resp = await getStates(null, 1, 99999999, 'ASC', '1');

    if (resp?.data?.items?.length) {
      setStateList(resp.data.items);
    }
  }

  useEffect(() => {
    loadStates();
  }, []);

  const handleChangeRegional = (newValue) => {
    setRegional(newValue);
    if (newValue) {
      setCityList(newValue.cities);
    } else {
      setCityList([]);
    }
    setCities([]);
  };

  const options = {
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
        '<table><tr><th style="text-align: center" colspan="2">Quantidade De Bolsistas</th></tr>',
      pointFormat:
        '<td><br/></td>' +
        '<tr style="border-top: 0.619403px dashed #7C7C7C;border-bottom: 0.619403px dashed #7C7C7C;"><td>{point.name}:&nbsp;&nbsp;</td>' +
        '<td style="text-align: right"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      valueDecimals: 0,
    },
    plotOptions: {
      column: {
        grouping: true,
        shadow: false,
        borderWidth: 0,
        groupPadding: 0.03,
      },
      series: {
        groupPadding: 0,
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
        // max: 100,
        title: {
          text: '',
        },
      },
      {
        title: {
          text: '',
        },
        opposite: true,
        linkedTo: 0,
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
      categories: seriesData?.map((x) => x.name),
      crosshair: true,
    },
    series: [
      {
        name: regional ? 'Municipios' : state ? 'Regionais' : 'Estados',
        data: seriesData,
      },
    ],
  };

  return (
    <>
      <Box>
        <Autocomplete
          id="size-small-outlined"
          size="small"
          noOptionsText="Estado"
          value={state}
          options={stateList}
          onChange={(_event, newValue) => {
            setState(newValue);
            setRegional(null);
            setCities([]);
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField size="small" {...params} label="Estado" />
          )}
        />
        <Autocomplete
          id="size-small-outlined"
          size="small"
          noOptionsText="Regional"
          value={regional}
          options={listRegionais?.items?.length > 0 ? listRegionais?.items : []}
          getOptionLabel={(option) => option.name}
          onChange={(_event, newValue) => {
            handleChangeRegional(newValue);
          }}
          disabled={!state}
          loading={isLoadingRegionais}
          renderInput={(params) => (
            <TextField size="small" {...params} label="Regional" />
          )}
        />
        <Autocomplete
          id="size-small-outlined"
          size="small"
          multiple
          fullWidth
          noOptionsText="Município"
          value={cities}
          options={cityList}
          onChange={(_event, newValue) => {
            setCities(newValue);
          }}
          disabled={!regional}
          renderInput={(params) => (
            <TextField size="small" {...params} label="Município" />
          )}
        />
      </Box>
      {isLoadingIndicators ? (
        <Loading />
      ) : (
        <>
          {isEmpty && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '40px',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  border: '1px solid #d5d5d5',
                  padding: '20px',
                  borderRadius: '8px',
                  color: '#A9A9A9',
                }}
              >
                <em>Não há resultados para o filtro aplicado.</em>
              </div>
            </div>
          )}
          <HighchartsReact highcharts={Highcharts} options={options} />
        </>
      )}
    </>
  );
}
