import { useQuery } from "react-query"

import { api } from "./api"
import { IOptionsProps } from "src/components/homeComponents/selectGraph"

interface IUseGetProfessoresProps {
  year?: number
  partnerStateIds?: number[]
  regionalPartnerIds?: number[]
  cities?: string[]
  months?: number[]
}

export interface IDataIndicatorsProps {
  month: number
  totalExpectedGraduates: string
  totalFormedGifts: string
  month_extense: string
}

export interface IUseGetProfessoresResponseProps {
  regionalPartner?: IOptionsProps[]
  citiesByRegionalPartner?: {
    RegionalPartnerId: number,
    cities: string
  }[]
  data: IDataIndicatorsProps[]
}

export function queryGetIndicators(params: IUseGetProfessoresProps, enabled: boolean = false) {
  const response = useQuery({
    queryKey: ['query-indicators-teachers', params],
    queryFn: async () => await useGetProfessores(params),
    staleTime: 1000 * 60 * 5,
    enabled: enabled
  })

  if (!response.data) return {
    regionalPartner: [],
    citiesByRegionalPartner: [],
    data: []
  }

  return response.data
}

export async function useGetProfessores(params: IUseGetProfessoresProps): Promise<IUseGetProfessoresResponseProps> {
  
  const resp = await api.post('/system-indicators/parc/trained-teachers', params)
    .then((response) => response)
    .catch((error) => {
      console.error('error: ', error)
      return {
        status: 400,
        data: {
          message: error?.response?.data?.message
        }
      }
    })

    return resp.data
}