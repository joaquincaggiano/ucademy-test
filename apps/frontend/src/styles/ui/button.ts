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

export const ButtonRed = styled.button`
  background-color: #E36058;
  color: #FFFFFF;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
  align-self: flex-end;
  border: 1px solid #E36058;

  &:hover {
    color: #E36058;
    background-color: #FFFFFF;
    transition: background-color 0.5s ease;
    transition: color 0.3s ease;
  }
`;

export const CloseButton = styled.button`
  background-color: #FFFFFF;
  color: #262D34;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #262D34;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 16px;

  &:hover {
    color: #FFFFFF;
    background-color: #262D34;
    transition: background-color 0.5s ease;
    transition: color 0.3s ease;
  }
`;
