import { useState } from 'react';
import { usePaginationRange } from '../../hooks/usePaginationRange';
import ArrowLeftSvg from '../icons/ArrowLeftSvg';
import ArrowRightSvg from '../icons/ArrowRightSvg';
import DoubleArrowLeftSvg from '../icons/DoubleArrowLeftSvg';
import DoubleArrowRightSvg from '../icons/DoubleArrowRightSvg';
import NavigationButton from './NavigationButton';
import PageNumber from './PageNumber';
import { Ellipsis, PaginationContainer } from './pagination-styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { pageNumbers, showStartEllipsis, showEndEllipsis } =
    usePaginationRange(currentPage, totalPages);

  const [showDoubleArrowLeft, setShowDoubleArrowLeft] = useState(false);
  const [showDoubleArrowRight, setShowDoubleArrowRight] = useState(false);

  const [colorArrowLeft, setColorArrowLeft] = useState('#262D34');
  const [colorArrowRight, setColorArrowRight] = useState('#262D34');

  const handlePrevGroup = () => {
    const startPage = Math.floor((currentPage - 1) / 4) * 4 + 1;
    onPageChange(Math.max(1, startPage - 4));
  };

  const handleNextGroup = () => {
    const startPage = Math.floor((currentPage - 1) / 4) * 4 + 1;
    onPageChange(Math.min(totalPages, startPage + 4));
  };

  return (
    <PaginationContainer>
      <div
        onMouseEnter={() => setColorArrowLeft('#0abb87')}
        onMouseLeave={() => setColorArrowLeft('#262D34')}
      >
        <NavigationButton
          icon={<ArrowLeftSvg width={12} height={12} color={colorArrowLeft} />}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          ariaLabel="Previous page"
        />
      </div>

      <PageNumber
        number={1}
        isActive={currentPage === 1}
        onClick={() => onPageChange(1)}
      />

      {showStartEllipsis && (
        <div
          onMouseEnter={() => setShowDoubleArrowLeft(true)}
          onMouseLeave={() => setShowDoubleArrowLeft(false)}
        >
          {showDoubleArrowLeft ? (
            <NavigationButton
              icon={
                <DoubleArrowLeftSvg width={12} height={12} color="#0abb87" />
              }
              onClick={handlePrevGroup}
              ariaLabel="Previous group"
            />
          ) : (
            <Ellipsis>...</Ellipsis>
          )}
        </div>
      )}

      {pageNumbers.map(
        (number) =>
          number !== 1 &&
          number !== totalPages && (
            <PageNumber
              key={number}
              number={number}
              isActive={currentPage === number}
              onClick={() => onPageChange(number)}
            />
          )
      )}

      {showEndEllipsis && (
        <div
          onMouseEnter={() => setShowDoubleArrowRight(true)}
          onMouseLeave={() => setShowDoubleArrowRight(false)}
        >
          {showDoubleArrowRight ? (
            <NavigationButton
              icon={
                <DoubleArrowRightSvg width={12} height={12} color="#0abb87" />
              }
              onClick={handleNextGroup}
              ariaLabel="Next group"
            />
          ) : (
            <Ellipsis>...</Ellipsis>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <PageNumber
          number={totalPages}
          isActive={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        />
      )}

      <div
        onMouseEnter={() => setColorArrowRight('#0abb87')}
        onMouseLeave={() => setColorArrowRight('#262D34')}
      >
        <NavigationButton
          icon={
            <ArrowRightSvg width={12} height={12} color={colorArrowRight} />
          }
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          ariaLabel="Next page"
        />
      </div>
    </PaginationContainer>
  );
};

export default Pagination;
