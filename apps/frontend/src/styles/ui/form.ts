import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const FormItem = styled.div<{
  $width?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ $width }) => $width || '80%'};
`;
