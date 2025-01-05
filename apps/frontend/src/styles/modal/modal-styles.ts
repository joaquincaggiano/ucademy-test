import styled from "styled-components";

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0px 3px 8px 0px rgba(38, 45, 52, 0.17);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  color: #000000;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
  text-align: center;
`;

export const ModalDescription = styled.p`
  font-size: 16px;
  color: #000000;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  max-width: 450px;
`;

// User Modal

export const ModalUserContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
`;

export const ModalUserLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalUserProfile = styled.div`
  padding: 5px 10px;
  border-bottom: 2px solid #0abb87;
  font-size: 14px;
  font-family: 'Poppins', serif;
  font-weight: 600;
  font-style: normal;
  color: #262d34;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalUserImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 138px;
  height: 138px;
  border-radius: 100%;
  border: 1px solid #d9d9d9;
`;

export const ModalUserDivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
`;

export const ModalUserInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ModalUserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalUserInfoTitle = styled.span`
  font-size: 12px;
  color: #262d34;
`;

export const ModalUserInfoValue = styled.span`
  font-size: 14px;
  color: #262d34;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
