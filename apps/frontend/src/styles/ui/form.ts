import styled from 'styled-components';

export const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
`;

export const DivFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
