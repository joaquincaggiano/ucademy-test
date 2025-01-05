import styled from 'styled-components';

export const HomeContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TitleStyled = styled.h1`
  font-size: 32px;
  color: #262d34;
`;

export const HeaderHomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
  }
`;
