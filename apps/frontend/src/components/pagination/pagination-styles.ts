import styled, { css } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 24px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #f9fbff;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$active
      ? css`
          color: #0abb87;
          border: 2px solid #0abb87;
          border-radius: 2px;
        `
      : css`
          &:hover:not(:disabled) {
            color: #0abb87;
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconButton = styled(PageButton)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #0abb87;
  }
`;

export const Ellipsis = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #AAB7BE;
`;
