import { InfoIndicator } from '../infoIndicator';
import { Card } from './styledComponents';

import ListStar from 'public/assets/images/bi_list-stars.svg';
import PeopleGroup from 'public/assets/images/people-group.svg';
import ReportData from 'public/assets/images/report-data.svg';
import Clock from 'public/assets/images/nest-clock-farsight-analog.svg';
import { useEffect, useState } from 'react';
import { useGetMacroIndicators } from 'src/services/indicadores';

export function Indicators() {
  const [indicators, setIndicators] = useState(null);

  const { data, isLoading: isLoading } = useGetMacroIndicators();

  useEffect(() => {
    if (data) setIndicators(data);
  }, [data]);

  return (
    !isLoading && (
      <Card>
        <InfoIndicator
          icon={<ListStar />}
          value={indicators?.totalStates}
          title={'Estados Utilizando o Sistema'}
          border={true}
        />
        <InfoIndicator
          icon={<PeopleGroup />}
          value={indicators?.totalScholars}
          title={'Número total de bolsistas ativos'}
          border={true}
        />
        <InfoIndicator
          icon={<ReportData />}
          value={`${
            indicators?.deliveryAverageMonthReports !== 'NaN'
              ? indicators?.deliveryAverageMonthReports + '%'
              : 'N/A'
          }`}
          title={'Taxa de entrega geral do relatório'}
          border={true}
        />
        <InfoIndicator
          icon={<Clock />}
          value={`${
            indicators?.averageMonthsOfTerms
              ? indicators?.averageMonthsOfTerms + ' meses'
              : 'N/A'
          }`}
          title={'Média de Permanência Do Bolsista'}
          border={false}
        />
      </Card>
    )
  );
}
