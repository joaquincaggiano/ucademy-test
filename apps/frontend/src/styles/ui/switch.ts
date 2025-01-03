import styled from "styled-components";

export const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

export const SwitchLabel = styled.span`
  font-size: 14px;
  color: #333;
`;

export const SwitchInput = styled.input`
  display: none;
`;

export const SwitchSlider = styled.div<{ $checked: boolean }>`
  position: relative;
  width: 28px;
  height: 16px;
  background-color: ${(props) => (props.$checked ? '#0ABB87' : '#CAD6DC')};
  border-radius: 12px;
  transition: background-color 0.2s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(props) => (props.$checked ? '14px' : '2px')};
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;