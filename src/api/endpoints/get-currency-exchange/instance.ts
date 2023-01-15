import { api, ApiRequestConfig } from '@/api';
import { GetCurrencyExchangeResponse } from './type';
import axios from 'axios';

const axiosParams = {
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  // headers: { apikey: 'SNqPo4Fsb1xiXlcrxdlxGk1rpXd0YYh9' },
  headers: { apikey: undefined },
};

const axiosInstance = axios.create(axiosParams);

export const getCurrencyExchange = (config: ApiRequestConfig | undefined) =>
  api(axiosInstance)
    .get<GetCurrencyExchangeResponse>('convert', config)
    .then((res) => res.data);
