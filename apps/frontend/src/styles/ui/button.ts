import styled from "styled-components";

export const UcademyButtonStyled = styled.button`
  background-color: #0abb87;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border-style: none;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0abb8680;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }
  &:active {
    background-color: #0abb87;
  }
`;

export const CloseButtonError = styled.button`
  background-color: #E36058;
  color: #FFFFFF;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  align-self: flex-end;
  border: 1px solid #E36058;

  &:hover {
    color: #E36058;
    background-color: #FFFFFF;
  }
`;