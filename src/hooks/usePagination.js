import { useState } from 'react';

export default function usePagination(initial = { page: 0, size: 10 }) {
  const [page, setPage] = useState(initial.page);
  const [size, setSize] = useState(initial.size);

  return {
    page, size,
    setPage, setSize,
    next: () => setPage((p) => p + 1),
    prev: () => setPage((p) => Math.max(0, p - 1)),
    reset: () => { setPage(0); setSize(initial.size); }
  };
}
