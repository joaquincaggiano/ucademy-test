import styled from 'styled-components';

export const Label = styled.label<{
  $fontSize?: string;
  $fontWeight?: string;
  $color?: string;
}>`
  font-size: ${({ $fontSize }) => $fontSize || '12px'};
  color: ${({ $color }) => $color || '#262d34'};
  font-family: 'Poppins', serif;
  font-weight: ${({ $fontWeight }) => $fontWeight || '400'};
  font-style: normal;
`;
