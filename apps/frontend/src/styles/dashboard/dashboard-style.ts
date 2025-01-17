import styled from 'styled-components';

export const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  @media (min-width: 768px) {
    flex-direction: row;
    /* flex-grow: 1; */
  }
`;

export const SidebarStyled = styled.div`
  padding-top: 45px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #ffffff;
  border-right: 1px solid #eef0f5;
  display: none;
  flex-direction: column;
  gap: 50px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const SidebarHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SidebarItemStyled = styled.span`
  font-size: 14px;
  color: #262d34;
`;

export const HeaderDashboardStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background-color: #fff;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MainStyled = styled.main`
  padding-top: 10px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 20px;
  background-color: #f9fbff;
  flex-grow: 1;
`;
