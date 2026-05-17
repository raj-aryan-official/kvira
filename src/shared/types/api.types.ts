export type ApiErrorResponse = {
  message: string;
  code?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  totalPages: number;
  totalCount: number;
};
