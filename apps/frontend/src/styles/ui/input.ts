import styled from 'styled-components';

export const Input = styled.input`
  border: 2px solid #aab7be;
  border-radius: 5px;
  width: 100%;
  height: 32px;
  padding-left: 10px;
  color: #262d34;
  font-size: 14px;
`;

export const InputError = styled.p`
  color: #F31260;
  font-size: 12px;
  font-family: 'Poppins', serif;
  font-weight: 500;
  font-style: normal;
  margin: 4px 0 0 0;
  line-height: 1.2;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 56px;
  /* line-height: 0px; */
`;
