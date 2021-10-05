import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
export const TableRow = styled.tr``;

export const TableHead = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: white;
`;

export const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;

  &.item, &.orderedAt, &.orderAmount, &.qty {
      width:50%;
  }
`;
