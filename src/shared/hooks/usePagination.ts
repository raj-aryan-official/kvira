import { useState } from 'react';

const usePagination = (pageSize = 10) => {
  const [page, setPage] = useState(1);
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return { page, pageSize, nextPage, prevPage };
};

export default usePagination;
