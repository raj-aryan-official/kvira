import { AxiosError } from 'axios';

export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (error.response?.data as { message?: string })?.message ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong';
};

export default getApiErrorMessage;
