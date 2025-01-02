import { useMemo } from 'react';

export const usePaginationRange = (currentPage: number, totalPages: number) => {
  return useMemo(() => {
    const pageNumbers: number[] = [];
    const startPage = Math.floor((currentPage - 1) / 4) * 4 + 1;

    for (let i = 0; i < 4 && startPage + i <= totalPages; i++) {
      pageNumbers.push(startPage + i);
    }

    return {
      pageNumbers,
      showStartEllipsis: pageNumbers[0] > 2,
      showEndEllipsis: pageNumbers[pageNumbers.length - 1] < totalPages - 1
    };
  }, [currentPage, totalPages]);
};