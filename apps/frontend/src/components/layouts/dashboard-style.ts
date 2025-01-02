import styled from "styled-components";

export const DashboardStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
  flex-grow: 1;
`;

export const SidebarStyled = styled.div`
  padding-top: 35px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #ffffff;
  border-right: 1px solid #eef0f5;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SidebarItemStyled = styled.span`
  font-size: 14px;
  color: #262d34;
`;

export const MainStyled = styled.main`
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #F9FBFF;
  flex-grow: 1;
`;
