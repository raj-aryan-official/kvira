import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AUTH_KEYS, config } from '../../shared/constants/config';
import { deleteSecureItem, getSecureItem, setSecureItem } from '../storage/secureStorage';

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  refreshQueue = [];
};

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
  const token = await getSecureItem(AUTH_KEYS.accessToken);
  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await getSecureItem(AUTH_KEYS.refreshToken);
      if (!refreshToken) {
        throw error;
      }

      const { data } = await axios.post<{ accessToken: string; refreshToken?: string }>(
        `${config.apiBaseUrl}/auth/refresh`,
        { refreshToken },
      );

      await setSecureItem(AUTH_KEYS.accessToken, data.accessToken);
      if (data.refreshToken) {
        await setSecureItem(AUTH_KEYS.refreshToken, data.refreshToken);
      }

      processQueue(null, data.accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      }

      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await deleteSecureItem(AUTH_KEYS.accessToken);
      await deleteSecureItem(AUTH_KEYS.refreshToken);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
