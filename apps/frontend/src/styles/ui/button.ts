import styled from 'styled-components';

export const Button = styled.button<{
  $backgroundColor?: string;
  $color?: string;
  $padding?: string;
  $border?: string;
  $borderRadius?: string;
  $fontSize?: string;
  $fontWeight?: string;
  $hoverBackgroundColor?: string;
  $hoverColor?: string;
  $hoverBoxShadow?: string;
  $hoverPadding?: string;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#0abb87'};
  color: ${({ $color }) => $color || '#fff'};
  padding: ${({ $padding }) => $padding || '8px 10px'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '5px'};
  border: ${({ $border }) => $border || 'none'};
  font-family: 'Poppins', sans-serif;
  font-weight: ${({ $fontWeight }) => $fontWeight || '500'};
  font-style: normal;
  font-size: ${({ $fontSize }) => $fontSize || '14px'};
  cursor: pointer;
  width: fit-content;

  &:hover {
    color: ${({ $hoverColor }) => $hoverColor || '#fff'};
    background-color: ${({ $hoverBackgroundColor }) =>
      $hoverBackgroundColor || '#0abb8680'};
    box-shadow: ${({ $hoverBoxShadow }) => $hoverBoxShadow || 'none'};
    padding: ${({ $hoverPadding }) => $hoverPadding || '8px 10px'};
    transition: all 0.3s ease;
  }
`;
