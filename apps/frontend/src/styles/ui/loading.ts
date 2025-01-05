import styled, { keyframes } from 'styled-components';

export const ContainerLoading = styled.div<{$isGrow?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${({ $isGrow }) => $isGrow && 'flex-grow: 1;'}
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div<{$width?: string; $height?: string; $borderWidth?: string}>`
  border: ${({ $borderWidth }) => $borderWidth || '2px'} solid rgba(0, 0, 0, 0.1);
  border-top: ${({ $borderWidth }) => $borderWidth || '2px'} solid #0abb87;
  border-radius: 50%;
  width: ${({ $width }) => $width || '20px'};
  height: ${({ $height }) => $height || '20px'};
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;
