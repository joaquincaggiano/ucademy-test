import React from 'react';
import { PageButton } from './pagination-styles';

interface PageNumberProps {
  number: number;
  isActive: boolean;
  onClick: () => void;
}

const PageNumber: React.FC<PageNumberProps> = ({
  number,
  isActive,
  onClick,
}) => (
  <PageButton
    onClick={onClick}
    $active={isActive}
    className={isActive ? 'poppins-medium' : 'poppins-regular'}
  >
    {number}
  </PageButton>
);

export default PageNumber;
