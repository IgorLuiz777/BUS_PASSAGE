import axios, { AxiosError, AxiosResponse } from "axios";
import qs from "qs";
import toast from "react-hot-toast";

const TOKEN_KEY = 'token';
const sessionKey = 'authUser';
const URL_API = import.meta.env.VITE_API;

export class ApiResponse<T> {
  valido: boolean;
  erros: string[];
  dados: T;
  erroStackTrace: string | undefined;

  constructor(valido: boolean, erros: string[], dados: T, erroStackTrace: string | undefined) {
    this.valido = valido;
    this.erros = erros;
    this.dados = dados;
    this.erroStackTrace = erroStackTrace;
  }
}

const onResponseError = (error: AxiosError) => {
  console.log({ onResponseError: error });
  switch (error.response?.status) {
    case 401:
      toast.error('Você precisa estar logado para acessar este recurso.');
      sessionStorage.removeItem(sessionKey);
      sessionStorage.removeItem('token');
      window.location.href = '/login';
      break;
    case 500:
      toast.error('Erro de processamento no servidor.');
      break;
    case 404:
      toast.error('Serviço Indisponível.');
      break;
  }
  return Promise.resolve({ valido: false, dados: null });
}

const onResponse = (response: AxiosResponse) => {
  if (!response.data) response.data = { valido: false };

  const responseData = response.data as ApiResponse<any>;
  if (!responseData?.valido && responseData?.erros?.length > 0) {
    const msgFinal = responseData.erros.join('\n\n\n\n');

    toast.error(msgFinal);
    if (responseData.erroStackTrace) {
      console.log({ erroStackTrace: responseData.erroStackTrace });
      toast.error(msgFinal)

    }
  }

  return response;
}
axios.interceptors.response.use(onResponse, onResponseError);
export default function () {
  const token = sessionStorage.getItem(TOKEN_KEY) ?? '';
  const headers = token?.length > 0 ? {
    Authorization: `Bearer ${token}`,
  } : {};

  return {
    async post<T>(url: string, dados: any | undefined = undefined) {
      const response = await axios({
        baseURL: URL_API,
        url: url,
        data: { ...dados },
        method: 'POST',
        headers: headers
      });
      return response.data as ApiResponse<T>;
    },
    async postFile<T>(url: string, dados: any | undefined = undefined) {
      const headersFile: Record<string, string> = {
        ...token ? { Authorization: `Bearer ${token}` } : {},
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios({
        baseURL: URL_API,
        url: url,
        data: { ...dados },
        method: 'POST',
        headers: headersFile,
      });

      return response.data as ApiResponse<T>;
    },
    async get<T>(url: string, dados: any = {}) {
      const appendUrl = dados ? `?${qs.stringify({ ...dados })}` : '';
      const response = await axios({
        baseURL: `${URL_API}`,
        url: url + appendUrl,
        method: 'GET',
        headers: headers
      });

      return response.data as ApiResponse<T>;
    },
    async delete<T>(url: string, dados: any = {}) {
      const response = await axios({
        baseURL: `${URL_API}`,
        url: `${url}?${qs.stringify({ ...dados })}`,
        method: 'DELETE',
        headers: headers,
      });

      return response.data as ApiResponse<T>;
    }
  }
}
