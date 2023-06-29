import { useQuery } from 'react-query';
import { api } from './api';

export type IGetRegional = {
  search?: string;
  page: number;
  limit: number;
  order: string;
  status?: number;
  column?: string;
  partnerState: number;
};

export function useGetRegionais(
  params: IGetRegional,
  enabled = true as boolean,
) {
  const { data, isLoading } = useQuery({
    queryKey: ['regional-partners', params],
    queryFn: async () => {
      const resp = await api
        .get(`/regional-partners/by-partner-state`, {
          params,
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error: ', error);
          return {
            status: 400,
            data: {
              message: error?.response?.data?.message,
            },
          };
        });
      return resp.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: enabled,
  });

  return {
    data,
    isLoading,
  };
}
