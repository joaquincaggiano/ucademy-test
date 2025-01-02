import styled from "styled-components";

export const TitleStyled = styled.h1`
  font-size: 32px;
  color: #262d34;
`;

export const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const NewStudentButtonStyled = styled.button`
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
