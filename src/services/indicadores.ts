import { useQuery } from 'react-query';
import { api } from './api';

export type IGetIndicators = {
  year: number;
  month?: number;
  partnerStateId: number;
  regionalPartnerId: number;
  cities: string[];
};

export function useGetMacroIndicators(enabled = true as boolean) {
  const { data, isLoading } = useQuery({
    queryKey: ['macro-indicators'],
    queryFn: async () => {
      const resp = await api
        .get(`/system-indicators/parc/macro-indicators-general`)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error: ', error);
          return {
            status: 401,
            data: {
              message: error.response.data.message,
            },
          };
        });
      return resp?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: enabled,
  });

  return {
    data,
    isLoading,
  };
}

export function useGetIndicatorsScholars(
  params: IGetIndicators,
  enabled = true as boolean,
) {
  const { data, isLoading } = useQuery({
    queryKey: ['indicators-scholars', params],
    queryFn: async () => {
      const resp = await api
        .get(`/system-indicators/parc/scholars`, { params })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error: ', error);
          return {
            status: 401,
            data: {
              message: error.response.data.message,
            },
          };
        });
      return resp?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: enabled,
  });

  return {
    data,
    isLoading,
  };
}

export function useGetIndicatorsActiveStates(enabled = true as boolean) {
  const { data, isLoading } = useQuery({
    queryKey: ['indicators-active-states'],
    queryFn: async () => {
      const resp = await api
        .get(`/system-indicators/parc/system-active-states`)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error: ', error);
          return {
            status: 401,
            data: {
              message: error.response.data.message,
            },
          };
        });
      return resp?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: enabled,
  });

  return {
    data,
    isLoading,
  };
}

export function useGetIndicatorsValues(
  params: IGetIndicators,
  enabled = true as boolean,
) {
  const { data, isLoading } = useQuery({
    queryKey: ['indicators-average-value-terms', params],
    queryFn: async () => {
      const resp = await api
        .get(`/system-indicators/parc/average-value-terms`, { params })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error: ', error);
          return {
            status: 401,
            data: {
              message: error.response.data.message,
            },
          };
        });
      return resp?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: enabled,
  });

  return {
    data,
    isLoading,
  };
}

export function useGetIndicatorsTimeScholarship(
  params: IGetIndicators,
  enabled = true as boolean,
) {
  const { data, isLoading } = useQuery({
    queryKey: ['indicators-terms-to-validate-stay', params],
    queryFn: async () => {
      const resp = await api
        .get(`/system-indicators/parc/terms-to-validate-stay`, { params })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error: ', error);
          return {
            status: 401,
            data: {
              message: error.response.data.message,
            },
          };
        });
      return resp?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: enabled,
  });

  return {
    data,
    isLoading,
  };
}

export function useGetIndicatorsDeliveryReports(
  params: IGetIndicators,
  enabled = true as boolean,
) {
  const { data, isLoading } = useQuery({
    queryKey: ['indicators-delivery-average-month-reports', params],
    queryFn: async () => {
      const resp = await api
        .get(`/system-indicators/parc/delivery-average-month-reports`, {
          params,
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error: ', error);
          return {
            status: 401,
            data: {
              message: error.response.data.message,
            },
          };
        });
      return resp?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: enabled,
  });

  return {
    data,
    isLoading,
  };
}
