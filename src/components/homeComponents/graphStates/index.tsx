import { Box } from './styledComponents';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loading } from 'src/components/Loading';
import { useGetIndicatorsActiveStates } from 'src/services/indicadores';

export function GraphState() {
  const { data: indicators, isLoading: isLoadingIndicators } =
    useGetIndicatorsActiveStates();

  const getPercents = (aderidos: boolean) => {
    if (aderidos) {
      return (indicators?.totalPartnerStates * 100) / indicators?.totalStates;
    } else {
      return (
        ((indicators?.totalStates - indicators?.totalPartnerStates) * 100) /
        indicators?.totalStates
      );
    }
  };

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      spacingBottom: 150,
      height: 500,
    },
    title: {
      text: '',
    },
    tooltip: {
      shared: false,
      useHTML: true,
      headerFormat: '<table>',
      pointFormat:
        '<tr style="border-bottom: 0.619403px dashed #7C7C7C;"><td>{point.name}:&nbsp;&nbsp;</td>' +
        '<td style="text-align: right"><b>{point.percentage:.1f}%</b></td>' +
        '<td><br/></td>' +
        '</tr>' +
        '{point.custom.extraInformation}',
      footerFormat: '</table>',
      valueDecimals: 2,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: ['#E1E1E1', '#B51C8B'],
        borderRadius: 5,
        dataLabels: {
          enabled: true,
          format: '<b>{point.percentage:.1f}</b> %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Estados',
        data: [
          {
            name: 'Não Aderidos',
            y: getPercents(false),
          },
          {
            name: 'Estados Aderidos',
            y: getPercents(true),
            custom: {
              extraInformation: `<td><br><ul>${indicators?.partnerStates?.map(
                (state) =>
                  `<li style="line-height:2px" key=${state?.id}>${state?.name}</li>`,
              )}</ul></td>`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Box>
        {isLoadingIndicators ? (
          <Loading />
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </Box>
    </>
  );
}
