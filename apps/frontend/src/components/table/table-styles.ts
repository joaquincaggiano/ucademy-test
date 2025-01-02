import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.20);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

export const TableHeader = styled.th`
  padding: 16px;
  color: #3D444A;
  text-align: left;
  background-color: #EEF0F5;
  border-bottom: 1px solid #CAD6DC;
  font-size: 14px;
`;

export const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }

  &:active {
    background-color: #e2e8f0;
  }
`;

export const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #F9FBFF;
  color: #262D34;
  font-size: 14px;
`;
