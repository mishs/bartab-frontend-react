import React from 'react';
import styled from 'styled-components';
import { beersList } from '../constants/data';
import {Table, TableRow,TableHead, TableData} from './TableStyles'

function PriceList() {
  const renderBeerRow = () =>
    beersList.map((beer, i) => (
      <TableRow key={i}>
        <TableDataItem>{beer.name}</TableDataItem>
        <TableDataItem>DKK  {(beer.price).toFixed(2)}</TableDataItem>
      </TableRow>
    ));
  return (
    <Table>
      <TableRow>
        <TableHeadCaption>Beer</TableHeadCaption>
        <TableHeadCaption>Price</TableHeadCaption>
      </TableRow>

      {renderBeerRow()}
    </Table>
  );
}

const TableHeadCaption = styled(TableHead)`
    width:50%;
`;

const TableDataItem = styled(TableData)`
  width:50%;
`;

export default PriceList;
